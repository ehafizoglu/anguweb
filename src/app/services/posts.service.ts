import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Post {
    ID: number;
    post_title: string;
    post_content: string;
    post_excerpt: string;
    post_date: string;
    post_modified: string;
    post_url: string;
    author: string;
    categories: string;
    featured_image_url?: string;
}

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    private apiUrl = `${environment.apiUrl}/posts`;

    constructor(private http: HttpClient) { }

    // Tüm postları getir
    getPosts(): Observable<Post[]> {
        console.log('Fetching posts from:', this.apiUrl);
        return this.http.get<Post[]>(this.apiUrl);
    }

    // Tekil post detayını getir
    getPost(id: number): Observable<Post> {
        console.log('Fetching post detail from:', `${this.apiUrl}/${id}`);
        return this.http.get<Post>(`${this.apiUrl}/${id}`);
    }

    // Kategorileri getir
    getCategories(): Observable<any[]> {
        return this.http.get<any[]>(`${environment.apiUrl}/categories`);
    }

    // Kategoriye göre postları getir
    getPostsByCategory(slug: string): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.apiUrl}/category/${slug}`);
    }
}