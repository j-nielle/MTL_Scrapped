document.addEventListener('DOMContentLoaded', function () {
    var eventSource = new EventSource('/sse-request');
    var tableBody = document.getElementById('sse-data');
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
                return `<tr><td>${item.contactNum}</td><td>${item.requestType}</td></tr>`;
            }).join('');

            tableBody.innerHTML = rowsHtml;
        }, 100); // Set a delay of 100 milliseconds before rendering the updated data
    };
});
