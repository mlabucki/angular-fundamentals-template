import { Component, ViewChild, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Course, Author } from "../../../services/courses.service";
import { CoursesStoreService } from "../../../services/courses-store.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent implements OnDestroy {
  @ViewChild("courseForm") public courseForm!: NgForm;
  courseSubscription!: Subscription;

  courseAuthors: Author[] = [];
  editMode = false;
  courseId: string | null = null;

  constructor(
    public library: FaIconLibrary,
    private router: Router,
    private route: ActivatedRoute,
    private coursesStore: CoursesStoreService
  ) {
    library.addIconPacks(fas);
    this.courseId = this.route.snapshot.paramMap.get("id");
    this.editMode = !!this.courseId;
  }

  createAuthor() {
    const authorName = this.courseForm.value.author?.trim();
    if (!authorName || authorName.length < 2) return;

    const newAuthor: Author = {
      id: Date.now().toString(),
      name: authorName,
    };

    this.courseAuthors.push(newAuthor);
    this.courseForm.form.patchValue({ author: "" });
  }

  addAuthorToCourse(author: Author): void {
    this.courseAuthors.push(author);
  }

  removeAuthorFromCourse(index: number): void {
    this.courseAuthors.splice(index, 1);
  }

  trackByAuthorIndex(index: number): number {
    return index;
  }

  onSubmit() {
    if (this.courseForm.valid) {
      const { title, description, duration } = this.courseForm.value;

      const courseData: Course = {
        id: this.editMode ? this.courseId! : Date.now().toString(),
        title: title,
        description: description,
        creationDate: new Date().toISOString(),
        duration: duration,
        authors: this.courseAuthors.map((a) => a.id),
      };

      if (this.editMode) {
        this.coursesStore.editCourse(courseData.id, courseData);
      } else {
        this.coursesStore.createCourse(courseData);
      }

      this.router.navigate(["/courses"]);
    }
  }

  cancelClick() {
    this.router.navigate(["/courses"]);
  }

  ngOnDestroy() {
    this.courseSubscription?.unsubscribe();
  }
}
