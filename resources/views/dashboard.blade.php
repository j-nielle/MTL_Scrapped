<x-app-layout>
    <div class="p-4 text-gray-900 dark:text-gray-100">
        <div class="flex flex-row">
            <div class="w-full p-4 mb-4">
                <div class="max-w-screen-md md:max-w-screen-sm">
                    <table class="w-auto table-fixed sm:table-auto shadow-lg">
                        <thead class="font-bold leading-6 tracking-widest text-left text-white bg-gray-800 border-b border-gray-200">
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

                        <tbody class="bg-white">
                            @foreach($student as $student)
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
</x-app-layout>
