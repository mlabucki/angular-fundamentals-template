import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { Course } from "../../shared/components/course-card/course-card.component";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent implements OnInit, OnChanges {
  @Input() course!: Course;

  @Output() backClick = new EventEmitter<void>();

  ngOnInit(): void {
    if (!this.course) {
      console.log("Course undefined");
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["course"]) {
      console.log(`New value: ${changes["course"].currentValue}`);
    }
  }

  onBackClick() {
    this.backClick.emit();
  }
}
