import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostsComponent } from './pages/posts/posts.component';
import { PostDetailComponent } from './pages/posts/post-detail.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },  // Anasayfa
  { path: 'posts', component: PostsComponent },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: '' }  // Bilinmeyen URL'leri anasayfaya yönlendir
];