const fs = require('fs');

const note_path = './notes.json'

let Note = class {
    constructor(title, author, description) {
        this.title = title;
        this.author = author;
        this.description = description;
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

menu();

async function menu () {
    let opt = 0;
    while (opt != 6) {
        let notes = JSON.parse(fs.readFileSync(note_path, 'utf8'));
        console.log('1. Load Note'); 
        console.log('2. Edit Note'); 
        console.log('3. Save Note');
        console.log('4. View Note');
        console.log('5. Delete Note');
        console.log('6. Exit');
        opt = parseInt(await question('Select an option: '));
        switch (opt) {
            case 1:
                console.log('\033[2J');
                console.log('Load 📓 \n')
                console.log(notes);
                await question('Press any key to continue...')
                console.log('\033[2J');
                break;
            case 2:
                console.log('\033[2J');
                console.log('Edit 📓 \n')
                for(n in notes) {
                    let note = notes[n];
                    console.log(`${parseInt(n)+1}._ ${note.title}`);
                }
                let index = parseInt(await question('Select note to edit: '))-1;
                let new_title = await question("Title: ");
                let new_author = await question("Author: ");
                let new_description = await question("Description: ");
                notes[index] = new Note(new_title, new_author, new_description);
                fs.writeFileSync(note_path, JSON.stringify(notes))
                await question('Press any key to continue...')
                console.log('\033[2J');
                break;
            case 3:
                console.log('\033[2J');
                console.log('Save 📓 \n')
                let title = await question("Title: ");
                let author = await question("Author: ");
                let description = await question("Description: ");
                notes.push(new Note(title, author, description));
                fs.writeFileSync(note_path, JSON.stringify(notes))
                await question('Press any key to continue...')
                console.log('\033[2J');
                break;
            case 4:
                console.log('\033[2J');
                console.log('View 📓 \n')
                for(n in notes) {
                    let note = notes[n];
                    console.log(`${parseInt(n)+1}._ ${note.title}`);
                }
                let i = parseInt(await question('Select one note : '))-1;
                let note = notes[i];
                console.log(`\n${note.title}\n`)
                console.log(`${note.description}\n`)
                await question('Press any key to continue...')
                console.log('\033[2J');
                break;
            case 5:
                console.log('\033[2J');
                console.log('Delete 📓 \n')
                for(n in notes) {
                    let note = notes[n];
                    console.log(`${parseInt(n)+1}. ${note.title}`);
                }
                let inp = parseInt(await question('Select note to delete: '))-1;
                notes.splice(inp, 1);
                fs.writeFileSync(note_path, JSON.stringify(notes))
                await question('Press any key to continue...')
                console.log('\033[2J');
                break;
        }
    }
    readline.close();
}
