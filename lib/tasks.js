import supabase from "./init.js";
const getTasksForAuthenticatedUser = async () => {
    const { data: { user }, error: userError, } = await supabase.auth.getUser();
    if (userError) {
        console.error("Error fetching authenticated user:", userError.message);
        return null;
    }
    if (!user) {
        console.error("No authenticated user found.");
        return null;
    }
    // Requête pour récupérer les tâches de l'utilisateur authentifié
    const { data, error } = await supabase
        .from("user")
        .select("email, tasks(title, description)")
        .eq("id", user.id); // Filtre par l'ID de l'utilisateur connecté
    if (error) {
        console.error("Error fetching tasks:", error.message);
        return null;
    }
    return data;
};
// Fonction pour afficher les tâches dans le DOM
const displayTasks = async () => {
    const taskContainer = document.getElementById("task-list");
    if (!taskContainer) {
        console.error("Task container not found in the DOM.");
        return;
    }
    const data = await getTasksForAuthenticatedUser();
    if (!data || data.length === 0) {
        taskContainer.innerHTML = `<p>No tasks found for your account.</p>`;
        return;
    }
    const user = data[0];
    const userTitle = document.createElement("h3");
    userTitle.textContent = `Tasks for: ${user.email}`;
    taskContainer.appendChild(userTitle);
    const taskList = document.createElement("ul");
    user.tasks.forEach((task) => {
        const taskItem = document.createElement("li");
        taskItem.textContent = `Task: ${task.title}, Description: ${task.description}`;
        taskList.appendChild(taskItem);
    });
    taskContainer.appendChild(taskList);
};
// Appeler la fonction pour afficher les tâches au chargement de la page
window.addEventListener("DOMContentLoaded", displayTasks);
