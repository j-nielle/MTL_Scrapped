<x-app-layout>
    @if(Route::is('notifications'))
    <script src="{{ asset('js/requests.js') }}"></script>
    <div class="w-full p-7 m-0" id="notifs-container">
        <label for="notifs-datepicker" class="mr-2 font-semibold select-none">Filter Date:</label>
        <input type="date" id="notifs-datepicker" class="mb-3" value="{{ date('Y-m-d') }}"
            onchange="handleDateFilter()">
        <div class="overflow-auto max-h-96 w-fit scroll-smooth drop-shadow-xl">
            <table class="bg-white table-auto" id="notifs-table">
                <thead
                    class="sticky top-0 font-bold leading-6 text-center text-white bg-indigo-900 border-b border-indigo-200">
                    <tr class="select-none pointer-events-none">
                        <th class="p-4">Contact #</th>
                        <th class="p-4">Request Type</th>
                        <th class="p-4">Request Created</th>
                        <th class="p-4">Request Status</th>
                    </tr>
                </thead>
                <tbody id="notifs-tbody">
                    <!-- js code magic here -->
                </tbody>
            </table>
        </div>
    </div>
    @endif
</x-app-layout>
