const unary_numeric_operators = [
  'ABS', 'CHS'/*negation*/, 'NOT'
];
const binary_numeric_operators = [
  'AND', 'MAX', 'MIN', 'MOD', 'OR', 'XOR', 'DIST', '+', 
  '-'/*subtract*/, '*', '/', '=', '!' /*not equal*/, '>', '<'
];
const stack_operators = [
  'DROP', 'DROPALL', 'DUP', 'SWAP',
];
const flowcontrol_operators = [
  'CALL', 'IF', 'IFE', 'IFG', 'JUMP', 'NOP', 'RETURN', 'SYNC'
];
const register_operators = [
  'STO', 'STORE'
];

const operators = [
  ...unary_numeric_operators,
  ...binary_numeric_operators,
  ...stack_operators,
  ...flowcontrol_operators,
  ...register_operators,
];


const ro_operands = [
  'CHRONON', 'ID', 'RADAR', 'RANGE', 'DOPPLER', 'RANDOM', 'WALL',
];

const rw_operands = [
  'AIM', 'SHIELD', 'SPEEDX', 'SPEEDY',
];

const wo_operands = [
  'BULLET', 'MOVEX', 'MOVEY', 
];

const ACODE = 'A'.charCodeAt(0);
for(let i = 0; i < 26; i++){
  rw_operands.push(String.fromCharCode(ACODE+i))
}

const keywords = [
  ...operators, 
  ...ro_operands,
  ...rw_operands,
  ...wo_operands,
]
// console.log({keywords})

const r_operands = [...ro_operands, ...rw_operands];
const w_operand_names = [...rw_operands, ...wo_operands].map(s=>s+"'")

// console.log({w_operand_names})