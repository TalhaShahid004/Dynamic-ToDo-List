function exportTasks() {
    var data = localStorage.getItem('tasks') || '[]';
    var blob = new Blob([data], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = 'tasks.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function importTasks(event) {
    var file = event.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function (e) {
        localStorage.setItem('tasks', e.target.result);
        displayTasks();
    };
    reader.readAsText(file);
    event.target.value = '';
}
