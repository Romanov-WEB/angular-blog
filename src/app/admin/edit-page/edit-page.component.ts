import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, switchMap, takeUntil} from "rxjs";
import {PostsService} from "../../shared/services/posts.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DestroyService} from "../shared/services/destroy.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPageComponent implements OnInit {
  form: FormGroup
  postId$ = new BehaviorSubject<string>('')

  constructor(
    @Inject(DestroyService) private destroy$: DestroyService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService
  ) {
    this.getId()
  }

  getId() {
    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe((param) => {
      this.postId$.next(param['id'])
    })
  }

  ngOnInit() {
    this.postId$.pipe(
      switchMap(id => {
        return this.postsService.getById(id)
      }),
      takeUntil(this.destroy$)
    ).subscribe((post) => {
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required),
        author: new FormControl(post.author,  Validators.required)
      })
      this.cdr.markForCheck()
    })
  }

  submit() {
    if (this.form.invalid){
      return
    }

    this.postsService.update(this.postId$.getValue(),{
      ...this.form.value,
      date: new Date(),
    }).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.router.navigate(['/admin', 'dashboard'])
    })
  }
}
