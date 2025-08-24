import type { Course } from "./course";

export interface Semester {
  id: number;
  name: string;
  start: string;
  end: string;
  courses: Course[];
}
