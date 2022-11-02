import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { filter, map, Observable, switchMap, tap } from "rxjs";
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
      map(({ post }) => post),
      tap((post) => this.setForm(post))
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

    this.post$ = this.route.params.pipe(
      map(({ id }) =>  id),
      switchMap((id) => {
        return  this.postsService.update(id, {
          ...this.form.value,
          id,
          date: new Date(),
        })
      }),
      tap(() => this.router.navigate(['/admin', 'dashboard'])),
    )
  }
}
