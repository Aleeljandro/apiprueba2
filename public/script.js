const API_URL = "http://localhost:3000/tareas";

async function fetchTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
    
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${task.titulo} - ${task.descripcion}
            <button onclick="deleteTask('${task.id}')">X</button>
        `;
        taskList.appendChild(li);
    });
}

async function addTask() {
    const title = document.getElementById("task-title").value;
    const desc = document.getElementById("task-desc").value;

    if (!title || !desc) {
        alert("Por favor, ingresa título y descripción.");
        return;
    }

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo: title, descripcion: desc })
    });

    document.getElementById("task-title").value = "";
    document.getElementById("task-desc").value = "";
    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
}

document.addEventListener("DOMContentLoaded", fetchTasks);
