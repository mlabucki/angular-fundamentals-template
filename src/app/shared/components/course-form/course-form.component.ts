import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Author } from "@app/types/types";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent {
  courseForm!: FormGroup;
  submitted = false;

  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
    this.buildForm();
  }

  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
  buildForm(): void {
    this.courseForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.minLength(2)]],
      duration: [null, [Validators.required, Validators.min(0)]],
      author: ["", [Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9 ]+$/)]],
      authors: this.fb.array([]),
      courseAuthors: this.fb.array([]),
    });
  }

  get authors(): FormArray {
    return this.courseForm?.get("authors") as FormArray;
  }

  get authorsArray(): FormArray<FormControl<string>> {
    return this.courseForm?.get("authors") as FormArray<FormControl<string>>;
  }

  get courseAuthors(): FormArray {
    return this.courseForm?.get("courseAuthors") as FormArray;
  }

  get authorControl(): FormControl<string> {
    return this.courseForm?.get("author") as FormControl<string>;
  }

  get courseAuthorsControls() {
    return (this.courseForm.get("courseAuthors") as FormArray).controls;
  }

  createAuthor(): void {
    const name = this.authorControl?.value?.trim();
    if (!name || this.authorControl?.invalid) return;

    const newAuthor: Author = {
      id: crypto.randomUUID(),
      name,
    };

    this.authors.push(new FormControl(newAuthor));
    this.authorControl?.reset();
  }

  addAuthorToCourse(index: number): void {
    const selectedAuthor = this.authors.at(index).value as Author;
    this.courseAuthors.push(new FormControl(selectedAuthor));
    this.authors.removeAt(index);
  }

  removeAuthorFromCourse(index: number): void {
    const removedAuthor = this.courseAuthors.at(index).value as Author;
    this.courseAuthors.removeAt(index);
    this.authors.push(new FormControl(removedAuthor));
  }

  removeAuthorFromList(id: string): void {
    const index = this.authors.controls.findIndex((ctrl) => ctrl.value.id === id);
    this.authors.removeAt(index);
  }

  trackByAuthorIndex(index: number): number {
    return index;
  }

  onSubmit() {
    this.submitted = true;
    if (this.courseForm?.valid) {
      console.log("submit course form", this.courseForm?.value);
      this.authorsArray?.clear();
      this.courseForm?.reset();
      this.submitted = false;
    } else {
      this.courseForm?.markAllAsTouched();
    }
  }
}
