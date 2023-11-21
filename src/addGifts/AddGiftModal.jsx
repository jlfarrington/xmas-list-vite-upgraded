import * as React from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
import ChildModal from "./GiftData";

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
	paddingTop: "4%",
};

export default function AddGiftModal(props) {
	const [openParent, setOpenParent] = React.useState(false);
	const [giftUrl, setGiftUrl] = React.useState("");

	const handleClose = () => {
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
		<div>
			<Button onClick={handleOpenParent} variant="contained">
				Add Gifts To My List
			</Button>
			<Modal
				open={openParent}
				onClose={handleClose}
				aria-labelledby="parent-modal-title"
				aria-describedby="parent-modal-description"
			>
				<Box sx={{ ...style, width: 400 }}>
					<TextField
						variant="filled"
						placeholder="Gift URL"
						onChange={(e) => handleChange(e.target.value)}
					/>
					<ChildModal giftUrl={giftUrl} />
				</Box>
			</Modal>
		</div>
	);
}