import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';

import { WelcomeComponent } from './welcome/welcome.component';
import { Error404Component } from './error404/error404.component';
import { LoginComponent } from './login/login.component';
import { UserNewComponent } from './user-new/user-new.component';
import { UserIndexComponent } from './user-index/user-index.component';
import { PostIndexComponent } from './post-index/post-index.component';
import { PostNewComponent } from './post-new/post-new.component';
import { PostViewComponent } from './post-view/post-view.component';

const routes: Routes = [
  { path: '',  component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users/new',  component: UserNewComponent },
  { path: 'users', canActivate: [AuthGuard], //1
    children: [
      { path: '', component: UserIndexComponent },
    ]
  },
  { path: 'posts',  component: PostIndexComponent },
  { path: 'posts/new',  component: PostNewComponent },
  { path: 'posts/:postId',  component: PostViewComponent },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}