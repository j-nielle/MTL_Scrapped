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
            var fragment = document.createDocumentFragment();
            var rowsHtml = '';
    
            responseData.forEach(function (item) {
                var row = document.createElement('tr');
                row.className = 'text-gray-900 border-b border-gray-300';
                
                var contactNumCell = document.createElement('td');
                contactNumCell.className = 'px-4 py-2';
                contactNumCell.textContent = item.contactNum;
                
                var requestTypeCell = document.createElement('td');
                requestTypeCell.className = 'px-4 py-2';
                requestTypeCell.textContent = item.requestType;
                
                row.appendChild(contactNumCell);
                row.appendChild(requestTypeCell);
                fragment.appendChild(row);
            });
    
            table.innerHTML = ''; // Clear the existing table
            table.appendChild(fragment); // Append all rows at once
    
            var tableHtml = `
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
            `;
    
            table.insertAdjacentHTML('afterbegin', tableHtml); // Prepend the table header
    
        }, 1000); // Set a delay of 100 milliseconds before rendering the updated data
    };    
});