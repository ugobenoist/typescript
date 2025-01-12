import supabase from "./init.js";

const deleteTask = async (taskId: string) => {
  const {
    data: { user: loggedUser },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !loggedUser) {
    console.error("No authenticated user found:", userError?.message);
    return false;
  }

  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId)
    .eq("user", loggedUser.id); // Vérifier que la tâche appartient à l'utilisateur connecté

  if (error) {
    console.error("Error deleting task:", error.message);
    return false;
  }

  console.log("Task deleted successfully");
  return true;
};

export { deleteTask };
