const chalk = require('chalk');

module.exports = ({getState}) => {
    return (next) => (action) => {
        console.log(`${chalk.red.bold('dispatching')} ${JSON.stringify(action)}`);
        console.log(`\t${chalk.blue.bold('prev state')} ${JSON.stringify(getState())}`);
        let returnValue = next(action);
        console.log(`\t${chalk.green.bold('next state')} ${JSON.stringify(getState())}`);
        return returnValue;
    };
};