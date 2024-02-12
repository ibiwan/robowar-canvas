import { keywords } from './keywords/constants.js';

export const compile = (rawCode) => {
  const compiledCode = rawCode
    // split by lines
    .split(new RegExp("[\n\r]"))

    // add line numbers for later debugging
    .map((src, lineNo) => ({ src, lineNo }))

    // remove comments
    .map(({ src, ...rest }) => ({
      ...rest,
      src: src.replace(new RegExp("#.*$"), ""),
    }))

    // split on other whitespace
    .reduce(
      (acc, { src, ...rest }) =>
        acc.concat(
          src.split(new RegExp("[ \t]")).map((line) => {
            return {
              ...rest,
              src: line,
            };
          })
        ),
      [] // reduce init
    )

    // remove empties
    .filter(({ src }) => src)

    // uppercase all symbols/labels
    .map(({ src, ...rest }) => ({
      ...rest,
      src: src.toUpperCase(),
    }))

    // split up symbols and labels, tracks instruction indexes
    .reduce(
      ({ symbols, labels }, cur, idx) => {
        const { src } = cur;

        if (src.endsWith(":")) {
          const label = src.slice(0, -1);
          if (keywords.includes(label)) {
            throw new Error("INVALID LABEL:", label)
          }
          labels[label] = symbols.length; // idx
        } else {
          symbols.push(cur);
        }

        return { symbols, labels };
      },

      // reduce init
      {
        symbols: [],
        labels: {},
      }
    );

  return compiledCode;
};
