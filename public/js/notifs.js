document.addEventListener('DOMContentLoaded', function () {
    const tbody = document.getElementById("notifs-tbody");
    const eventSource = new EventSource("/sse-request");
    let renderTimeout;

    let previousCreatedAt; // Variable to store the previous eventData.created_at value

    eventSource.onmessage = function (event) {
        const eventData = JSON.parse(event.data);
        const maxRows = eventData.length;

        if (eventData.length === 0) {
            return; // Skip the update if eventData is empty
        }

        const latestCreatedAt = eventData[0].created_at;

        if (latestCreatedAt === previousCreatedAt) {
            console.log('same timestamp');
            return; // Skip the update if the latest created_at is the same as the previous one
        }else {
            previousCreatedAt = latestCreatedAt;
            console.log('new timestamp');
        }

        clearTimeout(renderTimeout); // Clear previous timeout to limit rendering frequency

        renderTimeout = setTimeout(() => {
            const rowsHtml = eventData
                .slice(0, maxRows) // Limit the number of rows to maxRows
                .map((item) => `
        <tr class="text-gray-900 border-b border-gray-300">
          <td class="px-4 py-2">${item.Phone}</td>
          <td class="px-4 py-2">${item.RequestType}</td>
        </tr>
      `)
                .join('');

            tbody.innerHTML = rowsHtml;
        }, 100); // Set a delay of 1000 milliseconds before rendering the updated data
    };
});
