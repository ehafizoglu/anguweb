import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostsService, Post } from '../../services/posts.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="blog-container">
      <h1 class="main-title">Blog Yazılarım</h1>
      
      <div class="posts-grid" *ngIf="posts.length > 0">
        <article class="post-card" *ngFor="let post of posts">
          <div class="post-content">
            <header class="post-header">
              <h2 class="post-title">{{ post.post_title }}</h2>
              <div class="post-meta">
                <span class="post-date">
                  <i class="fas fa-calendar-alt"></i>
                  {{ post.post_date | date:'dd MMM yyyy' }}
                </span>
                <span class="post-author" *ngIf="post.author">
                  <i class="fas fa-user"></i>
                  {{ post.author }}
                </span>
              </div>
            </header>
            
            <div class="post-excerpt" [innerHTML]="truncateContent(post.post_content)"></div>
            
            <footer class="post-footer">
              <a [routerLink]="['/posts', post.ID]" class="read-more-btn">
                Devamını Oku
                <i class="fas fa-arrow-right"></i>
              </a>
              
              <div class="post-categories" *ngIf="post.categories">
                <span class="category-tag" *ngFor="let category of post.categories.split(',')">
                  {{ category.trim() }}
                </span>
              </div>
            </footer>
          </div>
        </article>
      </div>

      <div class="loading-container" *ngIf="loading">
        <div class="loader"></div>
        <p>Yazılar yükleniyor...</p>
      </div>

      <div class="error-container" *ngIf="error">
        <p class="error-message">{{ error }}</p>
      </div>
    </div>
  `,
  styles: [`
    .blog-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    }

    .main-title {
      text-align: center;
      color: #2c3e50;
      font-size: 2.5rem;
      margin-bottom: 3rem;
      position: relative;
      padding-bottom: 1rem;
    }

    .main-title::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 4px;
      background: linear-gradient(to right, #3498db, #2ecc71);
      border-radius: 2px;
    }

    .posts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }

    .post-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .post-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
    }

    .post-content {
      padding: 1.5rem;
    }

    .post-title {
      color: #2c3e50;
      font-size: 1.5rem;
      margin-bottom: 1rem;
      line-height: 1.4;
    }

    .post-meta {
      display: flex;
      gap: 1rem;
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }

    .post-meta i {
      margin-right: 0.5rem;
      color: #3498db;
    }

    .post-excerpt {
      color: #666;
      line-height: 1.6;
      margin-bottom: 1.5rem;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    .post-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid #eee;
    }

    .read-more-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: #3498db;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      transition: background 0.3s ease;
    }

    .read-more-btn:hover {
      background: #2980b9;
    }

    .category-tag {
      display: inline-block;
      padding: 0.3rem 0.8rem;
      background: #f0f2f5;
      color: #666;
      border-radius: 20px;
      font-size: 0.8rem;
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .loading-container {
      text-align: center;
      padding: 3rem;
    }

    .loader {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #3498db;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .error-container {
      text-align: center;
      padding: 2rem;
      background: #fee;
      border-radius: 8px;
      margin: 2rem 0;
    }

    .error-message {
      color: #e74c3c;
      margin: 0;
    }

    @media (max-width: 768px) {
      .blog-container {
        padding: 1rem;
      }

      .main-title {
        font-size: 2rem;
        margin-bottom: 2rem;
      }

      .posts-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  loading = true;
  error: string | null = null;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.loading = true;
    this.postsService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.loading = false;
        this.error = null;
      },
      error: (err) => {
        console.error('Post yükleme hatası:', err);
        this.error = 'Yazılar yüklenirken bir hata oluştu.';
        this.loading = false;
      }
    });
  }

  truncateContent(content: string): string {
    const div = document.createElement('div');
    div.innerHTML = content;
    const text = div.textContent || div.innerText || '';
    return text.length > 200 ? text.substring(0, 200) + '...' : text;
  }
}