import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, filter, map, Observable, switchMap, takeUntil, tap} from "rxjs";
import {PostsService} from "../../shared/services/posts.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DestroyService} from "../shared/services/destroy.service";
import {Post} from "../shared/interfaces";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPageComponent {
  form: FormGroup
  post$: Observable<Post>;
  updatedPost$: BehaviorSubject<string> = new BehaviorSubject<string>('')

  constructor(
    @Inject(DestroyService) private destroy$: DestroyService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService
  ) {
    this.post$ = this.route.params
      .pipe(
        map((params) => params['id']),
        filter(Boolean),
        switchMap((id) => {
          this.updatedPost$.next(id);
          return this.postsService.getById(id)
        }),
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

    this.post$ = this.updatedPost$
      .pipe(
        switchMap((id) => this.postsService.update(id, {
          ...this.form.value,
          date: new Date(),
        })),
        tap(() => this.router.navigate(['/admin', 'dashboard']))
      )
  }
}
