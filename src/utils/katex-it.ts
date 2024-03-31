import katex, { type KatexOptions } from 'katex';
import MarkdownIt from 'markdown-it';
const KatexIt: MarkdownIt.PluginWithOptions<KatexOptions> = (md, userOptions) => {
  const options = userOptions ?? {};

  md.inline.ruler.push('math', (state, silent) => {
    if (state.src[state.pos] !== '$') {
      return false;
    }
    if (silent) {
      return true;
    }
    const nextChar = state.src.slice(state.pos + 1, state.pos + 2);
    const mark = nextChar === '$' ? '$$' : '$';
    for (let pos = state.pos + 1; pos < state.posMax; pos++) {
      if (state.src.slice(pos, pos + mark.length) === mark) {
        const content = state.src.slice(state.pos + 1, pos);
        const type = mark === '$$' ? 'math_block' : 'math_inline';
        const token = state.push(type, 'math', 0);
        token.markup = mark;
        token.content = content.trim();
        state.pos = pos + 1;
        return true;
      } else if (state.src[pos] === '\n') {
        return false;
      } else if (state.src[pos] === '\\') {
        pos++;
      }
    }
    return false;
  });

  md.renderer.rules.math_inline = (tokens, idx) => {
    return katex.renderToString(tokens[idx].content, {
      ...options,
      displayMode: false,
    });
  };

  md.renderer.rules.math_block = (tokens, idx) => {
    return `<p>${katex.renderToString(tokens[idx].content, {
      ...options,
      displayMode: true,
    })}</p>\n`;
  };
};

export default KatexIt;
