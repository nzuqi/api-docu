import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, distinctUntilChanged, takeUntil, tap } from 'rxjs';
import { SidenavService } from './services/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  Breakpoints = Breakpoints;
  currentBreakpoint: string = '';
  destroyed$ = new Subject();

  readonly breakpoint$ = this.breakpointObserver
    .observe([
      Breakpoints.Large,
      Breakpoints.Medium,
      Breakpoints.Small,
      // '(min-width: 500px)',
    ])
    .pipe(
      tap(value => this.sidenavService.isSmallDevice = !value?.matches || false),
      distinctUntilChanged()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private sidenavService: SidenavService,
  ) { }

  ngOnInit(): void {
    this.breakpoint$.pipe(takeUntil(this.destroyed$)).subscribe((e) => {
      this.breakpointChanged();
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private breakpointChanged() {
    if (this.breakpointObserver.isMatched(Breakpoints.Large)) this.currentBreakpoint = Breakpoints.Large;
    else if (this.breakpointObserver.isMatched(Breakpoints.Medium)) this.currentBreakpoint = Breakpoints.Medium;
    else if (this.breakpointObserver.isMatched(Breakpoints.Small)) this.currentBreakpoint = Breakpoints.Small;
    /* else if (this.breakpointObserver.isMatched('(min-width: 500px)')) this.currentBreakpoint = '(min-width: 500px)'; */
  }
}