# Blog Dashboard

A feature-rich Angular application for managing blog posts, built with Angular 19, Angular Material, RxJS, and TypeScript. This project demonstrates modern Angular development with standalone components, reactive programming, and a simulated CRUD API using a local JSON file and local storage for persistence.
## Features
- Blog List: Displays blogs in a Material table with search, sorting, and pagination.

- View Blog: Read-only view of blog details.

- Add/Edit Blog: Reactive form with validations (title min 5 chars, content min 50 chars).

- Delete Blog: Confirmation dialog using MatDialog.

- Notifications: MatSnackBar messages for create/edit actions.

- Persistence: Blogs stored in localStorage to survive page refreshes.


## Usage

- List Page: View, search, sort, and paginate blogs. Click icons for View/Edit/Delete.

- Add Blog: Click "Add Blog" to create a new post.

- Edit Blog: Edit via the pencil icon, updates persist in localStorage.

- View Blog: Eye icon shows blog details.

- Delete Blog: Trash icon triggers a confirmation dialog.


## Prerequisites
- Node.js: v18.x or later (includes npm).
- Angular CLI: v19.x.x

```bash
npm install -g @angular/cli
```


## Setup Instructions

- Clone the Repository:
```bash
https://github.com/viresh3104/blog-task.git
```

- Install Dependencies:
```bash
npm install
```

- Run the Application:
```bash
ng serve
```

## Project Structure
- src/app/features/blog: Contains components (BlogListComponent, BlogFormComponent, BlogViewComponent, DeleteConfirmationDialogComponent).

- src/app/core: Services (BlogService) and models (blog.model.ts).

- src/assets/blogs.json: Initial blog data (15 entries).
