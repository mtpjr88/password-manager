var argv = require('yargs')
	.command('hello', 'Greets the user', (yargs) => {
		yargs.options({
			name: {
				demand: true,
				alias: 'n', // alias is shortcut
				description: 'Your first name goes here',
				type: 'string'
		  },
      lastname: {
        demand: true,
        alias: 'l', // alias is  shortcut
        description: 'Your lastname goes here',
        type: 'string'
      }.help('help')
    })
})
.help('help')	
.argv;
var command = argv._[0];

console.log(argv);

if(command === 'hello' && typeof argv.name !== 'undefined' && typeof argv.lastname !== 'undefined') {
	console.log('Hello ' + argv.name + ' ' + argv.lastname + '!');
} else if (command === 'hello' && typeof argv.name !== 'undefined') {
	console.log('Hello ' + argv.name + '!'); 
} else if (command === 'hello ') {
	consol.log('Hello World!');
}