import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'profile',
    renderMode: RenderMode.Client
  },
  {
    path: 'my-events',
    renderMode: RenderMode.Client
  },
  {
    path: 'my-events/new',
    renderMode: RenderMode.Client
  },
  {
    path: 'events/:id',
    renderMode: RenderMode.Server
  },
  {
    path: '',
    renderMode: RenderMode.Server
  },
  { 
    path: 'my-events/:id/edit', 
    renderMode: RenderMode.Client 

  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];