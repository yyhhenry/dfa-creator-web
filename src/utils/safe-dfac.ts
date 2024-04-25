import { nfaFromJson, dfaFromJson, regexToNfa } from 'dfa-creator';
import { toError } from './types';
import { fromThrowable } from 'neverthrow';
export const safeNfaFromJson = fromThrowable(nfaFromJson, toError);
export const safeDfaFromJson = fromThrowable(dfaFromJson, toError);
export const safeRegexToNfa = fromThrowable(regexToNfa, toError);
