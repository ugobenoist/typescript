import supabase from "./../init.js";
const insertTask = async (task) => {
    const { data: { user: loggedUser }, error: userError, } = await supabase.auth.getUser();
    if (userError || !loggedUser) {
        console.error("No authenticated user found:", userError?.message);
        return false;
    }
    const { error } = await supabase.from("tasks").insert({
        user: loggedUser.id, // Associer la tâche à l'utilisateur authentifié
        task: task,
    });
    if (error) {
        console.error("Error inserting task:", error.message);
        return false;
    }
    console.log("Task inserted successfully");
    return true;
};
// Fonction d'ajout d'une tâche depuis un formulaire
export const handleAddTask = async (event) => {
    event.preventDefault();
    const taskInput = document.getElementById("task-input");
    if (!taskInput || !taskInput.value) {
        console.error("Task input is empty");
        return;
    }
    const success = await insertTask(taskInput.value);
    if (success) {
        alert("Task added successfully!");
        taskInput.value = ""; // Réinitialiser le champ
    }
    else {
        alert("Failed to add task. Please try again.");
    }
};
