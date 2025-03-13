import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BlogService } from '../../../../core/services/blog.service';
import { Blog } from '../../../../core/models/blog.model';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Router, RouterModule } from '@angular/router'; // Add this
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // Add this
import { DeleteConfirmationDialogComponent } from './../delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'author', 'category', 'actions'];
  dataSource = new MatTableDataSource<Blog>([]);
  searchControl = new FormControl('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private blogService: BlogService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadBlogs();
    this.setupSearch();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadBlogs() {
    this.blogService.getBlogs().subscribe({
      next: (blogs) => {
        console.log('Blogs received in component:', blogs);
        this.dataSource.data = blogs;
      },
      error: (err) => console.error('Error fetching blogs:', err),
    });
  }

  setupSearch() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((searchTerm) => {
        this.dataSource.filter = searchTerm?.trim().toLowerCase() || '';
      });
  }

  deleteBlog(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.blogService.deleteBlog(id).subscribe({
          next: () => this.loadBlogs(), // Refresh table
          error: (err) => console.error('Error deleting blog:', err),
        });
      }
    });
  }

  // nevigate to the new blog
  gotocreateblog() {
    this.router.navigate(['blog/newblog']);
  }

  gotoviewblog() {
    this.router.navigate(['blog/']);
  }
}
