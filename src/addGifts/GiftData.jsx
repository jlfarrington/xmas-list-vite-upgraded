import * as React from "react";
import {
	Box,
	Button,
	CircularProgress,
	Container,
	Icon,
	Modal,
	Typography,
} from "@mui/material";
import GiftPreview from "./GiftPreview";
import { ErrorOutline } from "@mui/icons-material";

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
	paddingTop: "2%",
	minHeight: "40%",
};

const containerStyle = {
	display: "flex",
	flexDirection: "column",
	paddingTop: "2%",
	justifyContent: "center",
	minHeight: "460px",
	alignItems: "center",
	gap: "30px",
};

export default function ChildModal(props) {
	const [openChild, setOpenChild] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [giftInfo, setGiftInfo] = React.useState();
	const [error, setError] = React.useState(false);

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
		if (infoJson.message) {
			setError(true);
		}
		setGiftInfo(infoJson.linkInfo);
	};

	const handleOpen = () => {
		setOpenChild(true);
		generateGiftInfo(props.giftUrl);
	};

	const handleClose = () => {
		setError(false);
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
			<Button variant="contained" onClick={handleOpen}>
				Generate Gift Info
			</Button>
			<Modal
				open={openChild}
				onClose={handleClose}
				aria-labelledby="child-modal-title"
				aria-describedby="child-modal-description"
			>
				<Box sx={{ ...style, maxWidth: 1000 }}>
					<Typography variant="h5" id="child-modal-title">
						Gift Preview
					</Typography>

					{loading ? (
						<Container size="xl" sx={containerStyle}>
							<CircularProgress color="accent" />
							<Typography variant="subtitle1">
								Be patient! Gift info retrieval can take up to 30 seconds.
							</Typography>{" "}
						</Container>
					) : error ? (
						<Container size="xl" sx={containerStyle}>
							<ErrorOutline color="error" fontSize="large" />
							<Typography variant="subtitle1">
								There was an error fetching gift info. Try another link!
							</Typography>
							<Button
								variant="contained"
								onClick={() => handleClose()}
								color="error"
							>
								Go Back
							</Button>
						</Container>
					) : null}

					{!loading && giftInfo && giftInfo.url !== "" ? (
						<GiftPreview
							giftInfo={giftInfo}
							onClose={handleClose}
							setGiftInfo={setGiftInfo}
							setOpenChild={setOpenChild}
							setOpenParent={props.setOpenParent}
						/>
					) : null}
				</Box>
			</Modal>
		</React.Fragment>
	);
}
