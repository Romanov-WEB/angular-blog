import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {filter, map, Observable} from "rxjs";
import { Post } from "../../admin/shared/interfaces";
import { environment } from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class PostsService {
  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    return this.http.post(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(map((response: any) => {
        return {
          ...post,
          id: response.name,
          date: new Date(post.date)
        }
      })
    )
  }

  getAll(): Observable<Post[]> {
    return this.http.get(`${environment.fbDbUrl}/posts.json`)
      .pipe(
        filter(Boolean),
        map((response) => {
          return Object.keys(response).map(key => ({
            ...response[key],
            id: key,
          }))
      }))
  }

  removePost(id: string): Observable<Post> {
    return this.http.delete<Post>(`${environment.fbDbUrl}/posts/${id}.json`)
  }

  getById(id): Observable<Post> {
    return this.http.get<Post>(`${environment.fbDbUrl}/posts/${id}.json`)
  }

  update(id: string, post: Post): Observable<Post> {
    return this.http.patch<Post>(`${environment.fbDbUrl}/posts/${id}.json`, post)
  }

}
