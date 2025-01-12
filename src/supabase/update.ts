import supabase from "./init.js";

const updateTask = async (taskId: string, newTitle: string, newDescription: string) => {
  const {
    data: { user: loggedUser },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !loggedUser) {
    console.error("No authenticated user found:", userError?.message);
    return false;
  }

  const { data, error } = await supabase
    .from("tasks")
    .update({
      title: newTitle,
      description: newDescription,
    })
    .eq("id", taskId) // Identifier la tâche à mettre à jour
    .eq("user", loggedUser.id) // Vérifier que la tâche appartient à l'utilisateur connecté
    .select();

  if (error) {
    console.error("Error updating task:", error.message);
    return false;
  }

  console.log("Task updated successfully:", data);
  return true;
};

export { updateTask };
