import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Course } from "../course-card/course-card.component";

@Component({
  selector: "app-course-list",
  templateUrl: "./course-list.component.html",
  styleUrls: ["./course-list.component.scss"],
})
export class CourseListComponent {
  @Input() courses: Course[] = [];
  @Input() editable = false;

  @Output() showCourse = new EventEmitter<Course>();
  @Output() editCourse = new EventEmitter<Course>();
  @Output() deleteCourse = new EventEmitter<Course>();

  handleShow(course: Course) {
    this.showCourse.emit(course);
  }

  handleEdit(course: Course) {
    this.editCourse.emit(course);
  }

  handleDelete(course: Course) {
    this.deleteCourse.emit(course);
  }
}
