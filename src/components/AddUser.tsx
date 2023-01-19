import React, {useState} from 'react';
import API from "../api";
import InputField from "./InputField";
import Button from "./Button";
import User from "../types/entities/User";

interface AddDogProps {
    afterSubmit: () => void;
    setUsers: (users: User[]) => void;
    users: User[];
}

const AddUser = ({afterSubmit, setUsers, users}: AddDogProps) => {
    const [user, setUser] = useState<User>({username: '',password: '' , firstName: '', lastName: '', street: '', zip: undefined, city: '', roles: 'WALKER'});
    const [selectedOption, setSelectedOption] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await API.WalkieDoggie.addUser(user).then(() => {
            afterSubmit();
            setUsers([...users, user]);
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUser((prev) => ({...prev, [name]: value}));
    };

    const options = [
        {value: "ADMIN", label: "Admin"},
        {value: "OWNER", label: "Owner"},
        {value: "WALKER", label: "Walker"}
    ];

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
        setUser((prev) => ({...prev, roles: selectedOption}));
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputField
                label="Username"
                name="username"
                value={user.username}
                onChange={handleInputChange}
            />
            <InputField
                type={"password"}
                label="Password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
            />
            <InputField
                label="firstName"
                name="firstName"
                value={user.firstName}
                onChange={handleInputChange}
            />
            <InputField
                label="lastName"
                name="lastName"
                value={user.lastName}
                onChange={handleInputChange}
            />
            <InputField
                label="street"
                name="street"
                value={user.street}
                onChange={handleInputChange}
            />
            <InputField
                type="number"
                label="Zip"
                name="zip"
                value={user.zip}
                onChange={handleInputChange}
            />
            <InputField
                label="City"
                name="city"
                value={user.city}
                onChange={handleInputChange}
            />
            <div>
                <label>Select User Type</label>
                <select value={selectedOption} onChange={handleChange}>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <Button className={"mt-4"} type="submit">Submit</Button>
        </form>
    );
};
export default AddUser;
