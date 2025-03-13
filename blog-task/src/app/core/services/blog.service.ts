import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Blog } from '../models/blog.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl = '/assets/blogs.json';
  private blogs: Blog[] = [];
  private blogsSubject = new BehaviorSubject<Blog[]>([]);

  constructor(private http: HttpClient) {
    this.loadInitialBlogs();
  }

  private loadInitialBlogs() {
    this.http
      .get<Blog[]>(this.apiUrl)
      .pipe(
        catchError((err) => {
          // console.error('Error loading initial blogs:', err);
          return of([]);
        }),
        tap((blogs) => this.blogsSubject.next(blogs)) // Update BehaviorSubject
      )
      .subscribe((blogs) => {
        this.blogs = blogs;
      });
  }

  getBlogs(): Observable<Blog[]> {
    return this.blogsSubject.asObservable(); // Return observable of current state
  }

  createBlog(blog: Blog): Observable<Blog> {
    const newBlog = { ...blog, id: this.generateId() };
    this.blogs.push(newBlog);
    this.blogsSubject.next(this.blogs.slice()); // Update state
    return of(newBlog);
  }

  updateBlog(blog: Blog): Observable<Blog> {
    const index = this.blogs.findIndex((b) => b.id === blog.id);
    if (index !== -1) {
      this.blogs[index] = { ...blog };
      this.blogsSubject.next(this.blogs.slice()); // Update state
      return of(this.blogs[index]);
    }
    return throwError(() => new Error('Blog not found'));
  }

  deleteBlog(id: number): Observable<void> {
    const index = this.blogs.findIndex((b) => b.id === id);
    if (index !== -1) {
      this.blogs.splice(index, 1);
      this.blogsSubject.next(this.blogs.slice()); // Update state
      return of(undefined);
    }
    return throwError(() => new Error('Blog not found'));
  }

  private generateId(): number {
    return this.blogs.length > 0
      ? Math.max(...this.blogs.map((b) => b.id!)) + 1
      : 1;
  }
}
