import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgIconComponent],
  template: `
    <nav class="navbar">
      <div class="navbar-container">
        <div class="navbar-header">
          <a class="navbar-brand" routerLink="/">Engin Hafızoğlu</a>
        </div>
        <div class="navbar-menu">
          <div class="navbar-links">
            <a routerLink="/" class="nav-link">
              <ng-icon name="heroHome" size="20"></ng-icon>
              Ana Sayfa
            </a>
            <a routerLink="/posts" class="nav-link">
              <ng-icon name="heroDocumentText" size="20"></ng-icon>
              Yazılarım
            </a>
            <a routerLink="/categories" class="nav-link">
              <ng-icon name="heroSquares2x2" size="20"></ng-icon>
              Kategoriler
            </a>
            <a routerLink="/admin" class="nav-link">
              <ng-icon name="heroUsers" size="20"></ng-icon>
              Admin
            </a>
          </div>
        </div>
      </div>
    </nav>

    <div class="content-container">
      <router-outlet></router-outlet>
    </div>

    <style>
      .navbar {
        background: linear-gradient(135deg, #fff 0%, #f8fafc 100%);
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        padding: 1.5rem 0;
        margin-bottom: 4rem;
        border-bottom: 1px solid #e2e8f0;
      }

      .navbar-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .navbar-header {
        text-align: center;
      }

      .navbar-brand {
        font-size: 2.2rem;
        font-weight: 700;
        background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-decoration: none;
        letter-spacing: -0.5px;
      }

      .navbar-menu {
        border-top: 1px solid #e2e8f0;
        padding-top: 1.5rem;
      }

      .navbar-links {
        display: flex;
        justify-content: center;
        gap: 2.5rem;
      }

      .nav-link {
        color: #64748b;
        text-decoration: none;
        font-weight: 500;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-size: 0.95rem;
      }

      .nav-link:hover {
        color: #3b82f6;
        background: #f0f9ff;
        transform: translateY(-1px);
      }

      .nav-link ng-icon {
        color: #94a3b8;
        transition: all 0.3s ease;
      }

      .nav-link:hover ng-icon {
        color: #3b82f6;
        transform: scale(1.1);
      }

      @media (max-width: 768px) {
        .navbar-links {
          gap: 1rem;
          flex-wrap: wrap;
        }
      }
    </style>
  `
})
export class NavbarComponent {}
