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
