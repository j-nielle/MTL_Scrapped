<x-app-layout>
    <div class="p-4 text-gray-900 dark:text-gray-100">
        <div class="flex flex-row">
            <div class="w-full p-4 mb-4">
                <div class="max-w-screen-md md:max-w-screen-sm">
                    <table class="w-auto table-fixed sm:table-auto shadow-lg bg-white">
                        <thead
                            class="font-bold leading-6 tracking-widest text-left text-white bg-gray-800 border-b border-gray-200">
                            <tr>
                                <th class="p-4">
                                    Student ID
                                </th>
                                <th class="p-4">
                                    Name
                                </th>
                                <th class="p-4 text-center">
                                    Course
                                </th>
                                <th class="p-4 text-center">
                                    Year Level
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            @foreach ($students as $student)
                                <tr class="text-gray-900 border-b border-gray-300">
                                    <td class="px-4 py-2">
                                        <div>
                                            {{ $student->studentID }}
                                        </div>
                                    </td>
                                    <td class="px-4 py-2">
                                        <div class="">
                                            {{ $student->studentName }}
                                        </div>
                                    </td>
                                    <td class="px-4 py-2">
                                        <div class="">
                                            {{ $student->studentCourse }}
                                        </div>
                                    </td>
                                    <td class="px-4 py-2">
                                        <div class="">
                                            {{ $student->studentYrLvl }}
                                        </div>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
        role="alert">
        <span class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">New</span>
        <span class="font-semibold mr-2 text-left flex-auto">Get the coolest t-shirts from our brand new store</span>
        <svg class="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
        </svg>
    </div>
    <script>
        function handleSSEUpdates() {
            const eventSource = new EventSource("/sse-request");
            let eventData = [];

            function handleSSEMessage(event) {
                eventData = JSON.parse(event.data);

                if (eventData.length === 0) {
                    return;
                }

                const latestCreatedAt = eventData[0].created_at;

                if (latestCreatedAt === previousCreatedAt) {
                    return;
                } else {
                    previousCreatedAt = latestCreatedAt;
                    // popup alert notification here
                    console.log("new event received");
                }
            }
            eventSource.onmessage = handleSSEMessage;
        }
        document.addEventListener("DOMContentLoaded", handleSSEUpdates);
    </script>
</x-app-layout>
