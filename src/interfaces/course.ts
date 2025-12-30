import type { Association } from "./association";
import type File from "./file";
import type { Icon } from "./icon";
import type { Lecture } from "./lecture";
import type { Semester } from "./semester";

export interface Course {
  id: number;
  name: string;
  description: string;
  slug: string;
  header: File;
  links: Icon[];
  lectures: Lecture[];
  semester: Semester;
  association: Association;
}
