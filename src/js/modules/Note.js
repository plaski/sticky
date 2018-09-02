import Store from './store'
import Storage from './storage'

class Note {
  constructor(note) {
    this.id = note.id;
    this.rotate = note.rotate;
    this.rotateHover = note.rotateHover;
    this.top = note.top;
    this.left = note.left;
    this.text = note.text;
    this.date = note.date;
    this.color = note.color;
    this.pinX = note.pinX;
    this.pinY = note.pinY;
    this.done = note.done || false;
    this.element = this.createNote();
  }

  createNote() {
		const note = document.createElement('li');
    note.className = `note${this.done ? ` done` : ''}`;
    note.style.background = this.color;
    note.style.transformOrigin = (this.pinX + 8) + 'px ' + (this.pinY + 8) + 'px';
    note.style.top = this.top + 'px';
    note.style.left = this.left + 'px';
    note.style.webkitTransform = `rotate(${this.rotate}deg)`;
    note.tabIndex = 0;
    note.id = this.id;

    const notePin = document.createElement('div');
    notePin.className = 'pin note-pin';
    notePin.style.left = this.pinX + 'px';
    notePin.style.top = this.pinY + 'px';

    const noteTrash = document.createElement('i');
    noteTrash.className = 'fa fa-trash note-icon';

    const noteText = document.createElement('p');
    noteText.className = 'note-text';
    noteText.innerText = this.text;

    const noteDate = document.createElement('span');
    noteDate.className = 'note-date';
    noteDate.innerText = this.date;

    const noteCheck = document.createElement('i');
    noteCheck.className = 'fa fa-check note-icon note-icon-check';

		noteTrash.addEventListener('click', () => {
      note.className += ' remove';
      window.setTimeout(() => {
        this.removeNote();
        Storage.deleteItemFromStorage(this.id);
      }, 500);
		},);

    noteCheck.addEventListener('click', () => {
      this.doneNote();
      Storage.updateItemInStorage(this);
    });

    noteText.addEventListener('click', () => {
      if (Store.data.isEdited !== true) {
        this.editNote();
      }
    })

		note.appendChild(notePin);
		note.appendChild(noteTrash);
		note.appendChild(noteText);
		note.appendChild(noteDate);
		note.appendChild(noteCheck);

    Store.addNote(this);

    note.addEventListener('mouseenter', () => {
      note.style.webkitTransform = `rotate(${this.rotateHover}deg)`;
    })

    note.addEventListener('mouseleave', () => {
      note.style.webkitTransform = `rotate(${this.rotate}deg)`;
    })

		return note;
	}

  doneNote() {
    this.element.classList.toggle('done');
    Store.doneNote(this.id);
  }

  removeNote() {
    this.element.remove();
    Store.removeNote(this.id);
  }

  editNote() {
    const noteElement = this.element.children[2];
    if (this.done) {
      return;
    } else if (noteElement !== 'input') {
      Store.data.isEdited = true;
      const innerText = noteElement.innerText;
      const tempTextarea = document.createElement('textarea');
      tempTextarea.className = 'input-area temp-input-area';
      tempTextarea.rows = '8';
      tempTextarea.value = innerText;
      noteElement.innerText = '';
      noteElement.appendChild(tempTextarea);
      tempTextarea.focus();
      tempTextarea.addEventListener('blur', () => {
        Store.data.isEdited = false;
        let inputValue = tempTextarea.value;
        if (inputValue.trim() === '') {
          inputValue = innerText;
        }
        noteElement.innerText = inputValue;
        tempTextarea.remove();
        this.text = inputValue;
        Store.editNote(this);
        Storage.updateItemInStorage(this);
      });
    }
  }
}

export default Note;
