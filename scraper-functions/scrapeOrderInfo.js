import path from "path";
import { writeJSON } from "../utils/common.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const JSONPath = path.join(__dirname, "../Data/", "orderInfo.json")

const getOrderInfos = async (page, orderIDs, limit = 10) => {
    const result = [];
    for (let index = 0; index < orderIDs.length; index++) {
        const data = await extractOrderInfo(page, orderIDs[index]);
        result.push(data);
    }
    await writeJSON(JSONPath, result);
    return result;
};

const extractOrderInfo = async (page, orderId) => {
    const URL = `https://www.rokomari.com/ordertrack?orderId=${orderId}`;
    const orderInfo = {
        orderId,
        orderURL: URL,
        booksInfo: []
    };

    try {
        await page.goto(URL);
    } catch (err) {
        console.error(`❌ Failed to load ${URL}`, err);
        orderInfo.error = "Page load failed";
        return orderInfo;
    }

    const bookNameLoc = await page.locator("div.order-summary__item a.product-title").all();
    const bookPriceLoc = await page.locator(".order-summary__item p.total-price").all();
    const quantityLoc = await page.locator("div.order-summary__item p.product-qty").all();
    const labelLoc = await page.locator("div.payable-info__label p").all();
    const valueLoc = await page.locator("div.payable-info__value p").all();

    const len = Math.min(bookNameLoc.length, bookPriceLoc.length, quantityLoc.length);
    for (let i = 0; i < len; i++) {
        const name = await bookNameLoc[i].innerText();
        const price = await bookPriceLoc[i].innerText();
        const qty = await quantityLoc[i].innerText();
        orderInfo.booksInfo.push({ bookName: name, price, quantity: qty });
    }

    const metaLen = Math.min(labelLoc.length, valueLoc.length);
    for (let i = 0; i < metaLen; i++) {
        const label = await labelLoc[i].innerText();
        const value = await valueLoc[i].innerText();
        orderInfo[label] = value;
    }

    return orderInfo;
};

export { getOrderInfos };
