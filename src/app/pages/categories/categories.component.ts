import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  template: `
    <div class="container">
      <h1>Kategoriler</h1>
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
    }
  `]
})
export class CategoriesComponent {} 