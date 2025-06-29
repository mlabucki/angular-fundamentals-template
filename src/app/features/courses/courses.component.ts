import { Component, OnInit } from "@angular/core";
import { mockedCoursesList } from "@app/shared/mocks/mocks";
import { Course } from "../../shared/components/course-card/course-card.component";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  coursesList: Course[] = [];
  listVisible: boolean = true;
  detailedCourse!: Course;

  ngOnInit(): void {
    this.coursesList = mockedCoursesList.map((course) => ({
      ...course,
      creationDate: new Date(course.creationDate),
    }));
  }

  onSearchCourses(searchText: string) {
    console.log(`show search text: ${searchText}`);
  }

  showInfo(course: Course) {
    this.listVisible = !this.listVisible;
    this.detailedCourse = course;
  }

  showList() {
    this.listVisible = !this.listVisible;
  }

  editCourse(course: Course) {
    console.log("edit...... " + course.title);
  }

  deleteCourse(course: Course) {
    console.log("delete...." + course.title);
  }
}
