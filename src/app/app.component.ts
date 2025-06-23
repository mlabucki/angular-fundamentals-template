import { Component } from "@angular/core";
import { mockedCoursesList } from "./shared/mocks/mocks";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "courses-app";

  coursesCount = 3;
  editable = true;

  courses = mockedCoursesList.slice(0, this.coursesCount);

  showCourse(course: any) {
    alert("Show: " + course.title);
  }

  editCourse(course: any) {
    alert("Edit: " + course.title);
  }

  deleteCourse(course: any) {
    alert("Delete: " + course.title);
  }
}
