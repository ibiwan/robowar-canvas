const op1 = (stack, f) => stack.pushNumber(f(stack.popNumber()));
const op2 = (stack, f) => stack.pushNumber(f(stack.popNumber(),stack.popNumber()));

const add = (stack) => op2(stack, (a, b) => 
  a + b
);

const equal = (stack) => op2(stack, (a, b) => 
  a === b ? 1 : 0
);

const abs = (stack) => op1(stack, a => 
  Math.abs(a)
);

const negate = (stack) => op1(stack, a => 
  -a
);
