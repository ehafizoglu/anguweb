import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WordpressService {
  private apiUrl = 'https://www.enginhafizoglu.tr/wp-json/wp/v2';

  constructor(private http: HttpClient) { }

  getPosts(category?: string): Observable<any[]> {
    let url = `${this.apiUrl}/posts?_embed&per_page=100`;
    if (category) {
      url += `&categories=${category}`;
    }
    
    console.log('Fetching posts from:', url);
    
    return this.http.get<any[]>(url).pipe(
      map((posts: any[]) => {
        console.log('Raw posts data:', posts);
        return posts.map(post => ({
          id: post.id,
          title: post.title.rendered,
          excerpt: post.excerpt.rendered,
          content: post.content.rendered,
          date: new Date(post.date),
          link: post.link,
          categories: post._embedded?.['wp:term']?.[0]?.map((cat: any) => ({
            id: cat.id,
            name: cat.name,
            slug: cat.slug
          })) || [],
          commentCount: post.comment_count
        }));
      }),
      catchError(error => {
        console.error('API Error:', error);
        throw error;
      })
    );
  }

  getCategories(): Observable<any[]> {
    const url = `${this.apiUrl}/categories?per_page=100`;
    console.log('Fetching categories from:', url);
    
    return this.http.get<any[]>(url).pipe(
      map(categories => {
        console.log('Raw categories data:', categories);
        return categories.map(cat => ({
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          count: cat.count
        }));
      }),
      catchError(error => {
        console.error('API Error:', error);
        throw error;
      })
    );
  }

  searchPosts(searchTerm: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/posts?search=${searchTerm}&_embed`).pipe(
      map((posts: any[]) => {
        return posts.map(post => ({
          id: post.id,
          title: post.title.rendered,
          excerpt: post.excerpt.rendered,
          date: new Date(post.date),
          link: post.link,
          categories: post._embedded?.['wp:term']?.[0]?.map((cat: any) => ({
            id: cat.id,
            name: cat.name,
            slug: cat.slug
          })) || []
        }));
      })
    );
  }

  getPost(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/posts/${id}?_embed`).pipe(
      map((post: any) => ({
        id: post.id,
        title: post.title.rendered,
        content: post.content.rendered,
        date: new Date(post.date),
        featuredImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url,
        author: post._embedded?.['author']?.[0]?.name,
        categories: post._embedded?.['wp:term']?.[0]?.map((cat: any) => cat.name)
      }))
    );
  }

  getAllPosts(page: number = 1, perPage: number = 10): Observable<any> {
    const url = `${this.apiUrl}/posts?page=${page}&per_page=${perPage}&_embed`;
    return this.http.get(url);
  }
} 