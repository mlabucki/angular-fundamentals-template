import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Course } from "../../../shared/components/course-card/course-card.component";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"],
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Input() editable = false;

  @Output() showCourse = new EventEmitter<Course>();
  @Output() editCourse = new EventEmitter<Course>();
  @Output() deleteCourse = new EventEmitter<Course>();

  handleShow(courseId: string) {
    const course = this.courses.find((c) => c.id === courseId);
    if (course) {
      this.showCourse.emit(course);
    }
  }

  handleEdit(courseId: string) {
    const course = this.courses.find((c) => c.id === courseId);
    if (course) {
      this.editCourse.emit(course);
    }
  }

  handleDelete(courseId: string) {
    const course = this.courses.find((c) => c.id === courseId);
    if (course) {
      this.deleteCourse.emit(course);
    }
  }
}
