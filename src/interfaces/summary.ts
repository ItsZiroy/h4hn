import type { Association } from "./association";
import type File from "./file";

export interface Summary {
  name: string;
  title: string;
  picture: File;
  associations: Association[];
}
