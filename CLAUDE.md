# CLAUDE.md

## Running the App
No build step, no dependencies, no npm. Open `src/index.html` directly in a browser. Vanilla HTML/CSS/JS.

## Architecture
- `src/script.js` holds all logic. A single module-level `tasks` array is loaded from `localStorage` on startup. All mutations must go through `saveTasks()` + `displayTasks()`.
- Priority color classes (`priority-highest`–`priority-low`) in `styles.css` are applied dynamically by JS.

### Task data shape
```js
{ name: string, weight: number (1–10), dueDate: string|null (YYYY-MM-DD), estimatedTime: number (hours), completed: boolean }
```

### Priority system
`calculatePriority(weight, dueDate, estimatedTime, completed)` returns a number clamped to 1–5 (or `'-'` for completed). Scoring adjusts on days-until-due (≤1/≤3/>3), weight (≥7/≥4/<4), and hours (≤3/≤6/>6). No-due-date tasks use a separate path with a −1.5 penalty.

`displayTasks()` splits into incomplete/completed, merges (incomplete first), sorts each group descending by priority, renders into `#taskTableBody`.

### Persistence
`saveTasks()`/`loadTasks()` read/write the `tasks` key in `localStorage` as JSON.