// Load the data from the server using Server-Sent Events
document.addEventListener('DOMContentLoaded', function () {
    const eventSource = new EventSource('/sse-request');
    const container = document.getElementById('notifs-container');
    const body = document.getElementById('notifs-tbody');
    const maxRows = 10; // Set the maximum number of rows to display

    let renderTimeout;

    eventSource.onmessage = function (event) {
        const responseData = JSON.parse(event.data);
        console.log(responseData);

        if (responseData.length === 0) {
            return; // Skip the update if responseData is empty
        }

        if (renderTimeout) {
            clearTimeout(renderTimeout); // Clear previous timeout to limit rendering frequency
        }

        renderTimeout = setTimeout(() => {
            const rowsHtml = responseData
                .slice(0, maxRows) // Limit the number of rows to maxRows
                .map((item) => `
                    <tr class="text-gray-900 border-b border-gray-300">
                        <td class="px-4 py-2">${item.contactNum}</td>
                        <td class="px-4 py-2">${item.requestType}</td>
                    </tr>
                `)
                .join('');

            body.innerHTML = rowsHtml;

            // Add a scrollbar if the number of rows exceeds the maximum limit
            if (responseData.length > maxRows) {
                container.style.overflowY = "scroll";
            } else {
                container.style.overflowY = "auto";
            }
        }, 1000); // Set a delay of 1000 milliseconds before rendering the updated data
    };
});