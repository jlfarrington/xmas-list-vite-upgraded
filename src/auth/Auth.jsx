import { Card, List, ListItem, Tooltip, Typography } from "@mui/material";
import * as React from "react";

const style = {
	position: "relative",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	borderRadius: "3px",
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3,
	display: "flex",
	flexDirection: "column",
	paddingTop: "4%",
};

const Auth = (props) => {
	const { userData, ...other } = props;
	return (
		<Card className="auth-card" style={style}>
			<Tooltip title="Note: Choose Parker to add gifts to Parker's List, and yourself to add gifts to your own list">
				<Typography>Who are you?</Typography>
			</Tooltip>
			<br></br>
			<List>
				{props.userData
					? props.userData.map((user, index) => {
							return (
								<ListItem
									key={index}
									divider
									style={{ display: "flex", justifyContent: "center" }}
									onClick={() => props.updateToken(user.id)}
								>
									<Typography key={index}>{user.name}</Typography>
								</ListItem>
							);
					  })
					: null}
			</List>
		</Card>
	);
};

export default Auth;
