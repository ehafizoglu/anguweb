import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

// Aşağıdaki sınıf tanımı doğru olan ve kalması gereken tanım
@Injectable({
   providedIn: 'root'
 })
 export class PostsService {
   private apiUrl = 'http://localhost:3000/api/posts'; // Backend API URL'i

   constructor(private http: HttpClient) { }

   getPosts(): Observable<any[]> {
     return this.http.get<any[]>(this.apiUrl);
   }
 }