// ---------- Select elements ----------
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const clearAllBtn = document.querySelector("#clear-all");
 
const STORAGE_KEY = "quicknotes-notes";
 
// Each note: { id, text, category, createdAt }
let notes = loadNotes();
 
// ---------- Helpers ----------
function formatDate(date) {
  return date.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
}
 
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
 
// ---------- Storage ----------
function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}
 
function loadNotes() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
}
 
// ---------- Rendering ----------
// Build one note card with createElement + textContent (never innerHTML for user text)
function createNoteCard(note) {
  const li = document.createElement("li");
  li.classList.add("note", `category-${note.category}`);
 
  const text = document.createElement("p");
  text.classList.add("note-text");
  text.textContent = note.text;
 
  const meta = document.createElement("div");
  meta.classList.add("note-meta");
 
  const category = document.createElement("span");
  category.classList.add("note-category");
  category.textContent = capitalize(note.category);
 
  const date = document.createElement("span");
  date.classList.add("note-date");
  date.textContent = note.createdAt;
 
  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => deleteNote(note.id));
 
  meta.append(category, date, deleteBtn);
  li.append(text, meta);
  return li;
}
 
// ---------- Search ----------
// A note matches when its text contains every search word (not case-sensitive)
function matchesSearch(note) {
  const words = searchInput.value.trim().toLowerCase().split(/\s+/);
  const text = note.text.toLowerCase();
  return words.every((word) => text.includes(word));
}
 
searchInput.addEventListener("input", render);
 
// "You have no notes yet." / "You have 1 note." / "You have N notes."
function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}
 
// Rebuild the whole list from the notes array
function render() {
  notesList.replaceChildren();
  const visibleNotes = notes.filter(matchesSearch);
 
  if (visibleNotes.length === 0 && searchInput.value.trim() !== "") {
    const message = document.createElement("li");
    message.classList.add("empty-message");
    message.textContent = "No notes match your search.";
    notesList.appendChild(message);
  }
 
  for (const note of visibleNotes) {
    notesList.appendChild(createNoteCard(note));
  }
  updateCount();
}
 
// ---------- Delete a note ----------
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}



// ---------- Add a note ----------
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = noteInput.value.trim();
  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }
  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }
  errorMessage.textContent = "";
  const note = {
    id: Date.now(),
    text: text,
    category: categorySelect.value,
    createdAt: formatDate(new Date()),
  };
  notes.unshift(note); // newest first
  noteInput.value = "";
  searchInput.value = ""; // so the new note is always visible
  saveNotes();
  render();
});
 
render();
 