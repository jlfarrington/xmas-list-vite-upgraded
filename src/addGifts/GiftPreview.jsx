import { CheckCircle } from "@mui/icons-material";
import {
	Button,
	Container,
	FormControl,
	Input,
	TextField,
	Typography,
} from "@mui/material";
import * as React from "react";
import { useEffect } from "react";

const style = {
	display: "flex",
	flexDirection: "column",
	gap: "20px",
	marginTop: "2%",
	marginBottom: "2%",
};

const formStyle = {
	display: "flex",
	flexDirection: "column",
	gap: "10px",
};

const successStyle = {
	display: "flex",
	flexDirection: "column",
	paddingTop: "2%",
	justifyContent: "center",
	minHeight: "460px",
	alignItems: "center",
	gap: "30px",
};

export default function GiftPreview(props) {
	const [giftPrice, setGiftPrice] = React.useState();
	const [giftImage, setGiftImage] = React.useState();
	const [giftTitle, setGiftTitle] = React.useState();
	const [giftShortUrl, setGiftShortUrl] = React.useState();
	const [giftNotes, setGiftNotes] = React.useState();
	const [showSuccess, setShowSuccess] = React.useState();

	useEffect(() => {
		setGiftInfoDetail(props.giftInfo);
	}, [showSuccess]);

	const setGiftInfoDetail = (giftInfoObj) => {
		setGiftPrice(giftInfoObj.price);
		setGiftTitle(giftInfoObj.title);
		setGiftImage(giftInfoObj.image);
		setGiftShortUrl(giftInfoObj.url);
	};

	const successAndCloseModal = () => {
		setShowSuccess(true);
		setTimeout(() => {
			props.setGiftInfo(null);
			props.setOpenChild(false);
			props.setOpenParent(false);
		}, 2000);
	};

	const resetGiftInfoAndCloseModal = () => {
		setGiftPrice("");
		setGiftTitle("");
		setGiftImage("");
		setGiftShortUrl("");
		setGiftNotes("");
		successAndCloseModal();
	};

	const sendGift = async () => {
		const giftObjToSend = {
			name: giftTitle,
			imageLink: giftImage,
			description: giftNotes,
			price: giftPrice,
			url: giftShortUrl,
		};
		const userObjToSend = {
			id: localStorage.getItem("token"),
		};
		const infoResponse = await fetch("http://localhost:8080/gift", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				gift: giftObjToSend,
				user: userObjToSend,
			}),
		});
		const giftSuccessJson = await infoResponse.json();
		resetGiftInfoAndCloseModal();
	};

	return (
		<>
			{giftShortUrl && !showSuccess ? (
				<Container maxWidt="xl" sx={style}>
					<Typography variant="subtitle1">
						Use the form below to confirm or override your gift info.
					</Typography>
					<FormControl sx={formStyle}>
						<TextField
							helperText="Gift Title"
							variant="outlined"
							color="accent"
							name="gift-title"
							value={giftTitle}
							onChange={(e) => setGiftTitle(e.target.value)}
						/>
						<img src={giftImage} width="400px" />
						<TextField
							helperText="Gift Price"
							variant="outlined"
							color="accent"
							name="gift-price"
							value={giftPrice}
							onChange={(e) => setGiftPrice(e.target.value)}
						/>
						<TextField
							helperText="Gift Link"
							variant="outlined"
							color="accent"
							name="gift-short-url"
							value={giftShortUrl}
							onChange={(e) => setGiftShortUrl(e.target.value)}
						/>
						<Button variant="contained" onClick={() => sendGift()}>
							Add to Your List
						</Button>
					</FormControl>
				</Container>
			) : null}
			{showSuccess ? (
				<Container maxWidth="xl" sx={successStyle}>
					<CheckCircle color="success" fontSize="large" />
					<Typography variant="subtitle1">
						Gift has been successfully added to your list!
					</Typography>
				</Container>
			) : null}
		</>
	);
}
