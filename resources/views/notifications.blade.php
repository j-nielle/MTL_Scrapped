<x-app-layout>
    <div class="w-full p-7" id="notifs-container">
        <input type="date" id="notifs-datepicker" class="mb-2" value="{{ date('Y-m-d') }}"
            onchange="handleDateFilter()">
        <div class="overflow-auto max-h-96 w-fit drop-shadow-xl">
            <table class="bg-white table-fixed sm:table-auto" id="notifs-table">
                <thead
                    class="sticky top-0 font-bold leading-6 tracking-widest text-left text-white bg-indigo-900 border-b border-indigo-200">
                    <tr>
                        <th class="p-4">Contact Number</th>
                        <th class="p-4">Request Type</th>
                        <th class="p-4">Request Created</th>
                        <th class="p-4">Show/Hide</th>
                    </tr>
                </thead>
                <tbody id="notifs-tbody">
                    <!-- js code magic here -->
                </tbody>
            </table>
        </div>
    </div>
</x-app-layout>
