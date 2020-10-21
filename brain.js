const operators = ['ABS', 'AND', 'CALL', 'CHS'/*unary negation*/, 'DIST', 
  'DROP', 'DROPALL', 'DUP', 'IF', 'IFE', 'IFG', 'JUMP', 'MAX', 'MIN', 'MOD', 
  'NOP', 'NOT', 'OR', 'RETURN', 'STO', 'STORE', 'SWAP', 'SYNC', 'XOR', 
  '+', '-'/*subtract*/, '*', '/', '=', '!' /*not equal*/, '>', '<'
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
console.log({keywords})

const r_operands = [...ro_operands, ...rw_operands];
const w_operand_names = [...rw_operands, ...wo_operands].map(s=>s+"'")

console.log({w_operand_names})

const getNewStack = () => {
  const internal = Symbol();
  
  const NUMBER_T = 'number';
  const OPERAND_NAME = 'operand_name';

  const newStack = [];

  newStack.push = function(id, val){
    if(id !== internal){
      throw new Error('don\'t call stack.push directly; use pushNumber or pushTarget');
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
      throw new Error('don\'t call stack.pop directly; use popNumber or popTarget');
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

        if (src.endsWith(":")) {
          const label = src.slice(0, -1);
          if(keywords.includes(label)){
            throw new Error("INVALID LABEL:", label)
          }
          labels[label] = symbols.length; // idx
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
    stack: getNewStack(), // RPN stack
    queue: [], // instructions to be executed by game engine
  };
};

const isIntStr = str => !!str.match(/-?\d+/)

const execChronon = (bot, environs) => {
  const {
    compiledCode: {
      symbols: program, 
      labels,
    },
    cpu, 
    stack, 
    queue,
  } = bot;

  let instrsExecuted = 0;
  const commands = [];

  while(instrsExecuted < cpu){
    const {src: currInstr} = program[bot.index];
    
    // console.log({index: bot.index, currInstr})
    let incrementIndex = true;

    switch(true){
      case !currInstr:
        throw new Error('invalid instruction index: ' + currInstr)
        break;
      case currInstr in labels:
        const labelIndex = labels[currInstr];
        stack.pushNumber(labelIndex);
        break;
      case isIntStr(currInstr):
        stack.pushNumber(parseInt(currInstr))
        break;
      case operators.includes(currInstr):
        switch(currInstr){
          case '+':
            stack.pushNumber(stack.popNumber() + stack.popNumber())
            break;
          case '=':
            stack.pushNumber(stack.popNumber() === stack.popNumber() ? 1 : 0)
            break;
          case 'IFG': // 'IF' leaves a return address
            {
              const newIndex = stack.popNumber();
              const predicate = stack.popNumber();
              
              if(predicate !== 0){
                bot.index = newIndex;
                incrementIndex = false;
              }
            }
            break;
          case 'JUMP': // 'CALL' leaves a return address
            const newIndex = stack.popNumber();
            bot.index = newIndex;
            incrementIndex = false;
            break;
          case 'STO':
          case 'STORE':
            const target = stack.popTarget();
            const value = stack.popNumber();
            switch(target){
              case "SPEEDX'":
                bot.speedx = value;
                break;
              default:
                throw new Error('don\'t know how to assign to operand: ' + target);
            }
            break;
          default:
            throw new Error('don\'t have implementation for operator: ' + currInstr);
        }
        break;
      case w_operand_names.includes(currInstr):
        stack.pushTarget(currInstr);
        break;
      case r_operands.includes(currInstr):
        switch(currInstr){
          case 'X':
            stack.pushNumber(bot.x);
            break;
          default:
            throw new Error('don\'t know how to read from operand: ' + currInstr);
        }
        break;
      case currInstr === 'STO' || currInstr === 'STORE':
      default:
        throw new Error('unhandled situation! ' + currInstr)
        break;
    }

    if(incrementIndex){
      bot.index += 1;
    }
    instrsExecuted += 1;
    
    // console.log({stack: JSON.stringify(stack.map(v=>v.value))})
  }
};
