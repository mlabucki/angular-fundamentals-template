import { Component } from "@angular/core";
import { mockedCoursesList } from "@app/shared/mocks/mocks";
import { Course } from "@app/types/types";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.css"],
})
export class CoursesComponent {
  coursesList = mockedCoursesList;
  listVisible: boolean = true;
  detailedCourse!: Course;

  showInfo(course: Course) {
    this.listVisible = !this.listVisible;
    this.detailedCourse = course;
  }

  showList() {
    this.listVisible = !this.listVisible;
  }

  editCourse(id: string) {
    console.log("edit...... ");
  }

  deleteCourse(id: string) {
    console.log("delete....");
  }
}
