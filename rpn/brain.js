import {
  operators, w_operand_names, r_operands,
  ABS, DROP, CHS, NOT, OP_PLUS, OP_MINUS, OP_EQUALS, OP_GT, OP_LT, IFG,
  JUMP, STO, STORE, w_references,
} from './keywords/constants.js';
import { readFrom } from './read_operands.js';
import { op_functions } from './operations.js';
import { aro_operands } from './keywords/registers/actual_readonly.js';
import { arw_operands } from './keywords/registers/actual_readwrite.js';
import { vro_operands } from './keywords/registers/virtual_readonly.js';
import { vrw_operands } from './keywords/registers/virtual_readwrite.js';
import { vwo_operands } from './keywords/registers/virtual_writeonly.js';

const isValidInstruction = (ins) => ins !== undefined && ins !== null;
const isNumericLiteral = (ins) => !!str.match(/-?\d+/);

const handleNumericLiteral = (stack, instr) => {
  stack.pushNumber(parseInt(instr));
};
const handleJumpLabel = (stack, instr) => {
  const labelIndex = labels[instr];
  stack.pushNumber(labelIndex);
};
const handleOperator = (stack, instr) => {
  const operation = op_functions[instr];
  operation(stack);
};

const setDispatch = [
  { set: labels, handler: handleJumpLabel },
  { set: op_functions, handler: handleOperator },
  { set: aro_operands, handler: () => { } },
  { set: arw_operands, handler: () => { } },
  // { set: awo_operands, handler: () => { } },
  { set: vro_operands, handler: () => { } },
  { set: vrw_operands, handler: () => { } },
  { set: vwo_operands, handler: () => { } },
];

export const execChronon = (bot, environs) => {
  const { symbols: program, labels } = bot.getAst();
  const { cpuSpeed } = bot.getSpecs();
  const { stack, registers, queue } = bot.getCpu();

  let instrsExecuted = 0;
  const commands = [];

  while (instrsExecuted < cpuSpeed) {
    const { index } = bot.getCpu();
    const { src: currInstr } = program[index];

    let incrementIndex = true;
    let handled = false;

    if (!isValidInstruction) { throw new Error('invalid instruction index: ' + currInstr) }

    if (isNumericLiteral(currInstr)) { handleNumericLiteral(currInstr) }

    setDispatch.some(({ set, handler }) => {
      if (currInstr in set) {
        handler(currInstr);
        return true; // break from Array#some
      }
      // return false;
    });

    switch (true) {

      case operators.includes(currInstr):
        switch (currInstr) {
          case DROP: stack.popAny(); break;
          case IFG: // 'IF' leaves a return address
            {
              const newIndex = stack.popNumber();
              const predicate = stack.popNumber();

              if (predicate !== 0) {
                bot.setProgramIndex(newIndex);
                incrementIndex = false;
              }
            }
            break;
          case JUMP: // 'CALL' leaves a return address
            const newIndex = stack.popNumber();
            bot.setProgramIndex(newIndex);
            incrementIndex = false;
            break;
          case STO:
          case STORE:
            const target = stack.popTarget();
            const value = stack.popNumber();
            if (!(target in w_references)) {
              throw new Error("don't know how to assign to operand: " + target);
            }
            bot.setRegisters({ [w_references[target]]: value })
            break;
          default:
            throw new Error("don't have implementation for operator: " + currInstr);
        }
        break;
      case w_operand_names.includes(currInstr):
        stack.pushTarget(currInstr);
        break;
      case r_operands.includes(currInstr):
        // console.log("read from", currInstr)
        readFrom(currInstr, stack, bot);
        break;
      default:
        throw new Error('unhandled situation! ' + currInstr)
        break;
    }

    if (incrementIndex) {
      let newIndex = index + 1
      bot.setProgramIndex(index + 1);
    }
    instrsExecuted += 1;

    // bot.dumpStackTop();

    // console.log({stack: JSON.stringify(stack.map(v=>v.value))})
  }
};
