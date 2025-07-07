import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { CoursesService, Course, Author } from "./courses.service";

@Injectable({
  providedIn: "root",
})
export class CoursesStoreService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  private courses$$ = new BehaviorSubject<Course[]>([]);
  private authors$$ = new BehaviorSubject<Author[]>([]);

  public isLoading$ = this.isLoading$$.asObservable();
  public courses$ = this.courses$$.asObservable();
  public authors$ = this.authors$$.asObservable();

  constructor(private coursesService: CoursesService) {}

  getAll(): void {
    this.isLoading$$.next(true);
    this.coursesService.getAll().subscribe({
      next: (courses) => {
        this.courses$$.next(courses);
        this.isLoading$$.next(false);
      },
      error: (error) => {
        console.error("Error fetching courses:", error);
        this.isLoading$$.next(false);
      },
    });
  }

  createCourse(course: Omit<Course, "id" | "creationDate">): void {
    this.isLoading$$.next(true);
    this.coursesService.createCourse(course).subscribe({
      next: (response) => {
        if (response.successful) {
          this.getAll(); // Refresh the list
        }
        this.isLoading$$.next(false);
      },
      error: (error) => {
        console.error("Error creating course:", error);
        this.isLoading$$.next(false);
      },
    });
  }

  editCourse(id: string, course: Omit<Course, "id" | "creationDate">): void {
    this.isLoading$$.next(true);
    this.coursesService.editCourse(id, course).subscribe({
      next: (response) => {
        if (response.successful) {
          this.getAll(); // Refresh the list
        }
        this.isLoading$$.next(false);
      },
      error: (error) => {
        console.error("Error editing course:", error);
        this.isLoading$$.next(false);
      },
    });
  }

  getCourse(id: string): Observable<Course> {
    return this.coursesService.getCourse(id);
  }

  deleteCourse(id: string): void {
    this.isLoading$$.next(true);
    this.coursesService.deleteCourse(id).subscribe({
      next: (response) => {
        if (response.successful) {
          this.getAll(); // Refresh the list
        }
        this.isLoading$$.next(false);
      },
      error: (error) => {
        console.error("Error deleting course:", error);
        this.isLoading$$.next(false);
      },
    });
  }

  filterCourses(searchValue: string): void {
    this.isLoading$$.next(true);
    this.coursesService.filterCourses(searchValue).subscribe({
      next: (courses) => {
        this.courses$$.next(courses);
        this.isLoading$$.next(false);
      },
      error: (error) => {
        console.error("Error filtering courses:", error);
        this.isLoading$$.next(false);
      },
    });
  }

  getAllAuthors(): void {
    this.coursesService.getAllAuthors().subscribe({
      next: (authors) => {
        this.authors$$.next(authors);
      },
      error: (error) => {
        console.error("Error fetching authors:", error);
      },
    });
  }

  createAuthor(author: Omit<Author, "id">): void {
    this.coursesService.createAuthor(author).subscribe({
      next: (response) => {
        if (response.successful) {
          this.getAllAuthors(); // Refresh the authors list
        }
      },
      error: (error) => {
        console.error("Error creating author:", error);
      },
    });
  }

  getAuthorById(id: string): Observable<Author> {
    return this.coursesService.getAuthorById(id);
  }

  // Metoda do wyszukiwania kursów
  searchCourses(searchTerm: string): void {
    this.filterCourses(searchTerm);
  }
}
