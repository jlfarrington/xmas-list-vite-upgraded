import "./styles/App.css";
import TopBar from "./styles/TopBar";
import BasicTabs from "./tabs/Tabs";
import Auth from "./auth/Auth";
import { useState, useEffect } from "react";
import * as React from "react";
import { Container, ThemeProvider } from "@mui/material";
import theme from "./styles/theme";

const App = () => {
	const [sessionToken, setSessionToken] = useState("");
	const [userData, setUserData] = useState();

	useEffect(() => {
		const fetchUsers = async () => {
			const usersResponse = await fetch("http://localhost:8080/user/");
			const usersJson = await usersResponse.json();
			console.log(usersJson);
			setUserData(usersJson);
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
	};

	const clearToken = () => {
		localStorage.clear();
		setSessionToken("");
	};

	const protectedViews = () => {
		return sessionToken === localStorage.getItem("token") ? (
			<>
				{userData ? (
					<BasicTabs token={sessionToken} userData={userData} />
				) : null}
			</>
		) : (
			<Auth updateToken={updateToken} userData={userData} />
		);
	};

	return (
		<div className="parent-app">
			<ThemeProvider theme={theme}>
				<TopBar clickLogout={clearToken} />
				<Container maxWidth="xl" className="protected-views">
					{protectedViews()}
				</Container>
			</ThemeProvider>
		</div>
	);
};

export default App;
