import supabase from "./init.js";
export const register = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });
    if (error) {
        console.error(error);
        return { success: false, message: error.message };
    }
    return { success: true, data: data };
};
