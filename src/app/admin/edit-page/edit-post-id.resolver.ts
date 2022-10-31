import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EditPostIdResolver implements Resolve<string> {
  resolve(route: ActivatedRouteSnapshot): string {
    return  route.paramMap.get('id')
  }
}
