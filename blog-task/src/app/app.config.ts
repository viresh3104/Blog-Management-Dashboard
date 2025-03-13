import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(), // For Angular Material
    provideHttpClient(), // For HttpClient in BlogService
    provideRouter(
      [
        { path: '', redirectTo: '/blog', pathMatch: 'full' },
        {
          path: 'blog',
          loadChildren: () =>
            import('./features/blog/blog.module').then((m) => m.BlogModule),
        },
      ],
      withComponentInputBinding()
    ),
  ],
};
