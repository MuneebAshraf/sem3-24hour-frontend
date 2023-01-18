import API from "@/api";
import { LoadingSpinner } from "@/components";
import { useAuth } from "@/hooks/AuthContext";
import React, { useEffect, useState } from "react";

function ScoutHomePage() {
	const { state } = useAuth();
	// const [scoutRequests, setScoutRequest] = useState<MadeScoutRequest[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchData = async () => {
		setLoading(true);
		const id = state.ID!;
		const data = await API.scout.getScoutRequest(id);
		// if (data) setScoutRequest(data);
		// setLoading(false);
	};

	useEffect(() => {
		try {
			fetchData();
		} catch (error) {
			console.log(error);
		}

		return () => {};
	}, []);

	return (
		<div className="flex gap-5 m-5">
			<div className="bg-white h-full p-5 flex flex-col rounded-lg">
				<div className="h-20 w-20 bg-primary-500 rounded-full self-center mb-2" />
				<p>{state.fname + " " + state.lname}</p>
				<p>{state.username}</p>
				<p>{state.pms}</p>
			</div>
			<div className="bg-white h-full flex-auto p-4 flex flex-col gap-4 rounded-lg">
				<h2 className="font-header font-semibold">Request history</h2>
				<div className="flex flex-col gap-4 ">
					{loading ? (
						<LoadingSpinner />
					) : (
						<>
							{/*{scoutRequests.map(sr => (*/}
							{/*	<ScoutRequestItem key={sr.id} scoutRequest={sr} />*/}
							{/*))}*/}
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default ScoutHomePage;
