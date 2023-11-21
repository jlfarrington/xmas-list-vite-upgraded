import * as playwright from "playwright";
//KNOWN WEBSITES THIS DOES NOT WORK ON:
// crate & barrel

export async function launchAndReturnInfo(url) {
	const browser = await playwright.chromium.launch({
		userAgent:
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
		headless: true, // setting this to true will not run the UI
	});

	const pageInfo = {};
	const context = await browser.newContext({
		userAgent:
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
	});

	const page = await browser.newPage(context);
	await page.goto(url);
	await page.waitForTimeout(2000);
	pageInfo.title = await page.title();

	try {
		const canonURL = await page.locator('link[rel="canonical"]');
		pageInfo.url = await canonURL.getAttribute("href");
	} catch (e) {
		console.log("no canonical url found, using full URL");
	}
	if (!pageInfo.url) {
		pageInfo.url = page.url();
	}

	if (url.includes("amazon")) {
		const img = await page.locator("#landingImage");
		pageInfo.image = await img.getAttribute("src");
	} else {
		try {
			const img = await page.locator('meta[property="og:image"]');
			pageInfo.image = await img.getAttribute("content");
		} catch (e) {
			console.log("no image found");
		}
	}

	let price;

	if (url.includes("amazon")) {
		price = await page
			.locator(
				'//*[@id="corePrice_feature_div"]/div/div/div/div/span[1]/span[1][1]'
			)
			.first()
			.innerText();
		pageInfo.price = price;
	} else {
		const currencyRegEx =
			/(?=.*\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|0)?(\.\d{1,2})?$/;
		const currencyRegEx2 = /^\$?(([1-9]\d{0,2}(,\d{3})*)|0)?\.\d{1,2}/;
		try {
			price = await page.getByText(currencyRegEx2).first();
		} catch (e) {
			console.log("no price found");
		}

		const tempPriceText = await price.innerText();
		if (tempPriceText.length < 4) {
			try {
				price = await page.getByText(currencyRegEx).first();
				if (price) {
					pageInfo.price = await price.innerText();
				}
			} catch (e) {
				console.log("no valid price found, please enter manually");
			}
		} else {
			pageInfo.price = tempPriceText;
		}
	}

	console.log(`PageInfo Obj:
    pageInfo title: ${pageInfo.title}
    pageInfo url: ${pageInfo.url}
    pageInfo image: ${pageInfo.image}
    pageInfo price: ${pageInfo.price}`);

	await browser.close();
	return pageInfo;
}
