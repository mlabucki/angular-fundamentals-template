import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
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
  medium = "";

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      let medium = paramMap.get("medium");
      if (medium && medium.toLowerCase() === "all") {
        this.medium = "";
      } else if (medium) {
        this.medium = medium;
      }
      this.loadCourses();
    });
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

  onAddNewCourse() {
    this.router.navigate(["/courses/add"]);
  }

  loadCourses() {
    this.coursesList = mockedCoursesList.map((course) => ({
      ...course,
      creationDate: new Date(course.creationDate),
    }));
  }
}
