import { Component } from "@angular/core";
import { mockedCoursesList } from "../../shared/mocks/mocks";
import { Course } from "../../shared/components/course-card/course-card.component";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent {
  coursesCount = 3;
  editable = true;
  courses = mockedCoursesList.slice(0, this.coursesCount);

  showCourse(course: Course) {
    alert("Show: " + course.title);
  }

  editCourse(course: Course) {
    alert("Edit: " + course.title);
  }

  deleteCourse(course: Course) {
    alert("Delete: " + course.title);
  }
}
