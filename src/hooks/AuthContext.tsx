import API from "@/api";
import { createContext, useContext, useMemo, useReducer } from "react";
import Permission from "../types/entities/permission";
import { getUserInfo } from "../utils/credentialHelper";

type Action = {
	type: "login" | "logout";
	[key: string]: any;
};

type State = {
	ID?: number;
	username: string;
	fname: string;
	lname: string;
	pms?: Permission;
	loggedIn: boolean;
};

type Dispatch = (action: Action) => void;

interface AuthContextProps {
	state: State;
	dispatch: Dispatch;
}

type AuthProviderProps = { children: React.ReactNode };

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function authReducer(state: State, action: Action): State {
	switch (action.type) {
		case "login": {
			const user = getUserInfo();
			return { ...state, loggedIn: true, ...user };
		}
		case "logout": {
			API.helpers.logout();
			return { ...state, username: "", pms: undefined, loggedIn: false };
		}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
}

function AuthProvider({ children }: AuthProviderProps) {
	const [state, dispatch] = useReducer(authReducer, {
		ID: undefined,
		username: "",
		fname: "",
		lname: "",
		loggedIn: false,
	});

	const value = useMemo(() => ({ state, dispatch }), [state]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
	const context = useContext(AuthContext);

	if (context === undefined) {
		throw new Error("useAuth must be used within a AuthProvider");
	}

	const state = context.state;

	const login = async (
		username: string,
		password: string,
	) => {
		try {
			await API.WalkieDoggie.login(username, password);

			context.dispatch({ type: "login" });
			return Promise.resolve();
		} catch (error: any) {
			return Promise.reject(error);
		}
	};

	const logout = () => {
		context.dispatch({ type: "logout" });
	};

	const revalidate = async () => {
		if (!state.loggedIn) return false;

		try {
			const isValid = await API.helpers.validateToken();
			if (!isValid) throw new Error();
			return true;
		} catch {
			logout();
			return false;
		}
	};

	const autoLogin = async () => {
		if (API.helpers.getToken() && (await API.helpers.validateToken())) {
			context.dispatch({ type: "login" });
		}
	};

	const hasAccessRights = (permission: Permission) => {
		let isAllowed = permission == state.pms;
		if (state.pms == "ADMIN") isAllowed = true;
		return isAllowed;
	};

	const hasAccessRightsWithRevalidate = async (permission: Permission) => {
		if (await revalidate()) {
			return hasAccessRights(permission);
		}
		return false;
	};

	return {
		state,
		login,
		logout,
		autoLogin,
		revalidate,
		hasAccessRights,
		hasAccessRightsWithRevalidate,
	};
}

export { AuthProvider, useAuth };
