import {useEffect} from "react";
import {redirect, Route, Routes, useNavigate} from "react-router-dom";
import GuardedRoute from "./components/GuardedRoute";
import Header from "./components/Header";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import User from "./pages/User";
import {useAuth} from "./hooks/AuthContext";
import MissingPage from "./pages/404page";
import DogPage from "./pages/DogPage";
import UsersListPage from "./pages/UsersListPage";

function App() {
    const {autoLogin, state: authState} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        autoLogin();
    }, []);

    return (
        <div className="w-screen h-screen bg-gray-300">
            <Routes>
                <Route path="/" element={<Header/>}>
                    <Route
                        path="/"
                        element={authState.loggedIn ? <Home/> : <SignIn/>}
                    />
                    <Route
                        path="/owner"
                        element={<GuardedRoute permissionRequired={"OWNER"}/>}
                    >
                        {/*<Route index element={<ViewFoocleSpotPage/>}/>*/}
                    </Route>
                    <Route
                        path="/walker"
                        element={<GuardedRoute permissionRequired={"WALKER"}/>}
                    >
                        {/*<Route index element={<ViewFoocleSpotPage/>}/>*/}
                    </Route>
                    <Route
                        path="/admin"
                        element={<GuardedRoute permissionRequired={"ADMIN"}/>}
                    >
                        <Route index element={<Home/>}/>
                    <Route path={"/admin/users"} element={<UsersListPage/>}/>
                    <Route path={"/admin/dog/:id"} element={<DogPage/>}/>
                    </Route>

                    <Route path="/signin" element={<SignIn/>}/>

                    <Route path="*" element={<MissingPage/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
