document.addEventListener('DOMContentLoaded', function () {
    const tbody = document.getElementById("notifs-tbody");
    const eventSource = new EventSource("/sse-request");
    let renderTimeout;
    const maxRows = 10;

    eventSource.onmessage = function (event) {
        const eventData = JSON.parse(event.data);

        if (eventData.length === 0) {
            return; // Skip the update if eventData is empty
        }
        console.log(eventData);
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
        }, 1000); // Set a delay of 1000 milliseconds before rendering the updated data
    };

    function getCurrentDateTime() {
        const currentDate = new Date();
        const timezoneOffset = 8 * 60; // GMT+08:00 in minutes
        currentDate.setMinutes(currentDate.getMinutes() + timezoneOffset);
        const formattedDateTime = currentDate.toISOString().replace('T', ' ').slice(0, 19);
        return formattedDateTime;
    }
});
