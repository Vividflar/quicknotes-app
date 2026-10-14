# QuickNotes
 
QuickNotes is a small note-taking web app built with plain HTML, CSS and JavaScript. You can write short notes, sort them into Personal, Work or Study categories, search through them and delete the ones you no longer need. Your notes are saved in the browser, so they are still there after you refresh the page.
 
## Features
 
- Add a note with a category (Personal, Work or Study)
- Each note is shown as a card with its text, category, date and time, and a Delete button
- Validation: empty notes and notes over 200 characters show an error message
- Delete any note
- Live search that ignores upper and lower case, with a "No notes match your search." message
- Note count that reads correctly for zero, one and many notes
- Notes saved to `localStorage`, so they survive a page refresh
- Colour-coded category styles and a layout that adapts to small screens
- Bonus: "Clear all" button with a confirmation prompt
## How to run locally
 
1. Clone the repository: `git clone https://github.com/your-username/quicknotes-app.git`
2. Open the `quicknotes-app` folder in VS Code.
3. Right-click `index.html` and choose **Open with Live Server** (or just double-click `index.html` to open it in your browser).
There is nothing to install and no build step.
 
## What I learned
 
- Building list items with `createElement` and `textContent` is safer than `innerHTML`, because user text is never treated as HTML.
- A single `render()` function that rebuilds the list from the notes array keeps the screen and the data in sync after every add, delete or search.
- `localStorage` only stores strings, so notes must go through `JSON.stringify` when saving and `JSON.parse` when loading.
- `filter` makes both delete and search short: keep only the notes that pass a test.
- Flexbox lays out the form, and one `@media (max-width: 600px)` rule stacks it for phones.
