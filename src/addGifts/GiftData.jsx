import * as React from "react";
import { Box, Button, CircularProgress, Modal } from "@mui/material";
import GiftPreview from "./GiftPreview";

const style = {
	position: "relative",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	bgcolor: "background.paper",
	borderRadius: "3px",
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3,
	display: "flex",
	flexDirection: "column",
};

export default function ChildModal(props) {
	const [openChild, setOpenChild] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [giftInfo, setGiftInfo] = React.useState();

	const fetchGiftInfo = async (giftUrl) => {
		console.log(`fetching gift info for the following URL: `, giftUrl);
		const infoResponse = await fetch("http://localhost:8080/info", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				url: giftUrl,
			}),
		});
		const infoJson = await infoResponse.json();
		console.log(infoJson);
		setGiftInfo(infoJson.linkInfo);
		// const infoNamesArr = infoJson.map((user) => user.name);
		// console.log(infoNamesArr);
		// setinfo(infoNamesArr);
	};

	const handleOpen = () => {
		setOpenChild(true);
		generateGiftInfo(props.giftUrl);
	};

	const handleClose = () => {
		setOpenChild(false);
	};

	const generateGiftInfo = async (url) => {
		setLoading(true);
		// make call to get gift info
		await fetchGiftInfo(props.giftUrl);

		setLoading(false);
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
				<Box sx={{ ...style, maxWidth: 1000 }}>
					<h2 id="child-modal-title">Gift Preview</h2>
					{loading ? <CircularProgress color="primary" /> : null}
					{!loading && giftInfo && giftInfo.title !== "" ? (
						<GiftPreview giftInfo={giftInfo} />
					) : null}
				</Box>
			</Modal>
		</React.Fragment>
	);
}
