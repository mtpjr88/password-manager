var person = {
	name: 'Michael',
	age: 29
};
var personJSON = JSON.stringify(person);

console.log(personJSON);
console.log(typeof personJSON);

var personObj = JSON.parse(personJSON);
console.log(personObj.name);
console.log(typeof personObj);
