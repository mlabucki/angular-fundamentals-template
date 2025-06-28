import { Component, Input, Output, EventEmitter } from "@angular/core";

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
  @Input() editable = true;

  @Output() clickOnShow = new EventEmitter<string>();
  @Output() clickOnEdit = new EventEmitter<string>();
  @Output() clickOnDelete = new EventEmitter<string>();

  onShowCourse(): void {
    this.clickOnShow.emit(this.course.id);
  }

  onEditCourse(): void {
    this.clickOnEdit.emit(this.course.id);
  }

  onDeleteCourse(): void {
    this.clickOnDelete.emit(this.course.id);
  }
}
