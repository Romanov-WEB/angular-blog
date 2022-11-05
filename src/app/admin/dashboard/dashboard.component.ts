import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { PostsService } from "../../shared/services/posts.service";
import { Post } from "../shared/interfaces";
import { BehaviorSubject, takeUntil } from "rxjs";
import { DestroyService } from "../shared/services/destroy.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  posts$ = new BehaviorSubject<Post[]>([])
  searchStr = '';

  constructor(
    @Inject(DestroyService) private readonly destroy$: DestroyService,
    private postsService: PostsService
  ) {
    this.initPosts();
  }

  initPosts(): void {
    this.postsService.getAll()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(posts => this.posts$.next(posts))
  }

  remove(id: string) {
    this.postsService.removePost(id)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        const initialPosts = this.posts$.getValue()
        const updatedPosts = initialPosts.filter(post => post.id !== id);
        this.posts$.next(updatedPosts)
      })
  }
}
