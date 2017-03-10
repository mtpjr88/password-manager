var crypto = require('crypto-js');

var secretMessage = {
	name: 'Michael',
	secretName: '007'
};
var secretKey = '123abc';

// Encrypt
/*
var encryptedMessage = crypto.AES.encrypt(secretMessage, secretKey);
console.log('Encrypted Message: ' + encryptedMessage);


// Decrypt Message

var bytes = crypto.AES.decrypt(encryptedMessage, secretKey);

var decryptedMessage = bytes.toString(crypto.enc.Utf8);

console.log('Decrypted Message: ' + decryptedMessage);

*/


	// converting my object to string
var jSonSecretMessage = JSON.stringify(secretMessage); 

	// encryting the string and logging it to the console
var encryptMessage = crypto.AES.encrypt(jSonSecretMessage, secretKey);
console.log('Secret Message object to string is: ' + encryptMessage);

console.log('Now Decrypting...');

	// Decrypting it back to an object
var bytes = crypto.AES.decrypt(encryptMessage, secretKey);

var decryptMess = bytes.toString(crypto.enc.Utf8);

var decryptMessageObj = JSON.parse(decryptMess);
console.log('From string back to Object: ' + decryptMessageObj);

console.log(secretMessage.secretName);