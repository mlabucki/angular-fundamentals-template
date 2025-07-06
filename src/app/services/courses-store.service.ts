import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { CoursesService, Course, Author } from "./courses.service";

@Injectable({
  providedIn: "root",
})
export class CoursesStoreService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  private courses$$ = new BehaviorSubject<Course[]>([]);

  public isLoading$ = this.isLoading$$.asObservable();
  public courses$ = this.courses$$.asObservable();

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

  createCourse(course: Course): void {
    this.isLoading$$.next(true);
    this.coursesService.createCourse(course).subscribe({
      next: (newCourse) => {
        const currentCourses = this.courses$$.value;
        this.courses$$.next([...currentCourses, newCourse]);
        this.isLoading$$.next(false);
      },
      error: (error) => {
        console.error("Error creating course:", error);
        this.isLoading$$.next(false);
      },
    });
  }

  getCourse(id: string): Observable<Course> {
    return this.coursesService.getCourse(id);
  }

  editCourse(id: string, course: Course): void {
    this.isLoading$$.next(true);
    this.coursesService.editCourse(id, course).subscribe({
      next: (updatedCourse) => {
        const currentCourses = this.courses$$.value;
        const updatedCourses = currentCourses.map((c) =>
          c.id === id ? updatedCourse : c
        );
        this.courses$$.next(updatedCourses);
        this.isLoading$$.next(false);
      },
      error: (error) => {
        console.error("Error updating course:", error);
        this.isLoading$$.next(false);
      },
    });
  }

  deleteCourse(id: string): void {
    this.isLoading$$.next(true);
    this.coursesService.deleteCourse(id).subscribe({
      next: () => {
        const currentCourses = this.courses$$.value;
        const filteredCourses = currentCourses.filter((c) => c.id !== id);
        this.courses$$.next(filteredCourses);
        this.isLoading$$.next(false);
      },
      error: (error) => {
        console.error("Error deleting course:", error);
        this.isLoading$$.next(false);
      },
    });
  }

  filterCourses(value: string): void {
    if (!value.trim()) {
      this.getAll();
      return;
    }

    this.isLoading$$.next(true);
    this.coursesService.filterCourses(value).subscribe({
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

  getAllAuthors(): Observable<Author[]> {
    return this.coursesService.getAllAuthors();
  }

  createAuthor(name: string): Observable<Author> {
    return this.coursesService.createAuthor(name);
  }

  getAuthorById(id: string): Observable<Author> {
    return this.coursesService.getAuthorById(id);
  }

  // Metoda do wyszukiwania kursów
  searchCourses(searchTerm: string): void {
    this.filterCourses(searchTerm);
  }
}
