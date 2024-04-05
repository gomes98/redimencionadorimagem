const readlineInterface = require('node:readline');

exports.question = (question) => {
  const readline = readlineInterface.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve, reject) => {
    readline.question(question, (value) =>{
      resolve(value);
      readline.close();
    });
  });
}