document.addEventListener('DOMContentLoaded', function () {
    var eventSource = new EventSource('/sse-request');
    var table = document.getElementById('sse-data');
    var renderTimeout;

    eventSource.onmessage = function (event) {
        var responseData = JSON.parse(event.data);

        if (responseData.length === 0) {
            return; // Skip the update if responseData is empty
        }

        if (renderTimeout) {
            clearTimeout(renderTimeout); // Clear previous timeout to limit rendering frequency
        }

        renderTimeout = setTimeout(function () {
            var rowsHtml = responseData.map(function (item) {
                return `<tr class="text-gray-900 border-b border-gray-300">
                            <td class="px-4 py-2">${item.contactNum}</td>
                            <td class="px-4 py-2">${item.requestType}</td>
                        </tr>`;
            }).join('');

            table.innerHTML = `
                <thead class="font-bold leading-6 tracking-widest text-left text-white bg-gray-800 border-b border-gray-200">
                    <tr>
                        <th class="p-4">
                            Contact Number
                        </th>
                        <th class="p-4">
                            Request Type
                        </th>
                        <th class="p-4">
                            Show/Hide
                        </th>
                    </tr>
                </thead>
                <tbody">${rowsHtml}</tbody>
            `;
        }, 100); // Set a delay of 100 milliseconds before rendering the updated data
    };
});