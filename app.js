console.log('\n\n============================\n      PASSWORD MANAGER      \n============================\n');
const crypto = require('crypto-js');
const storage = require('node-persist').initSync();

const argv = require('yargs')
	.command('create', 'create a new account', (yargs) => {
		yargs.options({
			name: {
				demand: true,
				alias: 'n', 
				desciption: 'Account name (eg: Twitter, Facebook',
				type: 'string'
			},
			username:{
				demand: true,
				alias: 'u',
				description: 'Account username or email',
				type: 'string'
			},
			password: {
				demand: true,
				alias: 'p',
				description: 'Account password',
				type: 'string'
			},
			masterPassword:{
				demand:true,
				alias: 'm',
				description: 'Master password',
				type: 'string'
			}
		}).help('help');
	})
	.command('get', 'Get an existing account', (yargs) => {
		yargs.options({
			name: {
				demand: true,
				alias: 'n',
				desciption: 'Account name (eg: Twitter, Facebook)',
				type: 'string'
			},
			masterPassword: {
				demand: true,
				alias: 'm',
				description: 'Master password',
				type: 'string'
			}
		}).help('help');
	})
	.help('help')	
  .argv;

const command = argv._[0];

function decryptAccounts(masterPassword) {
	// use getItemSync to fetch accounts
  const encryptedAccount = storage.getItemSync('accounts');
	let accounts = [];

	// decrypt
	if (typeof encryptedAccount !== 'undefined') {
    const bytes = crypto.AES.decrypt(encryptedAccount, masterPassword);
    accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));
  }
	// return accounts array
	return accounts;
}

function saveAccounts (accounts, masterPassword) {
	// encrypt accounts
	const encryptedAccounts = crypto.AES.encrypt(JSON.stringify(accounts), masterPassword);
	// setItemSync
	storage.setItemSync('accounts', encryptedAccounts.toString());
	// return accounts
	return accounts;
}

function createAccount(account, masterPassword) {
  const accounts = getAccounts(masterPassword);

	accounts.push(account);

	saveAccounts(accounts, masterPassword)

	return account;
}

function getAccounts(accountName, masterPassword) {
  const accounts = decryptAccounts(masterPassword);

  const matchedAccount = accounts.filter(account => account.name === accountName);

	return matchedAccount;
}

if (command === 'create') {
	try {
    const createdAccount = createAccount({
        name: argv.name,
        username: argv.username,
        password: argv.password
      }, argv.masterPassword);
      console.log('Account created!\n');
  } catch (e){
    console.log('Unable to create account!\n');
  }
} else if (command === 'get') {
  try {
    const fetchedAccounts = getAccounts(argv.name, argv.masterPassword);

    if (typeof fetchedAccounts === 'undefined' || !fetchedAccounts.length) {
      console.log('Account not found!\n');
    } else {
      let message = '1 Account Found!\n';
      if (fetchedAccounts.length > 1) message = `${fetchedAccounts.length} Accounts found!\n`;
      console.log(message);
      fetchedAccounts.map(fetchedAccount => console.log(`Name: ${fetchedAccount.name}\nUsername: ${fetchedAccount.username}\nPassword: ${fetchedAccount.password}\n`));
    }
  } catch(e){
    console.log('Unable to fetch account!\n');
  }

}
