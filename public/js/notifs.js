var eventSource = new EventSource('/sse-request');
eventSource.onmessage = function (event) {
    var responseData = JSON.parse(event.data);

    if (responseData.length === 0) {
        return; // Skip the update if responseData is empty
    }

    responseData.forEach(function (item, index) {
        const rowIndex = index + 1; // Add 1 to the index to match the row index (1-based) in the table

        const tableRow = document.getElementById(`sse-row-${rowIndex}`);

        if (tableRow) {
            // Update the existing row with the new data
            tableRow.innerHTML = `
                        <td>${item.contactNum}</td>
                        <td>${item.requestType}</td>
                    `;
        } else {
            // Append a new row with the received data
            const tableBody = document.getElementById('sse-data');
            const newRow = document.createElement('tr');
            newRow.id = `sse-row-${rowIndex}`;

            newRow.innerHTML = `
                        <td>${item.contactNum}</td>
                        <td>${item.requestType}</td>
                    `;
            tableBody.appendChild(newRow);
        }
    });
};