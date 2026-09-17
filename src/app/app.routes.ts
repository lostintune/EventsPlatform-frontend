import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { Register } from './register/register';
import { EventList } from './events/event-list/event-list';
import { EventDetail } from './events/event-detail/event-detail';
import { Profile } from './profile/profile';
import { MyEvents } from './events/my-events/my-events';
import { authGuard } from './guards/auth.guard';
import { EventForm } from './events/event-form/event-form';

export const routes: Routes = [
  { path: '', component: EventList },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: Register },
  { path: 'events/:id', component: EventDetail },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: 'my-events', component: MyEvents, canActivate: [authGuard] },
  { path: 'my-events/new', component: EventForm, canActivate: [authGuard] },
  { path: 'my-events/:id/edit', component: EventForm, canActivate: [authGuard] },
];