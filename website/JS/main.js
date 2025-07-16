const fetchJSONData = async (filePath) => {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
        return await response.json();
    } catch (err) {
        console.error("❌ Error loading JSON:", err);
        return [];
    }
};

const parsePrice = (str) => {
    const match = str?.match(/\d+/g);
    return match ? parseInt(match.join('')) : 0;
};

const renderSummary = (orders) => {
    let totalOrders = orders.length;
    let totalBooks = 0;
    let totalSpent = 0;

    for (const order of orders) {
        totalBooks += order.booksInfo.length;
        totalSpent += (parsePrice(order["Sub-Total:"]) + parsePrice(order["Shipping:"]));
    }

    const summary = `
        <h2>📊 Summary</h2>
        <p><strong>Total Orders:</strong> ${totalOrders}</p>
        <p><strong>Total Books:</strong> ${totalBooks}</p>
        <p><strong>Total Spent:</strong> ৳${totalSpent}</p>
      `;

    document.getElementById('summary').innerHTML = summary;
};

const renderOrders = (orders) => {
    const container = document.getElementById('orderList');
    container.innerHTML = ''; // clear loading text

    for (const order of orders) {
        const books = order.booksInfo.map(book =>
            `<li>${book.bookName} - ${book.price} (${book.quantity})</li>`
        ).join('');

        const card = document.createElement('div');
        card.className = 'order-card';
        card.innerHTML = `
          <h3><a href="${order.orderURL}" target="_blank">Order #${order.orderId}</a></h3>
          <ul>${books}</ul>
          <p><strong>Subtotal:</strong> ${order["Sub-Total:"] || "N/A"}</p>
          <p><strong>Shipping:</strong> ${order["Shipping:"] || "N/A"}</p>
          <p><strong>Number of Books:</strong> ${order.booksInfo.length}</p>
        `;
        container.appendChild(card);
    }
};

fetchJSONData("../../Data/orderInfo.json").then((orders) => {
    if (orders.length === 0) {
        document.getElementById("summary").innerText = "No data found.";
        return;
    }
    renderSummary(orders);
    renderOrders(orders);
});