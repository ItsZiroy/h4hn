import type { Association } from "./association";
import type File from "./file";
import type { Lecture } from "./lecture";
import type { Semester } from "./semester";

export interface Course {
  id: number;
  name: string;
  slug: string;
  header: File;
  lectures: Lecture[];
  semester: Semester;
  association: Association;
}
