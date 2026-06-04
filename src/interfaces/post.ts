import type File from "./file";

import { renderToHTMLString } from "@tiptap/static-renderer";

export interface Post {
  title: string;
  header: File;
  slug: string;
  content: any;
  htmlContent: string;
  createdAt: string;
  updatedAt: string;
}
