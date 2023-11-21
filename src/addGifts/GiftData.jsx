import * as React from "react";
import { Box, Button, CircularProgress, Modal, TextField } from "@mui/material";
import { launchAndReturnInfo } from "../utils/linkInfoTool";

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

export default function ChildModal(props) {
	const [openChild, setOpenChild] = React.useState(false);
	const [loading, setLoading] = React.useState(false);

	const handleOpen = () => {
		setOpenChild(true);
		generateGiftInfo(props.giftUrl);
	};

	const handleClose = () => {
		setOpenChild(false);
	};

	const generateGiftInfo = async (url) => {
		setLoading(true);
		await launchAndReturnInfo(url);
		setTimeout(() => {
			setLoading(false);
		}, 5000);
	};

	return (
		<React.Fragment>
			<Button onClick={handleOpen}>Generate Gift Info</Button>
			<Modal
				open={openChild}
				onClose={handleClose}
				aria-labelledby="child-modal-title"
				aria-describedby="child-modal-description"
			>
				<Box sx={{ ...style, width: 200 }}>
					<h2 id="child-modal-title">Gift Preview</h2>
					{loading ? <CircularProgress color="primary" /> : null}
					<p id="child-modal-description">{props.giftUrl}</p>
					<Button onClick={handleClose}>Add to list</Button>
				</Box>
			</Modal>
		</React.Fragment>
	);
}
