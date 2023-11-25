import {
	Button,
	Card,
	CardContent,
	CardMedia,
	CardActions,
	Link,
	Typography,
	Container,
} from "@mui/material";
import "../styles/App.css";
import * as React from "react";
import { useState, useEffect } from "react";
import { Warning } from "@mui/icons-material";

const warningStyle = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	paddingTop: "10%",
	gap: "20px",
};

const cardStyle = {
	maxWidth: "400px",
	display: "flex",
	flexDirection: "column",
	gap: "10px",
	padding: "1%",
};

const buttonsStyle = {
	display: "flex",
	justifyContent: "space-between",
};

const CardGrid = (value) => {
	const [data, setData] = useState([]);
	const fetchGifts = async () => {
		const giftsResponse = await fetch("http://localhost:8080/gift");
		const giftSuccessJson = await giftsResponse.json();
		console.log(giftSuccessJson);
		setData(giftSuccessJson);
	};

	useEffect(() => {
		fetchGifts();
	}, []);

	const currentUserGifts = data.filter((obj) => obj.userId === value.value);
	const token = localStorage.getItem("token");

	return (
		<div className="cardGrid">
			{data.length
				? currentUserGifts.map((obj, index) => {
						return (
							<Card sx={cardStyle} key={index} className="card">
								<a href={obj.url} target="_blank" rel="noreferrer">
									<CardMedia
										component="img"
										image={obj.imageLink}
										alt={obj.name}
										height="300"
									/>
								</a>
								<CardContent>
									<Typography>{obj.name}</Typography>
									<Typography>{obj.description}</Typography>
									<Typography variant="subtitle2">{obj.price}</Typography>
								</CardContent>
								<CardActions sx={buttonsStyle}>
									<Button
										size="small"
										href={obj.url}
										target="_blank"
										rel="noreferrer"
									>
										View / Buy
									</Button>
									{obj.userId == token ? (
										<Button variant="contained" color="error">
											Delete From Your List
										</Button>
									) : null}
								</CardActions>
							</Card>
						);
				  })
				: null}

			{!currentUserGifts.length ? (
				<Container sx={warningStyle} maxWidth="xl">
					<Warning fontSize="large" color="disabled" />
					<Typography variant="subtitle1">
						Looks like there aren't any gifts added to this list yet!
					</Typography>
				</Container>
			) : null}
		</div>
	);
};

export default CardGrid;
