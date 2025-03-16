export interface ViewMap {
  mermaid?: {
    title: string;
    content: string;
  };
  md?: string;
  json?: string;
  err?: string;
}
export interface TestViewMap extends ViewMap {
  accepted?: boolean;
}
