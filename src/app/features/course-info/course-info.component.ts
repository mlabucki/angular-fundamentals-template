import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { Course } from "../../services/courses.service";
import { DurationPipe } from "../../shared/pipes/duration.pipe";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent {
  @Input() course!: Course;

  @Output() backClick = new EventEmitter<void>();

  constructor(private router: Router) {}

  onBackClick(): void {
    this.backClick.emit();
  }

  onAddNewCourse() {
    this.router.navigate(["/courses/add"]);
  }
}
