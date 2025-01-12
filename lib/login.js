// login.js
import supabase from './init.js';
export const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });
    if (error) {
        console.error(error);
        return { success: false, message: error.message };
    }
    return { success: true, data: data };
};
