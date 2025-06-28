import { Component, ChangeDetectionStrategy } from "@angular/core";
import { mockedCoursesList } from "./shared/mocks/mocks";
import { Course } from "./shared/components/course-card/course-card.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly title = "courses-app";

  readonly user = {
    name: "Michał Łabucki",
  };

  readonly courses: Course[] = mockedCoursesList.slice(0, 1);

  onBackClick(): void {
    console.log("Back button clicked");
  }

  onLogout(): void {
    console.log("User logged out");
  }

  onAddNewCourse(): void {
    console.log("Add new course clicked");
  }
}
