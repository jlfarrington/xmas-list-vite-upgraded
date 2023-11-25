import {
	Card,
	List,
	ListItem,
	ListItemButton,
	Tooltip,
	Typography,
} from "@mui/material";
import * as React from "react";

const style = {
	bgcolor: "background.paper",
	borderRadius: "4px",
	boxShadow: 90,
	pt: 4,
	px: 8,
	pb: 6,
	display: "flex",
	flexDirection: "column",
	padding: "2% 4% 2% 4%",
	marginTop: "15%",
};

const titleStyle = {
	paddingBottom: "2%",
};

const Auth = (props) => {
	const { userData, ...other } = props;
	return (
		<Card className="auth-card" style={style}>
			<Typography variant="h4" align="center" style={titleStyle}>
				Welcome! Who are you?
			</Typography>
			<List>
				{props.userData
					? props.userData.map((user, index) => {
							return (
								<ListItemButton
									key={index}
									style={{ display: "flex", justifyContent: "center" }}
									onClick={() => props.updateToken(user.id)}
								>
									<Typography variant="button" key={index}>
										{user.name}
									</Typography>
								</ListItemButton>
							);
					  })
					: null}
			</List>
		</Card>
	);
};

export default Auth;
