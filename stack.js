const getNewStack = () => {
  const internal = Symbol();
  
  const NUMBER_T = 'number';
  const OPERAND_NAME = 'operand_name';

  const newStack = [];

  newStack.push = function(id, val){
    if(id !== internal){
      throw new Error("don't call stack.push directly; use pushNumber or pushTarge");
    }
    return Array.prototype.push.call(this, val);
  }

  newStack.pushNumber = function(val){
    if(!Number.isInteger(val)){
      throw new Error('attempted to push value as number: ' + val);
    }
    this.push(internal, {
      type: NUMBER_T,
      value: val,
    })
  }

  newStack.pushTarget = function(val){
    if(!val in w_operand_names){
      throw new Error('attempted to push value as target operand: ' + val);
    }
    this.push(internal, {
      type: OPERAND_NAME,
      value: val
    })
  }
  
  newStack.pop = function(id){
    if(id !== internal){
      throw new Error("don't call stack.pop directly; use popNumber or popTarget");
    }
    return Array.prototype.pop.call(this);
  }

  newStack.assertHas = function(){
    if(this.length === 0){
      throw new Error('stack underflow');
    }
  }

  newStack.popNumber = function () {
    this.assertHas();
    const value = this.pop(internal);
    if(value.type !== NUMBER_T){
      throw new Error('tried to write a non-number to an operand: ' + value.value);
    }
    return value.value;
  }

  newStack.popTarget = function(){
    this.assertHas();
    const target = this.pop(internal);
    if(target.type !== OPERAND_NAME){
      throw new Error('tried to store to a non-operand: ' + target.value);
    }
    
    return target.value;
  }

  return newStack;
}