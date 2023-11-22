import PropTypes from "prop-types";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import CardGrid from "./CardGrid";
import AddGiftModal from "../addGifts/AddGiftModal";
import * as React from "react";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

const BasicTabs = (props) => {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	//const usersArr = props.users;
	const usersData = props.userData;
	const token = localStorage.getItem("token");

	return (
		<Box sx={{ width: "100%" }}>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs value={value} onChange={handleChange} variant="fullWidth">
					{usersData.map((user, index) => {
						if (user.id == token) {
							return (
								<Tab label={"My List"} {...a11yProps(index)} key={index} />
							);
						} else {
							return (
								<Tab
									label={`${user.name}'s List`}
									{...a11yProps(index)}
									key={index}
								/>
							);
						}
					})}
				</Tabs>
			</Box>
			{usersData.map((user, index) => {
				return (
					<TabPanel value={value} index={index} key={index}>
						{user.id == token ? (
							<>
								<AddGiftModal />
							</>
						) : null}
						{user.name}, UserId: {user.id}
						<CardGrid value={index} />
					</TabPanel>
				);
			})}
		</Box>
	);
};

export default BasicTabs;
