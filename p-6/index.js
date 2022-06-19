const fs = require('fs');

const note_path = './notes.json'

let Book = class {
    constructor(name_book, author) {
        this.name_book = name_book;
        this.author = author;
    }
};

//Initialize the notes.json
try {
    if(!fs.existsSync(note_path)) {
        fs.writeFileSync(note_path, '[]')
    }
}
catch (err) {
    console.log(err);
}

//Function to read from console
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});
const question = (str) => new Promise(resolve => readline.question(str, data => {
    resolve(data);
}));

opt = menu();

async function menu () {
    let books = [];
    let opt = 0;
    while (opt != 4) {
        console.log('1. Load Book'); 
        console.log('2. Save Book'); 
        console.log('3. Add Book');
        console.log('4. Exit');
        opt = parseInt(await question('Select an option: '));
        switch (opt) {
            case 1:
                console.log('\033[2J');
                console.log(JSON.parse(fs.readFileSync(note_path, 'utf8')));
                await question('Press any key to continue...')
                console.log('\033[2J');
                break;
            case 2:
                console.log('\033[2J');
                let name_book = await question("Name book: ")
                let author = await question("Author: ")
                books.push(new Book(name_book, author))
                await question('Press any key to continue...')
                console.log('\033[2J');
                break;
            case 3:
                console.log('\033[2J');
                for(b in books) {
                    let book = books[b];
                    console.log(`${parseInt(b)+1}.- Name: ${book.name_book}; Author: ${book.author}`);
                }
                let notes = JSON.parse(fs.readFileSync(note_path, 'utf8'));
                let index = parseInt(await question('Select book to save: '))-1;
                notes.push(books[index]);
                books.pop(index);
                fs.writeFileSync(note_path, JSON.stringify(notes))
                await question('Press any key to continue...')
                console.log('\033[2J');
                break;
        }
    }
    readline.close();
}
