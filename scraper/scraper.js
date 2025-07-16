import { chromium } from "@playwright/test";
import globalSetup from "../global-setup.js";
import { getOrderIds } from "../scraper-functions/scrapeIds.js";
import { getOrderInfos } from "../scraper-functions/scrapeOrderInfo.js";

const email = "laskar90muhtadi@gmail.com";
const password = "foundation90";

const scraper = async () => {
    await globalSetup(email, password);
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    const ids = await getOrderIds(page);
    const data = await getOrderInfos(page, ids);

    console.log(JSON.stringify(data, null, 2));
    if(!data) {
        console.log("Failed to parse the data");
        return false;
    }
    console.log("Successfully parsed you book stats");
    return true;
}

scraper().then(res => {
    console.log(res);
})