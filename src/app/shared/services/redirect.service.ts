import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})
export class RedirectService {
  router$ = new BehaviorSubject('dashboard')

  redirect(router: any) {
    this.router$.next(router)
  }

}
