import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Course } from "../../shared/components/course-card/course-card.component";
import { mockedAuthorsList } from "../../shared/mocks/mocks";

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
    return this.course.authors
      .map((authorId) => {
        const author = mockedAuthorsList.find((a) => a.id === authorId);
        return author ? `${author.name}` : authorId;
      })
      .join(", ");
  }
}
