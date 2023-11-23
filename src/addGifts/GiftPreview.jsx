import {
	Button,
	FormControl,
	Input,
	TextField,
	Typography,
} from "@mui/material";
import * as React from "react";
import { useEffect } from "react";

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
		console.log(`Adding the gift to the database: `, giftObjToSend.url);
		const infoResponse = await fetch("http://localhost:8080/gift", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				gift: giftObjToSend,
				user: userObjToSend,
			}),
		});
		const giftSuccessJson = await infoResponse.json();
		console.log(giftSuccessJson);
		resetGiftInfoAndCloseModal();
	};

	return (
		<>
			{giftShortUrl && !showSuccess ? (
				<React.Fragment>
					<Typography>
						Use the form below to confirm or override your gift info.
					</Typography>
					<FormControl>
						<TextField
							helperText="Gift Title"
							variant="outlined"
							name="gift-title"
							value={giftTitle}
							onChange={(e) => setGiftTitle(e.target.value)}
						/>
						<img src={giftImage} width="400px" />
						<TextField
							helperText="Gift Price"
							variant="outlined"
							name="gift-price"
							value={giftPrice}
							onChange={(e) => setGiftPrice(e.target.value)}
						/>
						<TextField
							helperText="Gift Link"
							variant="outlined"
							name="gift-short-url"
							value={giftShortUrl}
							onChange={(e) => setGiftShortUrl(e.target.value)}
						/>
						<Button onClick={() => sendGift()}>Add to Your List</Button>
					</FormControl>
				</React.Fragment>
			) : null}
			{showSuccess ? <Typography>success!</Typography> : null}
		</>
	);
}
