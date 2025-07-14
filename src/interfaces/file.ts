export default interface File {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: any; // Replace 'any' with a more specific type if available
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null; // Replace 'any' with a more specific type if available
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
