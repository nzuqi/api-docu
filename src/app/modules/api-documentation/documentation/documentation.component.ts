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
  crumbs: any[] = [];

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

          this.crumbs = [
            { title: 'Home', path: '/' },
            { title: 'API Documentation', path: '/documentation' },
            { title: '', path: `/documentation/${params['section']}/${params['slug']}` },
          ];

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

          // Set title based on first line of file
          let title: any = response.split('\n');
          title = title?.length ? title[0] : '';
          title = parseMarkdown(title).replace(/<[^>]*>?/gm, '');
          this.crumbs[this.crumbs.length - 1].title = title;

          this.content = parseMarkdown(response);
          // Sanitize content
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
