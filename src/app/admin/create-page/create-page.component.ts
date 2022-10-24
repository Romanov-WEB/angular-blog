import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from "../shared/interfaces";
import {PostsService} from "../../shared/services/posts.service";
import {DestroyService} from "../shared/services/destroy.service";
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePageComponent implements OnInit {
  form!: FormGroup

  constructor(
    @Inject(DestroyService) private readonly destroy$: DestroyService,
    private postService: PostsService,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    const post: Post = {
      title: this.form.value.title,
      text: this.form.value.text,
      author: this.form.value.author,
      date: new Date()
    }
    this.postService.create(post)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe()
    this.form.reset()
  }
}
