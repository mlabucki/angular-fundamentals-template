import { Component, Input, Output, EventEmitter } from "@angular/core";

export interface Course {
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

  onShowClick() {
    this.clickOnShow.emit(this.course);
  }

  onEditClick() {
    alert("Edited");
  }

  onDeleteClick() {
    alert("Deleted");
  }
}
