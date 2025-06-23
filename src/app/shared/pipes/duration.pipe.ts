import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "duration" })
export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    if (typeof value !== "number" || isNaN(value)) return "";
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes} hours`;
  }
}
