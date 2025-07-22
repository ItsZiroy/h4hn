import type { Experience } from "./experience";
import type File from "./file";
import type { Icon } from "./icon";

export interface Resume {
  about: string;
  email: string;
  age: number;
  socials: Icon[];
  workplaces: Experience[];
  institutions: Experience[];
  picture: File;
}
