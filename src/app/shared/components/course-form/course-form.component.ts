import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Course } from "../course-card/course-card.component";
import { CoursesService } from "../../../services/courses.service";

export type Author = {
  id: string;
  name: string;
};

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent implements OnInit {
  courseForm!: FormGroup;
  submitted = false;
  courseAuthors: Author[] = [];
  medium = "";

  constructor(
    public fb: FormBuilder,
    public library: FaIconLibrary,
    private router: Router,
    private coursesService: CoursesService,
    private route: ActivatedRoute
  ) {
    library.addIconPacks(fas);
    this.buildForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const mediumParam = paramMap.get("medium");
      if (mediumParam) {
        this.medium = mediumParam;
      }
    });
  }

  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
  buildForm(): void {
    this.courseForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.minLength(2)]],
      duration: [null, [Validators.required, Validators.min(0)]],
      authors: this.fb.array([]),
      author: this.fb.control("", [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern("^[a-zA-Z0-9 ]+$"),
      ]),
    });
  }

  get authors(): FormArray {
    return this.courseForm.get("authors") as FormArray;
  }

  get author(): FormControl {
    return this.courseForm.get("author") as FormControl;
  }

  addAuthorToCourse(index: number): void {
    const author = this.authors.at(index).value;
    this.courseAuthors.push(author);
    this.authors.removeAt(index);
  }

  removeAuthorFromCourse(index: number): void {
    const author = this.courseAuthors[index];
    this.authors.push(this.fb.control(author));
    this.courseAuthors.splice(index, 1);
  }

  removeAuthorFromList(authorId: string): void {
    const index = this.authors.controls.findIndex(
      (ctrl) => ctrl.value.id === authorId
    );
    if (index !== -1) {
      this.authors.removeAt(index);
    }
  }

  createAuthor(): void {
    if (this.author.invalid) return;
    const name = this.author.value.trim();
    if (!name) return;
    const newAuthor: Author = {
      id: this.generateId(),
      name,
    };
    this.authors.push(this.fb.control(newAuthor));
    this.author.reset();
  }

  generateId(): string {
    return Math.random().toString(36).substring(2, 10);
  }

  trackByAuthorIndex(index: number, item: any): number {
    return index;
  }

  onSubmit(course: Course) {
    const result = this.coursesService.createCourse(course);
    if (result) {
      result.subscribe(() => {
        this.router.navigate(["/courses", { medium: this.medium }]);
      });
    } else {
      this.router.navigate(["/courses", { medium: this.medium }]);
    }
  }
}
