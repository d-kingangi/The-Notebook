
document.getElementById('openModalBtn').addEventListener('click', openCreateNoteModal);

class Note {
    id: number;
    title: string;
    content: string;

    constructor(id: number, title: string, content: string) {
        this.id = id;
        this.title = title;
        this.content = content;
    }
} 

let notes: Note[] = [];

function openCreateNoteModal() {
    showElement('createNoteModal');
}

function closeCreateNoteModal() {
    hideElement('createNoteModal');
}

function showElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'block';
    }
}

function hideElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'none';
    }
}

function createNote() {
    const titleInput = document.getElementById('noteTitle') as HTMLInputElement;
    const contentInput = document.getElementById('noteContent') as HTMLInputElement;

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (title && content) {
        const newNoteId = notes.length + 1;
        const newNote = new Note(newNoteId, title, content);

        notes.push(newNote);
        saveNotesToLocalStorage();

        titleInput.value = '';
        contentInput.value = '';

        closeCreateNoteModal();

        displayNotes();
    } else {
        alert('Please enter both title and content.');
    }
}

function saveNotesToLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotesFromLocalStorage() {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
        notes = JSON.parse(storedNotes);
    }
}

function displayNotes() {
    const notesGrid = document.getElementById('notesGrid');
    if (notesGrid) {
        notesGrid.innerHTML = '';

        loadNotesFromLocalStorage();

        notes.forEach(note => {
            const noteCard = document.createElement('div');
            noteCard.className = 'note-card';
            noteCard.innerHTML = `<h3>${note.title}</h3>`;
            noteCard.onclick = () => openNoteModal(note.id);
            notesGrid.appendChild(noteCard);
            // notesGrid.innerHTML += createNoteModal(note);
        });
    }
}

function openNoteModal(noteId: number) {
    console.log('Opening modal for note with ID:', noteId)
    const note = notes.find(n => n.id === noteId);
    if (note) {
        const noteModal = document.getElementById('noteModal');
        const modalContent = document.getElementById('modalContent');
        
        if (noteModal && modalContent) {
            modalContent.innerHTML = `
                <span class="close" onclick="closeNoteModal()">&times;</span>
                <h2 style="color: purple;">${note.title}</h2>
                <p>${note.content}</p>
                <button onclick="openUpdateNoteModal(${note.id})">Update</button>
                <button onclick="confirmDeleteNote(${note.id})">Delete</button>
            `;

            showElement('noteModal');
            noteModal.style.display = 'block';
        }
    }
}

function openUpdateNoteModal(noteId: number) {
    const updateNoteModal = document.getElementById('updateNoteModal');
    if (updateNoteModal) {
        const noteToUpdate = notes.find(n => n.id === noteId);
        if (noteToUpdate) {
            const updateNoteTitle = document.getElementById('updateNoteTitle').value = noteToUpdate.title;
            const updateNoteContent = document.getElementById('updateNoteContent').value = noteToUpdate.content;

            if (updateNoteTitle && updateNoteContent) {
                // Populate the update note form with existing data
                updateNoteTitle.value = noteToUpdate.title;
                updateNoteContent.value = noteToUpdate.content;

                showElement('updateNoteModal');
            }
        }
    }
}

function closeUpdateNoteModal() {
    hideElement('updateNoteModal');
}

function confirmDeleteNote(noteId: number) {
    const confirmation = window.confirm('Are you sure you want to delete this note?');
    if (confirmation) {
        deleteNoteById(noteId);
        displayNotes();
        closeNoteModal();
    }
}

function deleteNoteById(noteId: number) {
    notes = notes.filter(note => note.id !== noteId);
    saveNotesToLocalStorage();
}

function closeNoteModal() {
    hideElement('singleNoteModal');
}

function updateNote() {
    const updatedTitle = (document.getElementById('updateNoteTitle') as HTMLInputElement)?.value?.trim();
    const updatedContent = (document.getElementById('updateNoteContent') as HTMLTextAreaElement)?.value?.trim();

    // Add your logic to update the note with updatedTitle and updatedContent
    // Save the updated notes array to local storage
    // Reload and display the updated notes grid
    // Close the update note modal
}

document.addEventListener('DOMContentLoaded', function () {
    displayNotes();
});









