import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';

import { HttpModule } from '@angular/http';

import $ from 'jquery/dist/jquery';

import 'bootstrap/dist/js/bootstrap.min.js';
import 'summernote/dist/summernote.min.js';
 

import {SummernoteComponent} from 'ng2-alt-summernote';

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
import { PostViewComponent } from './post-view/post-view.component';
import { DomSanitizer } from '@angular/platform-browser'
@Pipe({ name: 'escapeHtml', pure: false })
export class EscapeHtmlPipe implements PipeTransform {
    constructor(private sanitized: DomSanitizer) { }
    transform(value: any, args: any[] = []) {       
        // simple JS inj cleanup that should be done on server side primarly
        if (value.indexOf('<script>') != -1) {
            console.log('JS injection. . . html purified');
            return value.replace('<script>', '').replace('<\/script>', '');
        }
        return this.sanitized.bypassSecurityTrustHtml(value); // so ng2 does not remove CSS
    }
}

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    Error404Component,
    EscapeHtmlPipe,
    LoginComponent,
    UserNewComponent,
    UserIndexComponent,
    PostIndexComponent,
    PostNewComponent, 
    PostViewComponent,
    SummernoteComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,    
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
