import { nfaFromJson, dfaFromJson, regexToNfa } from 'dfa-creator';
import { Result } from 'neverthrow';
import { toError } from './storage';
export const safeNfaFromJson = Result.fromThrowable(
  (json: string) => nfaFromJson(json),
  toError
);
export const safeDfaFromJson = Result.fromThrowable(
  (json: string) => dfaFromJson(json),
  toError
);
export const safeRegexToNfa = Result.fromThrowable(
  (regex: string) => regexToNfa(regex),
  toError
);
