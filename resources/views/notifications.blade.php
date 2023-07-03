<x-app-layout>
    <script src="{{ asset('js/notifs.js') }}"></script>

    <div class="w-full p-8 mb-4" id="notifs-container">
        <div class="max-h-96 overflow-auto w-fit">
            <table class="table-fixed sm:table-auto shadow-lg bg-white" id="notifs-table">
                <thead class="sticky top-0 font-bold leading-6 tracking-widest text-left text-white bg-gray-800 border-b border-gray-200">
                    <tr>
                        <th class="p-4">Contact Number</th>
                        <th class="p-4">Request Type</th>
                        <th class="p-4">Request Created</th>
                        <th class="p-4">Show/Hide</th>
                    </tr>
                </thead>
                <tbody id="notifs-tbody"><!-- js code magic here --> </tbody>
            </table>
        </div>
    </div>
</x-app-layout>