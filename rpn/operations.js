import { 
  ABS, CHS, DROP, NOT, OP_EQUALS, OP_GT, OP_LT, OP_MINUS, OP_PLUS 
} from './keywords/constants.js';

const opMn = (m, n, stack, f) => {
  const operands = [];
  for(let i = 0; i < m; i++){
    operands.push(stack.popAny);
  }
}

const drop = (stack) =>  stack.popAny()

const op1 = (stack, f) => stack.pushNumber(f(stack.popNumber()));

const abs = (stack) => op1(stack, a =>
  Math.abs(a)
);

const not = (stack) => op1(stack, a =>
  a == 0 ? 1 : 0
);

const negate = (stack) => op1(stack, a =>
  -a
);

const op2 = (stack, f) => stack.pushNumber(f(stack.popNumber(), stack.popNumber()));

const add = (stack) => op2(stack, (a, b) =>
  a + b
);

const sub = (stack) => op2(stack, (a, b) =>
  b - a
);

const equal = (stack) => op2(stack, (a, b) =>
  a === b ? 1 : 0
);

const gt = (stack) => op2(stack, (a, b) =>
  a > b ? 1 : 0
)

const lt = (stack) => op2(stack, (a, b) =>
  a < b ? 1 : 0
)

const and = () => {}
const max = () => {}
const min = () => {}
const mod = () => {}
const xor = () => {}
const div = () => {}
const times = () => {}

export const op_functions = {
  [DROP]: drop,
  [ABS]: abs,
  [CHS]: negate,
  [NOT]: not,
  [OP_PLUS]: add,
  [OP_MINUS]: sub,
  [OP_EQUALS]: equal,
  [OP_GT]: gt,
  [OP_LT]: lt,
}
