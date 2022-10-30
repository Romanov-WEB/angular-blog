import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {switchMap} from "rxjs";
import {PostsService} from "../../shared/services/posts.service";

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from "../shared/interfaces";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPageComponent implements OnInit {
  form: FormGroup

  constructor(
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getById(params['id'])
      })
    ).subscribe((post: Post) => {
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required)
      })
      this.cdr.markForCheck()
    })

  }

  submit() {

  }
}
