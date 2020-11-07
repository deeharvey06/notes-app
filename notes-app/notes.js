const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => 'some string';

const addNote = (title, body) => {
  const notes = _loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({ tile, body });
    _saveNote(notes);
    console.log(chalk.green.inverse('New note added'));
  } else {
    console.log(chalk.red.inverse('Note title taken!'));
  }
}

const removeNote = title => {
  const notes = _loadNotes();
  const notesToKeep = notes.filter(note => note.title !== title);

  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse('Note removed'));
    _saveNote(notesToKeep);
  } else {
    console.log(chalk.red.inverse('No note find'));
  }
}

const listNotes = () => {
  const notes = _loadNotes();
  console.log(chalk.inverse('Your notes'));

  notes.forEach(note => console.log(note.title));

}

const readNotes = title => {
  const notes = _loadNotes();
  const note = notes.find(note => note.title === title);

  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red.inverse('Note not found'));
  }
}

const _saveNote = notes => {
  const notesJson = JSON.stringify(notes);
  fs.writeFileSync('notes.json', notesJson);
}

const _loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (err) {
    return [];
  }
}

module.exports = {
  getNotes,
  addNote,
  removeNote,
  listNotes,
  readNotes
};