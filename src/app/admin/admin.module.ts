import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { AuthGuard } from "./shared/services/auth.guard";
import { SearchPipe } from './shared/search.pipe';
import { EditPostResolver } from "./edit-page/edit-post.resolver";
import { LoginGuard } from "./shared/services/login.guard";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardComponent,
    CreatePageComponent,
    EditPageComponent,
    SearchPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          { path: 'login', component: LoginPageComponent, canActivate: [LoginGuard] },
          { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
          { path: 'create', component: CreatePageComponent, canActivate: [AuthGuard] },
          { path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuard], resolve: {
              post: EditPostResolver,
          } },
          {path: '**', redirectTo: '/', pathMatch: 'full'},
        ]
      }
    ])
  ],
  exports: [RouterModule],
  providers: [AuthGuard, LoginGuard]
})
export class AdminModule { }
