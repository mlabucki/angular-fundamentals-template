import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Course } from "../../shared/components/course-card/course-card.component";
import { getAuthorsWithNamesAndIds } from "../../shared/utils/author-utils";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent {
  @Input() course!: Course;

  @Output() backClick = new EventEmitter<void>();

  onBackClick() {
    this.backClick.emit();
  }

  getAuthorsWithNamesAndIds(): string {
    return getAuthorsWithNamesAndIds(this.course.authors);
  }
}
