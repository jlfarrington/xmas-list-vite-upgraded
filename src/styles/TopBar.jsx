import { AppBar, IconButton, Tooltip, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import "./App.css";

const TopBar = (props) => {
	return (
		<AppBar position="sticky" className="topBar" color="success">
			<Typography variant="h4" className="appTitle">
				Family Christmas List
			</Typography>
			<Tooltip title="Logout">
				<IconButton variant="contained">
					<LogoutIcon color="secondary" onClick={() => props.clickLogout()} />
				</IconButton>
			</Tooltip>
		</AppBar>
	);
};

export default TopBar;
