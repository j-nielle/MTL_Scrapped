<x-app-layout>
    <script>
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
    </script>

    <table id="sse-data">
    </table>

    {{-- 
    <div class="p-4 text-gray-900 dark:text-gray-100">
        <div class="flex flex-row">
            <div class="w-full p-4 mb-4">
                <div class="max-w-screen-md md:max-w-screen-sm">
                    <table class="w-auto table-fixed sm:table-auto shadow-lg">
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
    
                        <tbody class="bg-white">
                            @forelse($requests as $request)
                                <tr class="text-gray-900 border-b border-gray-300">
                                    <td class="px-4 py-2">
                                        {{ $request->contactNum }}
                                    </td>
                                    <td class="px-4 py-2 font-bold">
                                        {{ $request->requestType }}
                                    </td>
                                    <td>
                                        <!-- add show/hide button here -->
                                    </td>   
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="3" class="px-4 py-2 text-center">
                                        No requests found.
                                    </td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
    
                    <!-- add pagination here -->
                </div>
            </div>
        </div>
    </div>     
    --}} 
</x-app-layout>
