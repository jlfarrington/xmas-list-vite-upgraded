import React from "react";
import {
	Button,
	Card,
	CardContent,
	CardMedia,
	CardActions,
	Typography,
} from "@mui/material";
import "../styles/App.css";
import { data } from "../Data";

const CardGrid = (value) => {
	return (
		<div className="cardGrid">
			{data
				.filter((obj) => obj.owner === value.value)
				.map((obj, index) => {
					return (
						<Card sx={{ maxWidth: 400 }} key={index} className="card">
							<a href={obj.link} target="_blank" rel="noreferrer">
								<CardMedia
									component="img"
									image={obj.image}
									alt={obj.name}
									height="300"
								/>
							</a>
							<CardContent>
								<Typography variant="h6">{obj.name}</Typography>
								<Typography>{obj.notes}</Typography>
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
				})}
		</div>
	);
};

export default CardGrid;
