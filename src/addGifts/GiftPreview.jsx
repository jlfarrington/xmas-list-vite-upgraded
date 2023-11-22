import * as React from "react";

export default function GiftPreview(props) {
	const [loading, setLoading] = React.useState(false);
	const [giftPrice, setGiftPrice] = React.useState();
	const [giftImage, setGiftImage] = React.useState();
	const [giftTitle, setGiftTitle] = React.useState();
	const [giftShortUrl, setGiftShortUrl] = React.useState();

	const setGiftInfo = (giftInfoObj) => {
		setGiftPrice(giftInfoObj.price);
		setGiftTitle(giftInfoObj.title);
		setGiftImage(giftInfoObj.image);
		setGiftShortUrl(giftInfoObj.url);
	};
	return <span>this is the gift preview beech!</span>;
}
