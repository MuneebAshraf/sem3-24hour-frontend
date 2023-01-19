import React, {useState} from 'react';
import API from "../api";
import Dog from "../types/entities/Dog";
import InputField from "./InputField";
import Button from "./Button";

interface AddDogProps {
    afterSubmit: () => void;
    setDogs: (dogs: Dog[]) => void;
    dogs: Dog[];
}

const AddDog = ({ afterSubmit, setDogs, dogs }:AddDogProps) => {
    const [dog, setDog] = useState<Dog>( {name: '', breed: '', image: '', gender: '', birthdate: '', owner_id: 1} );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await API.WalkieDoggie.addDog( dog ).then( () => {
            afterSubmit();
            setDogs( [...dogs, dog] );
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setDog( (prev) => ({...prev, [ name ]: value}) );
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputField
                label="Name"
                name="name"
                value={dog.name}
                onChange={handleInputChange}
            />
            <InputField
                label="Breed"
                name="breed"
                value={dog.breed}
                onChange={handleInputChange}
            />
            <InputField
                label="Image"
                name="image"
                value={dog.image}
                onChange={handleInputChange}
            />
            <InputField
                label="Gender"
                name="gender"
                value={dog.gender}
                onChange={handleInputChange}
            />
            <InputField
                type="datetime-local"
                label="Birthdate"
                name="birthdate"
                value={dog.birthdate}
                onChange={handleInputChange}
            />
            <Button className={"mt-4"} type="submit">Submit</Button>
        </form>
    );
};
export default AddDog;
