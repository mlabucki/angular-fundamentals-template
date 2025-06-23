import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Course } from "../../shared/components/course-card/course-card.component";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent {
  @Input() course: Course = {
    id: "sample-id-123",
    title: "Sample Course Title",
    description:
      "This is a sample course description that shows how the course info component displays course details.",
    creationDate: "01/01/2023",
    duration: 120,
    authors: ["Sample Author 1", "Sample Author 2"],
  };

  @Output() backClick = new EventEmitter<void>();

  onBackClick() {
    this.backClick.emit();
  }
}
