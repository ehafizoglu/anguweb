import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  template: `
    <div class="container">
      <h1>Admin Paneli</h1>
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
    }
  `]
})
export class AdminComponent {} 