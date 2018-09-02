import '../scss/main.scss'

import UI from './modules/ui'
import Actions from './modules/actions'
import Storage from './modules/storage'

document.addEventListener('DOMContentLoaded', function() {
  Actions.setupNotes();
  addBtn.addEventListener('click', Actions.addNewNote);
  newNoteInput.addEventListener('input', Actions.newNoteLength);
  newNoteInput.addEventListener('keypress', function(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      Actions.addNewNote();
    }
  })
})
