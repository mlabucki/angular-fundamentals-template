import { Component } from "@angular/core";
import { AuthService } from "./auth/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "courses-app";
  username? = "";
  buttonText = "LOGOUT";
  titleInfo = "Your List is Empty";
  textInfo = `'Add New Course' to add your first course`;
  buttonInfo = "ADD NEW COURSE";

  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(["/login"]);
    });
  }
}
