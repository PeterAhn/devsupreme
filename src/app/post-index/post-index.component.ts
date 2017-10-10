import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { ApiResponse } from '../api-response';

import { UtilService } from '../util.service';
import { PostService } from '../post.service';
import { UserService } from '../user.service';

import { Post } from '../post';

@Component({
  selector: 'app-post-index',
  templateUrl: './post-index.component.html',
  styleUrls: ['./post-index.component.css']
})
export class PostIndexComponent implements OnInit {
  posts: Post[];
  maxPage: number;

  constructor(
    private postService: PostService,
  ) {
    this.postService.index()
    .then(val =>
      this.posts = val.posts
    )
    .catch(response => null);
  }

  ngOnInit() {
  }

}
