import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PostsService} from "../../shared/services/posts.service";
import {Post} from "../shared/interfaces";
import {Observable} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  posts$: Observable<Post[]>;
  searchStr = '';

  constructor(private postsService: PostsService) {
    this.posts$ = this.postsService.getAll();
  }

  remove(id: string) {

  }
}
