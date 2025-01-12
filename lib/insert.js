import supabase from "./init.js";
import user from "./login.js";
const createUser = async () => {
    // Authentification
    const userLogged = await user;
    if (!userLogged) {
        return false;
    }
    const { error } = await supabase.from("user").insert({
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        password: "password",
    });
    if (error) {
        console.error(error);
        return false;
    }
    return true;
};
const userCreated = createUser();
