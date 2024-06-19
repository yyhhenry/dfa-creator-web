import { nfaFromJson, dfaFromJson, regexToNfa } from 'dfa-creator';
import { safely } from '@yyhhenry/rust-result';
export const safeNfaFromJson = (json: string) =>
  safely(() => nfaFromJson(json));
export const safeDfaFromJson = (json: string) =>
  safely(() => dfaFromJson(json));
export const safeRegexToNfa = (regex: string) =>
  safely(() => regexToNfa(regex));
