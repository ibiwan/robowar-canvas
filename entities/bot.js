import { compile } from '../rpn/compile.js';
import { X, Y, SPEEDX, ENERGY, SPEEDY, AIM } from '../rpn/keywords/constants.js';
import { getNewStack } from '../rpn/stack.js';

export const makeBot = (rawBot, id) => {
  const { color, cpuSpeed, maxEnergy } = rawBot;

  const compiledCode = compile(rawBot.rawCode);

  const state = {
    armor: 100,
    energy: maxEnergy,
  }

  const cpu = {
    index: 0,
    stack: getNewStack(), // RPN stack
    queue: [], // instructions to be executed by game engine
    registers: {
      [X]: 0,
      [Y]: 0,
      [SPEEDX]: 0,
      [SPEEDY]: 0,
      [AIM]: 0,
      [ENERGY]: maxEnergy,
    },
  }

  const notes = {}

  return {
    getCpu: () => cpu,
    getRegister: (r) => cpu.registers?.[r],
    getRegisters: () => cpu?.registers,
    setRegisters: (newValues) => Object.assign(cpu.registers, newValues),
    getSpecs: () => ({ color, cpuSpeed, maxEnergy }),
    getAst: () => compiledCode,
    getProgramIndex: () => cpu.index,
    setProgramIndex: (i) => cpu.index = i,
    getId: () => id,
    dumpStackTop: () => cpu.stack.dumpTop(),
    getNotes: () => notes,
    addNotes: (n) => Object.assign(notes, n)
  };
}
