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

console.log('Challenge Area');

var animal = '{"name": "Maggie"}';
// convert to js object
var animalObj = JSON.parse(animal);

// add age property
animalObj.age = 7;

// convert back to JSON
var animalJSON = JSON.stringify(animalObj);
console.log(animalJSON);

//