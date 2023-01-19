import {BASE_API_URL} from "../../settings";
import {getToken, handleHttpErrors, makeOptions, setToken} from "./util.api";
import Dog from "../types/entities/Dog";
import User from "../types/entities/User";

function ApiFacade() {

    const login = async (username: string, password: string) => {
        try {
            const options = makeOptions("POST", true, {username, password});
            const res = await fetch(BASE_API_URL + "/login", options);
            const data = await handleHttpErrors(res);
            setToken(data.token);
            return data;
        } catch (error: any) {
            return Promise.reject({...error});
        }
    };


    const getAllDogs = async () => {
        try {
            const options = makeOptions("GET", true );
            const res = await fetch(BASE_API_URL + "/dog", options);
            const data = await handleHttpErrors(res);
            return data as Dog[];
            console.log(data);
        } catch (error: any) {
            return Promise.reject({...error});
        }
    }

    const addDog = async (Dog: Dog) => {
        try {
            const options = makeOptions("POST", true, {...Dog});
            const res = await fetch(BASE_API_URL + "/dog", options);
            const data = await handleHttpErrors(res);
            return data as Dog;
        } catch (error: any) {
            return Promise.reject({...error});
        }
    }

    const updateDog = async (Dog: Dog) => {
        try {
            const options = makeOptions("PUT", true, {...Dog});
            const res = await fetch(BASE_API_URL + "/dog/"+ Dog.id, options);
            const data = await handleHttpErrors(res);
            return data;
        } catch (error: any) {
            return Promise.reject({...error});
        }
    }

    //get dog by dog id
    const getDogById = async (id?: string  ) => {
        try {
            const options = makeOptions("GET", true);
            const res = await fetch(BASE_API_URL + "/dog/" + id, options);
            const data = await handleHttpErrors(res);
            return data as Dog;
        } catch (error: any) {
            return Promise.reject({...error});
        }
    }

    //delete dog by dog id
    const deleteDog = async (id?: string  ) => {
        try {
            const options = makeOptions("DELETE", true);
            const res = await fetch(BASE_API_URL + "/dog/" + id, options);
            const data = await handleHttpErrors(res);
            return true;
        } catch (error: any) {
            return Promise.reject({...error});
        }
    }

    //get all users get request
    const getAllUsers = async () => {
        try {
            const options = makeOptions("GET", true );
            const res = await fetch(BASE_API_URL + "/user", options);
            const data = await handleHttpErrors(res);
            return data as User[];
        } catch (error: any) {
            return Promise.reject({...error});
        }
    }

    //update User by id
    const updateUser = async (User: User) => {
        try {
            const options = makeOptions("PUT", true, {...User});
            const res = await fetch(BASE_API_URL + "/user/"+ User.id, options);
            const data = await handleHttpErrors(res);
            return data;
        } catch (error: any) {
            return Promise.reject({...error});
        }
    }

    //delete user by id
    const deleteUser = async (id?: string  ) => {
        try {
            const options = makeOptions("DELETE", true);
            const res = await fetch(BASE_API_URL + "/user/" + id, options);
            const data = await handleHttpErrors(res);
            return true;
        } catch (error: any) {
            return Promise.reject({...error});
        }
    }
    //create user with post request
    const addUser = async (User: User) => {
        try {
            const options = makeOptions("POST", true, {...User});
            const res = await fetch(BASE_API_URL + "/user", options);
            const data = await handleHttpErrors(res);
            return data as User;
        } catch (error: any) {
            return Promise.reject({...error});
        }
    }

    return {
        makeOptions,
        setToken,
        getToken,
        login,
        getAllDogs,
        addDog,
        updateDog,
        getDogById,
        deleteDog,
        getAllUsers,
        updateUser,
        deleteUser,
        addUser
    };
}

const facade = ApiFacade();
export default facade;
