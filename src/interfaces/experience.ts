import type { Association } from "./association";

export interface Experience {
  title: string;
  subtitle: string;
  start_date: string;
  end_date: string;
  content: string;
  association: Association;
}
