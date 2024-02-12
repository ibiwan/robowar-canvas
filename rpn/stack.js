import { w_operand_refs } from './keywords/constants.js';

export const getNewStack = () => {
  const NUMBER_T = 'number';
  const OPERAND_NAME = 'operand_name';

  const stackData = [];

  const pushNumber = val => {
    if (!Number.isInteger(val)) {
      throw new Error('attempted to push value as number: ' + val);
    }
    stackData.push({
      type: NUMBER_T,
      value: val,
    })
  }

  const pushRegisterRef = (val) => {
    if (!val in w_operand_refs) {
      throw new Error('attempted to push value as target operand: ' + val);
    }
    stackData.push(internal, {
      type: OPERAND_NAME,
      value: val
    })
  }

  const assertHas = function () {
    if (stackData.length === 0) {
      throw new Error('stack underflow');
    }
  }

  const popNumber = function () {
    assertHas();
    const value = stackData.pop(internal);
    if (value.type !== NUMBER_T) {
      throw new Error('tried to write a non-number to an operand: ' + value.value);
    }
    return value.value;
  }

  const popRegisterRef = function () {
    this.assertHas();
    const target = stackData.pop(internal);
    if (target.type !== OPERAND_NAME) {
      throw new Error('tried to store to a non-operand: ' + target.value);
    }

    return target.value;
  }

  const dumpTop = function () {
    console.log(stackData.slice( -3))
  }

  return {
    pushNumber, pushRegisterRef, 
    popNumber, popRegisterRef,
    dumpTop,
  };
}
