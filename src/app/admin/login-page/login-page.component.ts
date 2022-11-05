import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "../shared/interfaces";
import { AuthService } from "../shared/services/auth.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { RedirectService } from "../../shared/services/redirect.service";
import { switchMap, takeUntil } from "rxjs";
import { DestroyService } from "../shared/services/destroy.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup
  massage: string = ''
  constructor(
    @Inject(DestroyService) private readonly destroy$: DestroyService,
    public render: ChangeDetectorRef,
    public auth: AuthService,
    public router: Router,
    private route: ActivatedRoute,
    private redirect: RedirectService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.massage = 'Введите логин и пароль!'
        this.render.markForCheck()
      } else if (params['authFailed']) {
        this.massage = 'Ссесия протухла!'
        this.render.markForCheck()
      }
    })
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ])
    })
  }

  submit() {
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    }

    this.auth.login(user).pipe(
      switchMap(() => this.redirect.router$),
      takeUntil(this.destroy$)
    ).subscribe((link) => {
      this.form.reset()
      this.router.navigate(['/admin', `${link}`])
    })
  }
}
