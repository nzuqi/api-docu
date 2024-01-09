import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { parseMarkdown } from '../parse-markdown';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnDestroy {

  destroyed$ = new Subject();
  exists: boolean = false;
  processing: boolean = false;
  content: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
  ) {
    this.getMeta();
  }

  private getMeta(): void {
    this.processing = true;
    this.route.params
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (params) => {

          if (!params['section'] || !params['slug']) this.router.navigateByUrl('/');

          const path = `/assets/documentation/${params['section']}/${params['slug']}.md`;
          this.parseFile(path);
        },
        error: (error) => {
          this.exists = false;
          this.processing = false;
          this.content = null;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private parseFile(path: string): void {
    this.httpClient.get(path, { responseType: 'text' })
      .pipe()
      .subscribe({
        next: (response) => {
          this.exists = true;
          this.content = parseMarkdown(response);
          // Sanitize
          this.content = this.sanitizer.bypassSecurityTrustHtml(this.content);
          this.processing = false;
        },
        error: (error) => {
          this.exists = false;
          this.processing = false;
          this.content = null;
        },
      });
  }
}
