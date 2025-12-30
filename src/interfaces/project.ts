import type File from "./file";
import type { Icon } from "./icon";

export default interface Project {
  id: number;

  name: string;
  description?: string;
  url: string;
  slug: string;
  icons: Icon[];
  year: string;
  header?: File;
  poster?: File;
}
