import { readJSON, writeJSON } from "../utils/common.js";

const JSONPath = "C:/Users/laska/OneDrive/Documents/Coding/JavaScript/Rokomari-Stat-Dashboard/Data/orderIds.json";

export const getOrderIds = async (page) => {
    const orderIds = await readJSON(JSONPath);
    if (orderIds.orderIds?.length > 0) {
        console.log("📁 Read from saved file");
        return orderIds.orderIds;
    }

    const orderPageURL = "https://www.rokomari.com/my-section/orders";

    console.log("🔍 Fetching order IDs from website...");
    await page.goto(orderPageURL);

    const data = [];

    const pagerLinks = page.locator("a.pager-link");
    const totalPages = await pagerLinks.count();

    let lastPage = 1;
    if (totalPages > 0) {
        const index = Math.max(0, totalPages - 2);
        const lastPageText = await pagerLinks.nth(index).innerText();
        const parsed = parseInt(lastPageText.trim(), 10);
        if (!isNaN(parsed)) lastPage = parsed;
    }

    // const lastPageText = await pagerLinks.nth(totalPages - 2).innerText();
    // const lastPage = parseInt(lastPageText.trim(), 10);
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

