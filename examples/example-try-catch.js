function doWork() {
	throw new Error('Unable to do work!');
}

try {
	doWork();
	throw new Error('Unable to decrypt accounts!');
} catch (e) {
	console.log(e.message);
} finally {
	console.log('finally block executed!');
}
console.log('try catch ended!');