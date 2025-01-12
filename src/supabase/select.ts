import supabase from "./init.js";
 
const getUsers = async () => {
  const { data, error } = await supabase.from("user").select("*");
 
  if (error) {
    console.error(error);
    return error.message;
  }
 
  console.log(data);
  return data;
};
 
const users = getUsers();