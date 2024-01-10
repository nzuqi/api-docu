import { Component, HostBinding, HostListener } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';
import { en, fr } from './menu';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
  ],
})
export class SidenavComponent {
  resizingEvent = {
    // whether the user is currently resizing the sidenav
    isResizing: false,
    // the x coordinate of the mouse when the user started resizing
    startingCursorX: 0,
    // the width of the sidenav when the user started resizing
    startingWidth: 0,
  };
  defaultLang = 'en';
  menu: any[];

  constructor(
    public sidenavService: SidenavService,
    private router: Router,
  ) {
    this.menu = this.defaultLang === 'en' ? en : fr;
  }

  @HostBinding('class.resizing')
  get isResizing(): boolean {
    return this.resizingEvent.isResizing;
  }

  @HostBinding('class.is-expanded')
  get isExpanded() {
    return this.sidenavService.isExpanded;
  }

  @HostBinding('class.is-small-device')
  get isSmallDevice() {
    return this.sidenavService.isSmallDevice;
  }

  startResizing(event: MouseEvent): void {
    if (!this.sidenavService.isExpanded) return;
    this.resizingEvent = {
      isResizing: true,
      startingCursorX: event.clientX,
      startingWidth: this.sidenavService.sidenavWidth,
    };
  }

  @HostListener('window:mousemove', ['$event'])
  updateSidenavWidth(event: MouseEvent) {
    if (!this.resizingEvent.isResizing) {
      return;
    }

    const cursorDeltaX = event.clientX - this.resizingEvent.startingCursorX;
    const newWidth = this.resizingEvent.startingWidth + cursorDeltaX;
    this.sidenavService.setSidenavWidth(newWidth);
  }

  @HostListener('window:mouseup')
  stopResizing() {
    this.resizingEvent.isResizing = false;
  }

  navigate(slug: string): void {
    this.router.navigateByUrl(slug);
  }
}