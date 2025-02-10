import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { PostsComponent } from './pages/posts/posts.component'; // Direkt importu kaldırın

const routes: Routes = [
  // ... diğer rotalar
  {
    path: 'posts',
    // component: PostsComponent // Direkt component yerine loadChildren kullanın
    loadChildren: () => import('./pages/posts/posts.component').then(m => m.PostsComponent), // Gecikmeli yükleme
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 