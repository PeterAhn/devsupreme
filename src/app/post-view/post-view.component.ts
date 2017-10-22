import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { ApiResponse } from '../api-response';

import { UtilService } from '../util.service';
import { PostService } from '../post.service';
import { UserService } from '../user.service';

import { Post } from '../post';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {
  post: Post;
  postText: string = "";
  
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
  ) { 
    
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('postId');
    
    this.postService.get(id).then(val =>
      this.post = val.post
    )
    .catch(response => null);
   
  }

}
