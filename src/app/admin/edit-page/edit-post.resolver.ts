import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from "../shared/interfaces";
import { PostsService } from "../../shared/services/posts.service";

@Injectable({
  providedIn: 'root'
})
export class EditPostResolver implements Resolve<Post> {
  constructor(private readonly postsService: PostsService) {
  }
  resolve(route: ActivatedRouteSnapshot ): Observable<Post> {
    const id = route.paramMap.get('id')
    return this.postsService.getById(id);
  }
}
