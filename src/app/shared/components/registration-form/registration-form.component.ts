import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;

  submitted = false;
  name = "";

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
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
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registrationForm.valid) {
      console.log("Submit registration form", this.registrationForm.value);
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }
}
