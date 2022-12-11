function evaluateTicTacToePosition(position) {
  let result = undefined;
  for (let i = 0; i < position.length; i++) {
    if (position[i][0] === position[i][1] && position[i][0] === position[i][2]) {
      result = position[i][0];
      break;
    }
    if (position[0][i] === position[1][i] && position[0][i] === position[2][i]) {
      result = position[0][i];
      break;
    }
  }

  if (position[0][0] != undefined && result === undefined) {
    if (position[0][0] === position[1][1] && position[0][0] === position[2][2]) {
      result = position[0][0];
    }
  }
  return result;
}

console.log(evaluateTicTacToePosition([[ 'X',   ,'0' ], [    ,'X','0' ], [    ,   ,'X' ]]));
console.log(evaluateTicTacToePosition([[ '0','0','0' ], [    ,'X',    ], [ 'X',   ,'X' ]]));

console.log(evaluateTicTacToePosition([[ '0','X','0' ], [    ,'X',    ], [ 'X','0','X' ]]));