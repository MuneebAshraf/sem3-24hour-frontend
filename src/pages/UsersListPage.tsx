import React, {useState, useEffect} from "react";
import API from "../api";
import User from "../types/entities/User";
import {Button, InputField} from "../components";
import {Link} from "react-router-dom";
import Modal from "../components/Modal";
import useModal from "../hooks/useModal";
import AddUser from "../components/AddUser";


const UsersListPage = () => {
    const [show, toggle] = useModal();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        API.WalkieDoggie.getAllUsers().then((users) => {
            setUsers(users);
        console.log(users);
        });
    }, []);

    async function updateUser(user: User) {
        await API.WalkieDoggie.updateUser(user);
    }

    async function deleteUser(user: User) {
        await API.WalkieDoggie.deleteUser(user.id?.toString());
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUsers((prev) => ({...prev, [name]: value}));
    };


    return (
    <>
        <div className={"flex w-full pt-5 px-5"}>
            <Link
                className={"disabled:border-b-primary-100 transition-all duration-300 ease-in-out bg-off-white border-2 border-primary-500 focus:border-secondary-500 border-solid rounded-lg px-4 py-2 "}
                to={"/admin"}>Back to Home
            </Link>
            <Button onClick={toggle} className={"max-w-[10rem] ml-auto"}> Add User </Button>
        </div>
        <div className="bg-primary-100 rounded-md p-5 m-10">
            {users.map((user) => (
                <div
                    key={user.id}
                    className="flex items-center my-5 p-5 border-b border-gray-200"
                >
                    <div className="w-1/4 text-lg font-medium">{user.firstName + user.lastName}</div>
                    <div className="w-3/4 text-sm text-gray-600 flex gap-2">
                        <div className="mt-4 mt-auto grow">
                            <label className="block text-sm font-medium leading-5 text-gray-700">
                                First name
                            </label>
                            <div className="mt-1 rounded-md shadow-sm w-full flex flex-col">
                                <InputField
                                    value={user.firstName}
                                    onChange={handleInputChange}
                                    name="firstName"
                                    className="form-input py-2 px-3 rounded-md leading-5 text-gray-700  w-3/4"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="mt-4  mt-auto grow">
                            <label className="block text-sm font-medium leading-5 text-gray-700">
                                Last name
                            </label>
                            <div className="mt-1 rounded-md shadow-sm w-full flex flex-col">
                                <InputField
                                    value={user.lastName}
                                    onChange={handleInputChange}
                                    name="lastName"
                                    className="form-input py-2 px-3 rounded-md leading-5 text-gray-700  w-3/4"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="mt-4  mt-auto grow">
                            <label className="block text-sm font-medium leading-5 text-gray-700">
                                Street name
                            </label>
                            <div className="mt-1 rounded-md shadow-sm w-full flex flex-col">
                                <InputField
                                    value={user.street}
                                    onChange={handleInputChange}
                                    name="street"
                                    className="form-input py-2 px-3 rounded-md leading-5 text-gray-700  w-3/4"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="mt-4  mt-auto grow">
                            <label className="block text-sm font-medium leading-5 text-gray-700">
                               Zip
                            </label>
                            <div className="mt-1 rounded-md shadow-sm w-full flex flex-col">
                                <InputField
                                    value={user.zip}
                                    onChange={handleInputChange}
                                    name="zip"
                                    className="form-input py-2 px-3 rounded-md leading-5 text-gray-700  w-3/4"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="mt-4  mt-auto grow">
                            <label className="block text-sm font-medium leading-5 text-gray-700">
                                City
                            </label>
                            <div className="mt-1 rounded-md shadow-sm w-full flex flex-col">
                                <InputField
                                    value={user.city}
                                    onChange={handleInputChange}
                                    name="city"
                                    className="form-input py-2 px-3 rounded-md leading-5 text-gray-700  w-3/4"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="mt-4  mt-auto grow">
                            <label className="block text-sm font-medium leading-5 text-gray-700">
                                Role
                            </label>
                            <div className="mt-1 rounded-md shadow-sm w-full flex flex-col">
                                <InputField
                                    value={user.roles}
                                    onChange={handleInputChange}
                                    name="role"
                                    className="form-input py-2 px-3 rounded-md leading-5 text-gray-700  w-3/4"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="mt-4  mt-auto grow">
                            <Button
                                className="bg-red-500 hover:bg-red-700 text-white min-w-[8rem] font-bold py-2 px-4 rounded"
                                onClick={() => deleteUser(user)}
                            >
                                Delete user
                            </Button>
                        </div>
                        <div className="mt-4  mt-auto grow">
                            <Button
                                className="bg-blue-500 hover:bg-blue-700 text-white min-w-[8rem] font-bold py-2 px-4 rounded"
                                onClick={() => updateUser(user)}
                            >
                                Update user
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <Modal show={show} toggle={toggle}>
            <AddUser users={users} setUsers={setUsers} afterSubmit={toggle}/>
        </Modal>
    </>
    );
};

export default UsersListPage;
