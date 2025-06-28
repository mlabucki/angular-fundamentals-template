import { Pipe, PipeTransform } from "@angular/core";
import { mockedAuthorsList } from "../mocks/mocks";

@Pipe({
  name: "customDate",
})
export class CustomDatePipe implements PipeTransform {
  transform(value: Date | string | number): string {
    if (!value) return "";
    const date = new Date(value);
    if (isNaN(date.getTime())) return "";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }
}

@Pipe({
  name: "duration",
})
export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    if (typeof value !== "number" || isNaN(value) || value < 0) return "";
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes} hours`;
  }
}

@Pipe({
  name: "authorNames",
})
export class AuthorNamesPipe implements PipeTransform {
  transform(authorIds: string[]): string {
    if (!authorIds || !Array.isArray(authorIds) || authorIds.length === 0) {
      return "No authors";
    }

    return authorIds
      .map((authorId) => {
        if (!authorId || typeof authorId !== "string") {
          return "Unknown Author";
        }
        const author = mockedAuthorsList.find((a) => a.id === authorId);
        return author ? `${author.name}` : "Unknown Author";
      })
      .join(", ");
  }
}
