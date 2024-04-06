import {
  reg2nfa,
  nfa2dfa,
  minimize_dfa,
  nfa2mermaid,
  dfa2mermaid,
  test_nfa,
  test_dfa,
} from 'dfa-creator';
import { toError } from './types';
import { fromThrowable } from 'neverthrow';
export const safeReg2nfa = fromThrowable(reg2nfa, toError);
export const safeNfa2dfa = fromThrowable(
  (nfa: string) => nfa2dfa(nfa) as [string, string],
  toError,
);
export const safeMinDfa = fromThrowable(
  (dfa: string) => minimize_dfa(dfa) as [string, string],
  toError,
);
export const safeShowNfa = fromThrowable(nfa2mermaid, toError);
export const safeShowDfa = fromThrowable(dfa2mermaid, toError);
export const safeTestNfa = fromThrowable(test_nfa, toError);
export const safeTestDfa = fromThrowable(test_dfa, toError);
