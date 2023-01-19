import {Button} from "../components";
import useModal from "../hooks/useModal";
import {useAuth} from "../hooks/AuthContext";
import {useEffect, useState} from "react";
import API from "../api";
import Dog from "../types/entities/Dog";
import Modal from "../components/Modal";
import AddDog from "../components/AddDog";
import {Link} from "react-router-dom";

function Home() {
	const {state} = useAuth();
	const [show, toggle] = useModal();
	const [dogs, setDogs] = useState<Dog[]>(  []);
	//usestate for the dogs from the api

	function fetchDoggos() {
		API.WalkieDoggie.getAllDogs().then((dogs: Dog[]) => {
			setDogs(dogs);
		})
		console.log(dogs);
	}

	useEffect(() => {
		fetchDoggos()
		console.log(dogs);
	}, []);

	return (
		<main className={"flex justify-center items-center w-full h-full bg-white"}>
			<div className="flex flex-col w-3/4 h-3/4 h-screen bg-primary-50 rounded-lg relative">
				<Button onClick={toggle} className={"max-w-[10rem] m-4 absolute top-0 right-0"}> Add Dog </Button>
				<div className={"flex gap-5 p-5"}>
					{dogs?.map(dog => (
						<div key={dog.id} className="flex justify-center">
							<div className="rounded-lg shadow-lg bg-white max-w-sm">
								<a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
									<img className="rounded-t-lg"
										 src={dog.image} alt=""/>
								</a>
								<div className="p-6">
									<h5 className="text-gray-900 text-xl font-medium mb-2">{dog.name}</h5>
									<p className="text-gray-700 text-base mb-1">
										{dog.breed}
									</p>
									<p className="text-gray-700 text-base mb-1">
										{dog.gender}
									</p>
									<Link to={"/admin/dog/"+dog.id} className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
										View Dog
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<Modal show={show} toggle={toggle}>
				<AddDog dogs={dogs} setDogs={setDogs} afterSubmit={toggle}/>
			</Modal>
		</main>
	);
}

export default Home;
