import { type Result, err, ok } from '@yyhhenry/rust-result';
export function escapeStr(s: string): Result<string, Error> {
  const chars = [...s];
  let pos = 0;
  const next = () => chars.at(pos++);
  const results = [];
  while (pos < chars.length) {
    const c = next();
    if (c === '\\') {
      const c2 = next();
      if (c2 === 'n') {
        results.push('\n');
      } else if (c2 === 'r') {
        results.push('\r');
      } else if (c2 === 't') {
        results.push('\t');
      } else if (c2 === '\\') {
        results.push('\\');
      } else {
        const c2Str = c2 === undefined ? '<EOF>' : c2;
        return err(new Error(`Invalid escape sequence: \\${c2Str}`));
      }
    } else {
      results.push(c);
    }
  }
  return ok(results.join(''));
}
