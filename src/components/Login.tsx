import { useAuth } from "@/hooks/AuthContext";
import PerformLoginAction from "@/types/entities/performLoginAction";
import TheLoginForm from "./TheLoginForm";

function Login() {
	const { login, state: authState } = useAuth();

	const performLogin: PerformLoginAction = async (evt, credentials, setAlert) => {
		evt.preventDefault();
		try {
			await login(credentials.username.toLowerCase(), credentials.password);
		} catch (error: any) {
			const errMsgFull = await error.fullError;
			console.log(errMsgFull.message);

			setAlert(errMsgFull.message);
		}
	};

	return <TheLoginForm performLoginAction={performLogin} />;
}

export default Login;
