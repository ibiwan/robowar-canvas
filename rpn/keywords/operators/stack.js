
export const DROP = 'DROP';
export const DROPALL = 'DROPALL';
export const DUP = 'DUP';
export const SWAP = 'SWAP';

export const stack_operators = [
  DROP, // print
  DROPALL,
  DUP, // dup, duplicate
  SWAP,
  // roll (use top number as index to move second number down in stack)
  // vstore (idx, val), vrecall (idx)
];
