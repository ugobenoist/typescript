import supabase from "./../init.js";
import user from "./../login.js";
const getJoinedData = async () => {
    const userLogged = await user;
    if (!userLogged) {
        return false;
    }
    const { data, error } = await supabase
        .from("user")
        .select("*, tasks!inner(*)");
    if (error) {
        console.error(error);
        return false;
    }
    return data;
};
const getTasks = async () => {
    const data = await getJoinedData();
    if (!data) {
        return false;
    }
    data.map((user) => {
        console.log(`${user.id} : ${user.email}`, user.tasks);
    });
    return true;
};
const tasks = getTasks();
