function handleSSEUpdates() {
    const tbody = document.getElementById("notifs-tbody");
    let previousCreatedAt;
    let renderTimeout;

    function renderData(eventData) {
        const maxRows = eventData.length;

        const rowsHtml = eventData
            .slice(0, maxRows)
            .map((item) => `
                <tr class="text-gray-900 border-b border-gray-300">
                    <td class="px-4 py-2">${item.Phone}</td>
                    <td class="px-4 py-2">${item.RequestType}</td>
                </tr>
            `)
            .join('');

        tbody.innerHTML = rowsHtml;
    }

    function handleSSEMessage(event) {
        const eventData = JSON.parse(event.data);

        if (eventData.length === 0) {
            return;
        }

        const latestCreatedAt = eventData[0].created_at;

        if (latestCreatedAt === previousCreatedAt) {
            console.log('same timestamp');
            return;
        } else {
            previousCreatedAt = latestCreatedAt;
            console.log('new timestamp');
        }

        clearTimeout(renderTimeout);
        renderTimeout = setTimeout(() => {
            renderData(eventData);
        }, 100);
    }
    const eventSource = new EventSource("/sse-request");
    eventSource.onmessage = handleSSEMessage;
}

document.addEventListener('DOMContentLoaded', handleSSEUpdates);
