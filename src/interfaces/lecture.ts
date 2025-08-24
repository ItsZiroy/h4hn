import type File from "./file";

export interface Lecture {
  topic: string;
  description: string;
  start: string;
  end: string;
  files: File[];
  type: "lecture" | "exercise" | "presentation" | "exam";
}
