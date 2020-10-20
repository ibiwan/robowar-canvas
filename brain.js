const compile = (bot) => {
  const { rawCode } = bot;

  Array.prototype.tap = function (f) {
    f(this);
    return this;
  };

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
        const isLabel = src.startsWith(":");

        if (isLabel) {
          labels[src.slice(1)] = symbols.length; // idx
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

  return {
    ...bot,
    compiledCode,
    index: 0, // current instruction
    stack: [], // RPN stack
    queue: [], // instructions to be executed by game engine
  };
};

const execChronon = (bot, environs) => {
  const commands = [];
};
