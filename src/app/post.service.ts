import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { UtilService } from './util.service';
import { AuthService } from './auth.service';
import { ApiResponse } from './api-response';
import { User } from './user';
import { Post } from './post';


@Injectable()
export class PostService {
  private apiBaseUrl = `${environment.apiBaseUrl}/posts`;
 
  constructor(
    private http: HttpClient,
    private router: Router,
    private utilService: UtilService,
    private authService: AuthService,
  ) { }

  index(): Promise<any> {
    return this.http.get<ApiResponse>(`${this.apiBaseUrl}`)
              .toPromise()
              .then(this.utilService.checkSuccess)
              .then(response => {
                return response.data as any
              })
              .catch(this.utilService.handleApiError);
  }

  create(post: Post): Promise<Post> {    
    return this.http.post<ApiResponse>(`${this.apiBaseUrl}`, post)
              .toPromise()
              .then(this.utilService.checkSuccess)
              .then(response => {
                return response.data as Post
              })
              .catch(this.utilService.handleApiError);
  }

  get(postId: string): Promise<any> {
    return this.http.get<ApiResponse>(`${this.apiBaseUrl}/${postId}`)
              .toPromise()
              .then(this.utilService.checkSuccess)
              .then(response => {
                return response.data as any
              })
              .catch(this.utilService.handleApiError);
  }

  setAuthor(post: Post): Post {
    this.authService.me().then(user => {
      post.author = user._id;
    });
    return post;
  }
  
  
}