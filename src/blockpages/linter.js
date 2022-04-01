let fs = require('fs');
const csv = require('csv-parser');
let writeStream = fs.createWriteStream(
	'PATH/ChadWatch/src/blockpages/citationsImportées.csv'
);
let CSVaParser = 'PATH/ChadWatch/src/blockpages/CSVaImporter.csv';
let array = [
	['Jordan Peterson', "The masculine spirit is under assault. It's obvious."],
	[
		'Jordan Peterson',
		'Once someone has spent enough time cultivating bad habits and biding their time, they are much diminished. Much of what they could have been has dissipated.',
	],
	[
		'Jordan Peterson',
		'Can you imagine yourself in 10 years if, instead of avoiding the things you know you should do, you actually did them every single day?',
	],
];


function CSVToArray(array) {
    let arrayParse = [];
	fs.createReadStream(array)
		.pipe(csv({ separator: ';' }))
		.on('data', function (data) {
			try {
				arrayParse.push([data.Author, data.Quote]);
			} catch (err) {
				console.log(err);
			}
		})
		.on('end', function () {
			console.log(arrayParse);
		});
}

function ArrayToCSV(array) {
	array.forEach((subArray) => {
		let newLine = [];
		let author = subArray[0];
		let quote = subArray[1];
		newLine.push(author + ',' + '"' + quote + '"');
		writeStream.write(newLine.join(',') + '\n', () => {});
	});
	writeStream.end();
	writeStream
		.on('finish', () => {
			console.log('finish write stream, moving along');
		})
		.on('error', (err) => {
			console.log(err);
		});
}
