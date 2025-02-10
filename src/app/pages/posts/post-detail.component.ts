import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="post-detail-container">
      <article class="post" *ngIf="post">
        <h1 class="post-title">{{post.post_title}}</h1>
        <div class="post-meta">
          <span class="post-date">{{post.post_date | date:'dd MMMM yyyy'}}</span>
        </div>
        <div class="post-content" [innerHTML]="post.post_content"></div>
      </article>

      <div class="loading" *ngIf="!post && !error">
        Yükleniyor...
      </div>

      <div class="error" *ngIf="error">
        {{error}}
      </div>
    </div>
  `,
  styles: [`
    .post-detail-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      text-align: left;
    }

    .post-title {
      font-size: 2.5rem;
      color: #2c3e50;
      margin-bottom: 1rem;
      text-align: left;
    }

    .post-meta {
      color: #666;
      margin-bottom: 2rem;
      text-align: left;
    }

    .post-content {
      line-height: 1.8;
      font-size: 1.1rem;
      color: #333;
      text-align: left;
    }

    .post-content p {
      margin-bottom: 1.5rem;
      text-align: left;
    }

    .loading, .error {
      text-align: center;
      padding: 2rem;
    }

    .error {
      color: #e74c3c;
    }
  `]
})
export class PostDetailComponent implements OnInit {
  post: any;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadPost(id);
    });
  }

  loadPost(id: number) {
    this.postsService.getPost(id).subscribe({
      next: (post) => {
        this.post = post;
      },
      error: (err) => {
        this.error = 'Yazı yüklenirken bir hata oluştu.';
        console.error('Post yükleme hatası:', err);
      }
    });
  }
}