import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@app/auth/services/auth.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  loginForm: FormGroup;
  submitted = false;
  errorMessage = "";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = "";

    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          if (response.successful) {
            this.authService.setToken(response.result);
            this.router.navigate(["/courses"]);
          } else {
            this.errorMessage = "Login failed.";
          }
        },
        error: (error) => {
          this.errorMessage = "Login failed.";
          console.error("Login error:", error);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
