import { Component, Input, Output, EventEmitter } from "@angular/core";
import { mockedAuthorsList } from "../../mocks/mocks";
import { getAuthorsWithNamesAndIds } from "../../utils/author-utils";

export interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: Date | string;
  duration: number;
  authors: string[];
}

@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent {
  @Input() course!: Course;
  @Input() editable = false;

  @Output() clickOnShow = new EventEmitter<Course>();
  @Output() editCourse = new EventEmitter<Course>();
  @Output() deleteCourse = new EventEmitter<Course>();

  onShow() {
    this.clickOnShow.emit(this.course);
  }

  onEdit() {
    this.editCourse.emit(this.course);
  }

  onDelete() {
    this.deleteCourse.emit(this.course);
  }

  getAuthorsWithNamesAndIds(): string {
    return getAuthorsWithNamesAndIds(this.course.authors);
  }
}
