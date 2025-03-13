import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogFormComponent } from './components/blog-form/blog-form.component'; // Add this
import { ViewBlogComponent } from './components/view-blog/view-blog.component';

const routes: Routes = [
  { path: '', component: BlogListComponent },
  { path: 'newblog', component: BlogFormComponent }, // Add this
  { path: 'edit/:id', component: BlogFormComponent }, // Add this
  { path: 'view/:id', component: ViewBlogComponent }, // Add this
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
