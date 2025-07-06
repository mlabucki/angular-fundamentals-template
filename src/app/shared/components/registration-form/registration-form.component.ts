import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "@app/auth/services/auth.service";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;

  submitted = false;
  name = "";
  errorMessage = "";

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.name = params["name"];
    });
  }

  buildForm(): void {
    this.registrationForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(6)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = "";

    if (this.registrationForm.valid) {
      this.authService.register(this.registrationForm.value).subscribe({
        next: (response) => {
          if (response.successful) {
            this.authService.setToken(response.result);
            this.router.navigate(["/courses"]);
          } else {
            this.errorMessage = "Registration failed.";
          }
        },
        error: (error) => {
          this.errorMessage = "Registration failed.";
          console.error("Registration error:", error);
        },
      });
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }
}
