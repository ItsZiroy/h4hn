import type File from "./file";

export default interface Project {
  id: number;

  name: string;
  url: string;
  slug: string;
  programming_languages: string[];
  year: string;
  header?: File;
  poster?: File;
}
