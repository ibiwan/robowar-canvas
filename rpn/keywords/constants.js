import { binary_numeric_operators } from './operators/binary_numeric.js';
import { unary_numeric_operators } from './operators/unary_numeric.js';
import { flowcontrol_operators } from './operators/flow_control.js';
import { register_operators } from './operators/register.js';
import { stack_operators } from './operators/stack.js';

import { rw_virtual_refs, vrw_operands } from './registers/virtual_readwrite.js';
import { vwo_operands, wo_virtual_refs } from './registers/virtual_writeonly.js';
import { arw_operands, rw_actual_refs } from './registers/actual_readwrite.js';
import { vro_operands } from './registers/virtual_readonly.js';
import { aro_operands } from './registers/actual_readonly.js';

export const operators = [
  ...binary_numeric_operators,
  ...flowcontrol_operators,
  ...register_operators,
  ...stack_operators,
  ...unary_numeric_operators,
];

export const operands = [
  ...aro_operands,
  ...arw_operands,
  // ...awo_operands,
  ...vro_operands,
  ...vrw_operands,
  ...vwo_operands,
];

export const keywords = [
  ...operators,
  ...operands,
];

export const w_operand_refs = [
  ...rw_actual_refs,
  ...rw_virtual_refs,
  ...wo_virtual_refs,
]
