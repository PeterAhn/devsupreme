import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth.guard';
import { UtilService } from './util.service';
import { AuthService } from './auth.service';
import { RequestInterceptor } from './request-interceptor.service';
import { UserService } from './user.service'; 
import { PostService } from './post.service';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { Error404Component } from './error404/error404.component';
import { LoginComponent } from './login/login.component';
import { UserNewComponent } from './user-new/user-new.component';
import { UserIndexComponent } from './user-index/user-index.component';
import { PostIndexComponent } from './post-index/post-index.component';
import { PostNewComponent } from './post-new/post-new.component'; 

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    Error404Component,
    LoginComponent,
    UserNewComponent,
    UserIndexComponent,
    PostIndexComponent,
    PostNewComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    AuthGuard,
    UtilService,
    AuthService,
    UserService,
    PostService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
