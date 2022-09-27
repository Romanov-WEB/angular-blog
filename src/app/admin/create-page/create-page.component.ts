import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
