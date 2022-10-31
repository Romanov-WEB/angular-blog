import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {filter, map, Observable, switchMap, takeUntil, tap} from "rxjs";
import { PostsService } from "../../shared/services/posts.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Post } from "../shared/interfaces";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPageComponent {
  form: FormGroup
  post$: Observable<Post>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService
  ) {
    this.post$ = this.route.data.pipe(
      filter(Boolean),
      map(data => {
        this.setForm(data['post'])
        return data['post']
      })
    )
  }

  private setForm(post: Post): void {
    this.form = new FormGroup({
      title: new FormControl(post.title, Validators.required),
      text: new FormControl(post.text, Validators.required),
      author: new FormControl(post.author, Validators.required)
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.post$ = this.route.data.pipe(
      switchMap((data) => {
        return  this.postsService.update(data['id'], {
          ...this.form.value,
          date: new Date(),
          id: data['id']
        })
      }),
      tap(() => this.router.navigate(['/admin', 'dashboard'])),
    )
  }
}
