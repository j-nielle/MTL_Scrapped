<x-app-layout>
    <script src="{{ asset('js/notifs.js') }}"></script>

    <div class="p-4 text-gray-900 dark:text-gray-100">
        <div class="flex flex-row">
            <div class="w-full p-4 mb-4">
                <div class="max-w-screen-md md:max-w-screen-sm">
                    <table class="w-auto table-fixed sm:table-auto shadow-lg bg-white" id="sse-data">
                    </table>
                </div>
            </div>
        </div>
    </div>
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
