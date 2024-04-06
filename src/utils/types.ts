export const toError = (e: unknown): Error => {
  if (e instanceof Error) {
    return e;
  }
  return new Error(String(e));
};
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
