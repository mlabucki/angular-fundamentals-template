import { Component } from "@angular/core";
import { mockedCoursesList } from "./shared/mocks/mocks";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "courses-app";
  courses = mockedCoursesList.slice(0, 1); // tylko dla course-info

  onBackClick() {
    alert("Back button clicked ");
  }
}
