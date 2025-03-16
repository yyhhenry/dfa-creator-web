import { marked, type Token } from 'marked';
import markedKatex from 'marked-katex-extension';
import 'highlight.js/styles/github-dark.min.css';
import DOMPurify from 'dompurify';

marked.use(
  markedKatex({
    throwOnError: false,
    output: 'mathml',
    nonStandard: true,
    strict: false,
  }),
);

/**
 * Transfer inline `\( ... \)` and  block `\[ ... \]` formulas to katex format.
 * Katex format: `$ ... $` and `$$ ... $$` (whitespace cannot be omitted)
 */
function bracketsFormulaToKatex(content: string) {
  const inlinePattern = /\\\((.*?)\\\)/g;
  const blockPattern = /\\\[(.*?)\\\]/gs;

  content = content.replaceAll(
    inlinePattern,
    (_, formula) => ` $ ${formula} $ `,
  );

  content = content.replaceAll(
    blockPattern,
    (_, formula) => `\n$$\n${formula}\n$$\n`,
  );

  return content;
}

export function markedLex(content: string) {
  content = bracketsFormulaToKatex(content);

  return marked.lexer(content);
}
export function markedParse(tokens: Token | Token[]) {
  tokens = Array.isArray(tokens) ? tokens : [tokens];
  return DOMPurify.sanitize(marked.parser(tokens));
}
