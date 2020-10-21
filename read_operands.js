readFrom = (register, stack, bot) => {
  switch(register){
    case 'X':
      stack.pushNumber(bot.x);
      break;
    case 'Y':
      stack.pushNumber(bot.y);
      break;
    case 'SPEEDX':
      stack.pushNumber(bot.speedx);
      break;
    case 'SPEEDY':
      stack.pushNumber(bot.speedy);
      break;
    default:
      throw new Error("don't know how to read from operand: " + currInstr);
  }
}
