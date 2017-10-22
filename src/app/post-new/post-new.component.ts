import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiResponse } from '../api-response';

import { UtilService } from '../util.service';
import { AuthService } from '../auth.service';
import { PostService } from '../post.service';

import { User } from '../user';

declare var $: any;

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css']
})
export class PostNewComponent implements OnInit {
  user = {
    '_id': '',
    'username': ''
  };
  errorResponse: ApiResponse;
  form: FormGroup;
  formErrors = {
    'title':'',
    'body':'',
  };
  formErrorMessages = {
    'title': {
      'required': 'Title is required!',
    },
    'body': {
      'required': 'Body is required!',
    },    
  };
  buildForm(): void {
    this.form = this.formBuilder.group({
      title:["", [Validators.required]],
      body:["", ],
      author:[ { 
        value: '',
        disabled: true
      }],
    }, {
      validator: this.customValidation,
    });

    this.form.valueChanges.subscribe(data => {
      this.utilService.updateFormErrors(this.form, this.formErrors, this.formErrorMessages);
    });
  };

  customValidation(group: FormGroup) {
   
  }

  constructor(    
    private router: Router,
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private authService: AuthService,
    private postService: PostService,
  ) {
    this.buildForm();

    this.authService.me().then(val => {
      this.user = val;
    });
  }

  ngOnInit() {
    $('#body').summernote();
  }

  submit() {
    this.form.value.body = $('#body').summernote('code');

    console.log(this.form.value.body);
    this.utilService.makeFormDirtyAndUpdateErrors(this.form, this.formErrors, this.formErrorMessages);
    if(this.form.valid){
      this.form.value.author = this.user._id;
      this.postService.create(this.form.value)
      .then(data =>{
        this.router.navigate(['/', 'posts']);
      })
      .catch(response =>{
        this.errorResponse = response;
        this.utilService.handleFormSubmitError(this.errorResponse, this.form, this.formErrors);
      });
    }
  }
}
