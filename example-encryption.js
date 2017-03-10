var crypto = require('crypto-js');

var secretMessage = {  // object must convert to string 
	name: 'Michael',
	secretName: '007'
};

var secretMessageObj = JSON.stringify(secretMessage); // now a string

var secretKey = '1234';

// Encrypt | to Hide

var encryptedMessage = crypto.AES.encrypt(secretMessageObj, secretKey); // only takes a string
console.log('Encrypted Message: ' + encryptedMessage);
console.log("It is now a: " + typeof encryptedMessage);


// Decrypt Message | to reveal



var bytes = crypto.AES.decrypt(encryptedMessage, secretKey); 
var decryptedMessage = bytes.toString(crypto.enc.Utf8);
console.log('Decrypted Message: ' + decryptedMessage);
console.log("It is now a: " + typeof decryptedMessage);

var backToObj = JSON.parse(decryptedMessage); // converting back to an object
console.log('Now converting back to object... ');
console.log("It is now an: " + " ' " + typeof backToObj + " ' " + " Once again!");
console.log(secretMessage.name);