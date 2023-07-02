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
</x-app-layout>
