<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            {{ __('MoodTrail Dashboard') }}
        </h2>
    </x-slot>

    <div class="p-5">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    @foreach($contact as $item)
                        <p>{{ $item->contactNum }}</p>
                    @endforeach

                    <!-- Example of accessing the $requestType variable in the view -->
                    @foreach($requestType as $item)
                        <p>{{ $item->requestType }}</p>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
