import Note from './Note'

const data = {
  notes: [],
  noteColors: ['#ccffff', '#ddffcc', '#eecccc', '#ffffcc', '#aaffcc'],
  isEdited: false
}

function addNote(newNote) {
  data.notes.push(newNote);
}

function removeNote(id) {
  data.notes.forEach((note) => {
    if (note.id === id) {
      const noteIndex = data.notes.indexOf(note)
      data.notes.splice(noteIndex, 1);
    }
  })
}

function doneNote(id) {
  data.notes.forEach((note) => {
    if (note.id === id) {
      note.done = !note.done;
    }
  })
}

function editNote(newNote) {
  data.notes.forEach((note) => {
    if (note.id === newNote.id) {
      note.text = newNote.text;
    }
  })
}

const store = {
  addNote,
  removeNote,
  doneNote,
  editNote,
  data
}

export default store;
