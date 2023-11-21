import "../styles/App.css";
import { Card, List, ListItem, Tooltip, Typography } from "@mui/material";

const Auth = (props) => {
	return (
		<Card className="auth-card" class="auth-card">
			<Tooltip title="Note: Choose Parker to add gifts to Parker's List, and yourself to add gifts to your own list">
				<Typography>Who are you?</Typography>
			</Tooltip>
			<br></br>
			<List>
				{props.users
					? props.users.map((user) => {
							return (
								<ListItem
									divider
									button
									style={{ display: "flex", justifyContent: "center" }}
									onClick={() => props.updateToken(user)}
									key={user.id}
								>
									{user}
								</ListItem>
							);
					  })
					: null}
			</List>
		</Card>
	);
};

export default Auth;
