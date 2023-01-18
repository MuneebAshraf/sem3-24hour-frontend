import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/AuthContext.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TheFoocleBusinessLogin from "../components/TheFoocleBusinessLogin";

interface SignInProps {
	setErrorMsg?: () => void;
}

function SignIn({ setErrorMsg }: SignInProps) {
	const { login, state: authState } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		authState.loggedIn && navigate("/");
	}, [authState.loggedIn]);

	return (
		<div className="flex flex-col items-center gap-6 justify-center h-full">
			<div className="flex flex-col items-center p-16 py-10 mt-[-50px] shadow-lg justify-center bg-white rounded-lg animated fadeInUp ">
				<h2 className="text-2xl font-bold pb-8">Welcome back</h2>
				<TheFoocleBusinessLogin/>
				{/*<Tabs*/}
				{/*	tabs={[*/}
				{/*		{*/}
				{/*			name: "FoocleScout",*/}
				{/*			content: TheFoocleBusinessLogin(),*/}
				{/*		},*/}
				{/*		{*/}
				{/*			name: "FoocleBusiness",*/}
				{/*			content: TheFoocleBusinessLogin(),*/}
				{/*		},*/}
				{/*	]}*/}
				{/*/>*/}
			</div>
		</div>
	);
}

export default SignIn;
