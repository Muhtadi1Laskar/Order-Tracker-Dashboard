import { readJSON, writeJSON } from "../utils/common.js";
// import orderIds from "../Data/orderIds.json" assert { type: 'json' };

const JSONPath = "C:/Users/laska/OneDrive/Documents/Coding/JavaScript/Rokomari-Stat-Dashboard/Data/orderIds.json";

export const getOrderIds = async (page) => {
    const orderIds = await readJSON(JSONPath);
    if (orderIds.orderIds?.length > 0) {
        console.log("📁 Read from saved file");
        return orderIds.orderIds;
    }

    const orderPageURL = "https://www.rokomari.com/my-section/orders";

    await page.goto(orderPageURL);

    const data = [];

    const pagerLinks = page.locator("a.pager-link");
    const totalPages = await pagerLinks.count();
    const lastPageText = await pagerLinks.nth(totalPages - 2).innerText();
    const lastPage = parseInt(lastPageText.trim(), 10);
    const IDLocator = page.locator("div.my-order-card__meta p em:nth-child(1)");

    for (let p = 1; p <= lastPage; p++) {
        await page.goto(`${orderPageURL}?page=${p}`);

        const ids = await IDLocator.allTextContents();

        data.push(...ids);
    }

    if (data.length == 0) {
        console.warn("❌ No order IDs found");
        return [];
    }

    await writeJSON(JSONPath, { orderIds: data });
    return data;
}

