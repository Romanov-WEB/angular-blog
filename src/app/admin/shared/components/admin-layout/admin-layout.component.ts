import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminLayoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  loguot($event: MouseEvent) {
    $event.preventDefault()
    this.router.navigate(['/admin', 'login'])
  }
}
