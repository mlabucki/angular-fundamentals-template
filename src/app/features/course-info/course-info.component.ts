import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Course } from "../../shared/components/course-card/course-card.component";
import { DurationPipe } from "../../shared/pipes/duration.pipe";

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
}
