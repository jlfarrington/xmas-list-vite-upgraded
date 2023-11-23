import {
	Button,
	Card,
	CardContent,
	CardMedia,
	CardActions,
	Typography,
} from "@mui/material";
import "../styles/App.css";
import * as React from "react";
import { useState, useEffect } from "react";

const CardGrid = (value) => {
	const [data, setData] = useState([]);
	const fetchGifts = async () => {
		console.log("Fetching Gifts");
		const giftsResponse = await fetch("http://localhost:8080/gift");
		const giftSuccessJson = await giftsResponse.json();
		console.log(giftSuccessJson);
		setData(giftSuccessJson);
	};

	useEffect(() => {
		fetchGifts();
	}, []);

	return (
		<div className="cardGrid">
			{data.length
				? data
						.filter((obj) => obj.userId === value.value)
						.map((obj, index) => {
							return (
								<Card sx={{ maxWidth: 400 }} key={index} className="card">
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
										<Typography fontStyle="bold">{obj.price}</Typography>
									</CardContent>
									<CardActions>
										<Button size="small">
											<a href={obj.url} target="_blank" rel="noreferrer">
												View / Buy
											</a>
										</Button>
									</CardActions>
								</Card>
							);
						})
				: null}
		</div>
	);
};

export default CardGrid;
