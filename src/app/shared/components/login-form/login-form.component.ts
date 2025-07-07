import { Component, ViewChild, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@app/auth/services/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent implements OnDestroy {
  @ViewChild("loginForm") public loginForm!: NgForm;
  loginSubscription!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const user = { email, password };

      this.loginSubscription = this.authService.login(user).subscribe({
        next: (res) => {
          console.log("LOGGED!:", res);
          if (res.successful) {
            this.router.navigate(["/courses"]);
          } else {
            console.error("LOGGIN ERROR", res);
          }
        },
        error: (err) => {
          console.error("Login error:", err);
        },
      });
    }
  }

  ngOnDestroy() {
    this.loginSubscription?.unsubscribe();
  }
}
