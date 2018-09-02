import UI from './ui'
import Store from './store'
import Note from './Note'
import Storage from './storage'

function _clearInput() {
  UI.selectors.newNoteInput.value = '';
  UI.selectors.inputLength.innerText = '0/60';
}

function _getDate() {
  const date = new Date;
  const options = { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}
  const formatedDate = date.toLocaleDateString('pl-PL', options);
  return formatedDate;
}

function _randomId() {
    const chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let id = '';
    for (let i = 0; i < 10; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
}

function _randomNumberFromRange(to, from) {
  const number = Math.floor((Math.random() * (to - from)) + from);
  return number;
}

function _randomColor() {
  const colorArray = Store.data.noteColors;
  const color = colorArray[Math.floor(Math.random() * colorArray.length)];
  return color;
}

function newNoteLength() {
  const length = this.value.length;
  UI.selectors.inputLength.innerText = length + '/60';
}

function updateNewNoteText() {
  const inputValue = this.value;
  const newNoteText = UI.selectors.newNoteText;
  newNoteText.innerText = inputValue;
}

function addNewNote() {
  const top = UI.selectors.notesTable.clientHeight - 250;
  const left = UI.selectors.notesTable.clientWidth - 200;
  const text = UI.selectors.newNoteInput.value;
  if (text.trim() !== '') {
    let note = {};
    note.text = text;
    note.color = _randomColor();
    note.id = _randomId();
    note.date = _getDate();
    note.pinX = _randomNumberFromRange(5, 160);
    note.pinY = _randomNumberFromRange(2, 14);
    note.top = _randomNumberFromRange(0, top);
    note.left = _randomNumberFromRange(0, left);
    note.rotate = _randomNumberFromRange(-10, 10);
    note.rotateHover = _randomNumberFromRange(-10, 10);
    const newNote = new Note(note);
    Storage.storeItem(newNote);
    UI.selectors.notesBoard.appendChild(newNote.element);
    _clearInput();

  }
}

function setupNotes() {
  const notes = Storage.getItemsFromStorage();
  notes.forEach(function(note) {
    const newNote = new Note(note);
    UI.selectors.notesBoard.appendChild(newNote.element);
  })
}

const actions = {
  updateNewNoteText,
  addNewNote,
  setupNotes,
  newNoteLength
}

export default actions;
