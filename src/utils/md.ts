import MarkdownIt from 'markdown-it';
import KatexIt from './katex-it';
import hljs from 'highlight.js';
import type { KatexOptions } from 'katex';

export const md = MarkdownIt({
  highlight: (str, lang) => {
    if (lang === 'mermaid') {
      const pre = document.createElement('pre');
      pre.className = 'mermaid';
      pre.textContent = str;
      return pre.outerHTML;
    }
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {
        // ignore
      }
    }
    return '';
  },
}).use(KatexIt, { output: 'mathml' } satisfies KatexOptions);
