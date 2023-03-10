import { Link, Outlet } from "react-router-dom";
import LoggedIn from "./LoggedIn";
import NavItem from "./NavItem";
import { useAuth } from "../hooks/AuthContext.js";
import Logo from "./Logo";

interface HeaderProps {
	setErrorMsg?: () => void;
}

function Header({ setErrorMsg }: HeaderProps) {
	const { state } = useAuth();

	return (
		<>
			<nav className="w-full sticky top-0 flex shadow-lg p-2 bg-white h-[60px] gap-2">
				<Logo />
				<NavItem route={"/"} icon={"home"} label={"Home"} end />
				<NavItem
					permissionRequired={"ADMIN"}
					route={"/admin/users"}
					icon={"fa-solid fa-users"}
					label={"Users"}
				/>
				{/*<NavItem*/}
				{/*	permissionRequired={"OWNER"}*/}
				{/*	route={"/owner/"}*/}
				{/*	icon={"fa-solid fa-location-pin"}*/}
				{/*	label={"Walkers"}*/}
				{/*/>*/}

				<div className="ml-auto mr-2 flex items-center gap-2 justify-center">
					{!state.loggedIn ? (
						<>
							<Link
								to={"/signin"}
								className="px-4 py-2 text-primary-500 rounded-lg hover:scale-105 active:scale-95"
							>
								Sign In
							</Link>
						</>
					) : (
						<>
							<div className="flex items-center">
								<div>
									<div className="px-4 flex gap-1 justify-center items-center">
										<i className="fa fa-fw fa-user"></i>
										<p>
											{state.fname.charAt(0).toUpperCase() +
												state.fname.substring(1) +
												" " +
												state.lname}
										</p>
									</div>
									<div className="px-4 flex gap-1 justify-center items-center">
										<i className="fa fa-address-card-o"></i>
										<p>{state.pms}</p>
									</div>
								</div>
							</div>
							<LoggedIn />
						</>
					)}
				</div>
			</nav>
			<Outlet />
		</>
	);
}

export default Header;
