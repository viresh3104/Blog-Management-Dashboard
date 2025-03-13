import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { BlogService } from '../../../../core/services/blog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Blog } from '../../../../core/models/blog.model';

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss'],
})
export class BlogFormComponent implements OnInit {
  blogForm: FormGroup;
  authors = ['Developer', 'Consultant', 'Tester', 'HR'];
  categories = ['General', 'Development', 'QA', 'Management'];
  isEditMode = false;
  blogId?: number;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      author: ['', Validators.required],
      category: ['', Validators.required],
      content: ['', [Validators.required, Validators.minLength(50)]],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.blogId = +id;
        this.loadBlog(this.blogId);
      }
    });
  }

  loadBlog(id: number) {
    this.blogService.getBlogs().subscribe((blogs) => {
      const blog = blogs.find((b) => b.id === id);
      if (blog) {
        this.blogForm.patchValue(blog);
      }
    });
  }

  onSubmit() {
    if (this.blogForm.valid) {
      const blogData: Blog = this.blogForm.value;
      if (this.isEditMode && this.blogId) {
        blogData.id = this.blogId;
        this.blogService.updateBlog(blogData).subscribe({
          next: () =>
            this.router.navigate(['/blog'], { state: { action: 'edited' } }),
          error: (err) => console.error('Error updating blog:', err),
        });
      } else {
        this.blogService.createBlog(blogData).subscribe({
          next: () =>
            this.router.navigate(['/blog'], { state: { action: 'created' } }),
          error: (err) => console.error('Error creating blog:', err),
        });
      }
    }
  }

  goBack() {
    this.router.navigate(['/blog']);
  }
}
