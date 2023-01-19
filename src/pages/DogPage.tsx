import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import API from "../api";
import Dog from "../types/entities/Dog";
import {Button, InputField} from "../components";
import {Route, Routes, useNavigate} from 'react-router-dom';

const DogPage = () => {
    const navigate = useNavigate();
    const [dog, setDog] = useState<Dog>({
        id: undefined,
        name: '',
        breed: '',
        image: '',
        gender: '',
        birthdate: '',
        walks: [],
        owner_id: 1,
    });
    const {id} = useParams();

    useEffect(() => {
        API.WalkieDoggie.getDogById(id).then(dog => {
            setDog(dog);
        }).catch(err => {
            if (dog.id === undefined) {
                navigate('/admin')
            }
        });
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await API.WalkieDoggie.updateDog(dog);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setDog((prev) => ({...prev, [name]: value}));
    };

    //onclick a button that calls the deleteDog function from the API
    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        // convert dog.id to a string
        await API.WalkieDoggie.deleteDog(dog.id?.toString()).then(() => {
            // redirect to the home page
            navigate('/admin')
        });
    }


    return (
        <>
        <div className={"flex w-full pt-5 px-5"}>
            <Link
                className={"disabled:border-b-primary-100 transition-all duration-300 ease-in-out bg-off-white border-2 border-primary-500 focus:border-secondary-500 border-solid rounded-lg px-4 py-2 "}
                to={"/admin"}>Back to Home
            </Link>
            <Button onClick={handleDelete} className={"disabled:border-b-primary-100 transition-all duration-300 ease-in-out bg-danger border-2 rounded-lg max-w-[12rem] ml-auto "}>
                Delete Dog
            </Button>
        </div>
        <form className={"mt-8 mx-5"} onSubmit={handleSubmit}>
            <div className="rounded-md bg-white p-5">
                <div className=" flex">
                    <div className="w-1/3 flex flex-col">
                        <img className="w-full" src={dog.image} alt={dog.name}/>
                        <div className="mt-4  w-full mt-auto">
                            <label className="block text-sm font-medium leading-5 text-gray-700">
                                Link to image
                            </label>
                            <div className="mt-1 rounded-md shadow-sm w-full flex flex-col">
                                <InputField
                                    value={dog.image}
                                    onChange={handleInputChange}
                                    name="image"
                                    className="form-input py-2 px-3 rounded-md leading-5 text-gray-700  w-3/4"
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>
                    <div className=" w-1/3">
                        <div className="mt-4">
                            <label className="block text-sm font-medium leading-5 text-gray-700">
                                name
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <InputField
                                    value={dog.name}
                                    onChange={handleInputChange}
                                    name="name"
                                    className="form-input py-2 px-3 rounded-md leading-5 text-gray-700 w-full"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium leading-5 text-gray-700">
                                Breed
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <InputField
                                    value={dog.breed}
                                    onChange={handleInputChange}
                                    name="breed"
                                    className="form-input py-2 px-3 rounded-md leading-5 text-gray-700 w-full"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium leading-5 text-gray-700">
                                Gender
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <InputField
                                    value={dog.gender}
                                    onChange={handleInputChange}
                                    name="gender"
                                    className="form-input py-2 px-3 rounded-md leading-5 text-gray-700 w-full"
                                    type="text"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium leading-5 text-gray-700">
                                Birthdate
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <InputField
                                    value={dog.birthdate}
                                    onChange={handleInputChange}
                                    name="birthdate"
                                    className="form-input py-2 px-3 rounded-md leading-5 text-gray-700 w-full"
                                    type="datetime-local"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium leading-5 text-gray-700">
                                Owner ID
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <InputField
                                    value={dog.owner_id}
                                    onChange={handleInputChange}
                                    name="owner_id"
                                    className="form-input py-2 px-3 rounded-md leading-5 text-gray-700 w-full"
                                    type="number"
                                />
                            </div>
                        </div>

                        <Button className="mt-4 bg-primary-500 text-white p-2 rounded-md hover:bg-primary-300">
                            Save Changes
                        </Button>
                    </div>
                    <div className="w-1/3">
                        <h3 className="text-lg font-medium">Walks</h3>
                        <ul>
                            {dog.walks?.map((walk, index) => (
                                <li key={index}>{walk}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </form>
    </>
    );
};
export default DogPage;

