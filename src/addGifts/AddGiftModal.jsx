import {
	Box,
	Button,
	IconButton,
	Modal,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material";
import ChildModal from "./GiftData";
import * as React from "react";
import { AddCircle } from "@mui/icons-material";

const style = {
	position: "absolute",
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
	paddingTop: "1%",
	minHeight: "20%",
	justifyContent: "space-around",
};

export default function AddGiftModal(props) {
	const [openParent, setOpenParent] = React.useState(false);
	const [giftUrl, setGiftUrl] = React.useState("");

	const handleClose = () => {
		setGiftUrl("");
		setOpenParent(false);
	};
	const handleOpenParent = () => {
		setOpenParent(true);
	};

	const handleChange = (newVal) => {
		setGiftUrl(newVal);
		console.log(giftUrl);
	};

	return (
		<React.Fragment>
			<IconButton size="large" onClick={handleOpenParent}>
				<Tooltip title="Add a Gift">
					<AddCircle color="accent" fontSize="large" />
				</Tooltip>
			</IconButton>
			<Modal
				open={openParent}
				onClose={handleClose}
				aria-labelledby="parent-modal-title"
				aria-describedby="parent-modal-description"
			>
				<Box sx={{ ...style, width: 400 }}>
					<Typography variant="h5">Add a Gift To Your List</Typography>
					<TextField
						variant="outlined"
						placeholder="Gift URL"
						onChange={(e) => handleChange(e.target.value)}
					/>
					<ChildModal
						giftUrl={giftUrl}
						onClose={handleClose}
						setOpenParent={setOpenParent}
					/>
				</Box>
			</Modal>
		</React.Fragment>
	);
}
