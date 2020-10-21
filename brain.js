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
      case currInstr in labels:
        const labelIndex = labels[currInstr];
        stack.pushNumber(labelIndex);
        break;
      case isIntStr(currInstr):
        stack.pushNumber(parseInt(currInstr))
        break;
      case operators.includes(currInstr):
        switch(currInstr){
          case 'ABS': abs(stack); break;
          case 'CHS': negate(stack); break;
          case '+': add(stack); break;
          case '=': equal(stack); break;
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
              case "SPEEDY'":
                bot.speedy = value;
                  break;
              default:
                throw new Error("don't know how to assign to operand: " + target);
            }
            break;
          default:
            throw new Error("don't have implementation for operator: " + currInstr);
        }
        break;
      case w_operand_names.includes(currInstr):
        stack.pushTarget(currInstr);
        break;
      case r_operands.includes(currInstr):
        readFrom(currInstr, stack, bot);
        break;
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
