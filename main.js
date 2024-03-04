"use strict";

const testlib = require( './testlib.js' );

let table = {
};
let maxLength = 0;
let stringArray = [];
let count = -1;

const possibleNucleotide = {

    'A': ['A'],
    'C': ['C'],
    'G': ['G'],
    'T': ['T'],
    'R': ['R', 'A', 'G'],
    'Y': ['Y', 'C', 'T'],
    'K': ['K', 'G', 'T'],
    'M': ['M', 'A', 'C'],
    'S': ['S', 'G', 'C'],
    'W': ['W', 'A', 'T'],
    'B': ['B', 'G', 'T', 'C'],
    'D': ['D', 'G', 'A', 'T'],
    'H': ['H', 'A', 'C', 'T'],
    'V': ['V', 'G', 'C', 'A'],
    'N': ['N', 'A', 'C', 'G', 'T']
};

testlib.on( 'ready', function( patterns ) {

	console.log( "Patterns:", patterns );

	patterns.forEach(pattern => {

		table[pattern] = 0;

		//get max pattern length
		if (pattern.length > maxLength){
			maxLength = pattern.length;
		}
	});

	testlib.runTests();
} );

testlib.on( 'data', function( data ) {

	count++;

	// add data into list 
	stringArray.push(data);

	// remove first element
	if (stringArray.length > maxLength){

		stringArray.shift();
	}
	
	// loop through keys in table to find match
	let keys = Object.keys(table);
	keys.forEach(key => {

		if (checkMatching(stringArray,key)){
			
			table[key]++
			testlib.foundMatch( key, (count - key.length + 1));
		}
	} );
} );

testlib.on ( 'reset', function(){

	testlib.frequencyTable(table);
	console.log("Reset");
	stringArray = [];
	count = -1;
	Object.keys(table).forEach(function(key) {
		table[key] = 0;
	  });
} );

testlib.on ( 'end', function(){

	testlib.frequencyTable(table);	
} );

testlib.setup( 1 ); // Runs test 1 (task1.data and task1.seq)


//function to check if the sequence match with data
function checkMatching( string, pattern ){

	//check if string is longer than the pattern
	const patternLength = pattern.length;
	if (string.length < patternLength){
		return false;
	}

	// remove front of string if longer than length of pattern
	const stringEnd = string.slice(-patternLength);
	//console.log(string + " " + stringEnd + " " + pattern + " " + count );
	//convert patern to array and iterate each character
	return stringEnd.every((nucleotide, index) =>
		
		possibleNucleotide[pattern[index]].includes(nucleotide)
		
	) ;
}
