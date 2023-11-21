import "./styles/App.css";
import TopBar from "./styles/TopBar";
import BasicTabs from "./tabs/Tabs";
import Auth from "./auth/Auth";
import { useState, useEffect } from "react";

const App = () => {
	const [sessionToken, setSessionToken] = useState("");
	const [users, setUsers] = useState();
	const [userData, setUserData] = useState();

	useEffect(() => {
		const fetchUsers = async () => {
			const usersResponse = await fetch("http://localhost:8080/user/");
			const usersJson = await usersResponse.json();
			console.log(usersJson);
			setUserData(usersJson);
			const usersNamesArr = usersJson.map((user) => user.name);
			console.log(usersNamesArr);
			setUsers(usersNamesArr);
		};

		fetchUsers();
	}, []);

	useEffect(() => {
		if (localStorage.getItem("token")) {
			setSessionToken(localStorage.getItem("token"));
		}
	}, [sessionToken]);

	const updateToken = (newToken) => {
		localStorage.setItem("token", newToken);
		setSessionToken(newToken);
		console.log(sessionToken);
	};

	const clearToken = () => {
		localStorage.clear();
		setSessionToken("");
	};

	const protectedViews = () => {
		return sessionToken === localStorage.getItem("token") ? (
			<>
				{users ? (
					<BasicTabs token={sessionToken} users={users} userData={userData} />
				) : null}
			</>
		) : (
			<Auth updateToken={updateToken} users={users} />
		);
	};

	return (
		<div>
			<TopBar clickLogout={clearToken} />
			{protectedViews()}
		</div>
	);
};

export default App;
