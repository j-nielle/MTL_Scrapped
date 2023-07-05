let toggleStates = [];

function handleDateFilter(renderTimeout, eventData, renderData) {
    const datePicker = document.getElementById("notifs-datepicker");
    clearTimeout(renderTimeout);

    renderTimeout = setTimeout(() => {
        const selectedDate = new Date(datePicker.value);

        const filteredData = eventData ? eventData.filter((item) => {
            const eventDate = new Date(item.created_at);
            if (selectedDate.toDateString() === 'Invalid Date') {
                return true;
            }
            return eventDate.toDateString() === selectedDate.toDateString();
        }) : [];

        window.renderData(filteredData);
    }, 100);
}

function handleRequestsUpdates() {
    const eventSource = new EventSource("/sse-request");
    const tbody = document.getElementById("notifs-tbody");
    const datePicker = document.getElementById("notifs-datepicker");

    const storedToggleStates = localStorage.getItem('toggleStates');
    if (storedToggleStates) {
        toggleStates = JSON.parse(storedToggleStates);
    }

    let previousCreatedAt = null;
    let renderTimeout = null;
    let eventData = [];

    function updatedRequestsTable(event) {
        eventData = JSON.parse(event.data);

        if (eventData.length === 0) {
            return;
        }

        const latestCreatedAt = eventData[0].created_at;

        if (latestCreatedAt === previousCreatedAt) {
            return;
        } else {
            previousCreatedAt = latestCreatedAt;
            console.log("new event received");
        }

        clearTimeout(renderTimeout);
        renderTimeout = setTimeout(() => {
            window.renderData(eventData);
        }, 100);
    }

    window.renderData = function (eventData) {
        const maxRows = eventData.length;
        
        if (toggleStates.length < maxRows) {
            const newToggleStates = new Array(maxRows - toggleStates.length).fill(true); // Create an array of true values
            toggleStates = newToggleStates.concat(toggleStates); // Add the new array to the beginning of the toggleStates array
        }

        const rowsHtml = maxRows > 0
            ? eventData
                .slice(0, maxRows)
                .map((item, index) => createRowHtml(item, index))
                .join("")
            : `<tr class="text-gray-900 border-b border-gray-300">
                <td class="px-4 py-2">Empty</td>
                <td class="px-4 py-2">Empty</td>
                <td class="px-4 py-2">Empty</td>
                <td class="px-4 py-2">Empty</td>
              </tr>`;

        tbody.innerHTML = rowsHtml;

        const toggleRows = document.querySelectorAll(".toggle-row");
        toggleRows.forEach((row, index) => {
            row.removeEventListener("click", handleToggleRowClick);
            row.addEventListener("click", () => handleToggleRowClick(index));
        });

        localStorage.setItem('toggleStates', JSON.stringify(toggleStates));
    }

    function createRowHtml(item, index) {
        const getItemDate = new Date(item.created_at);
        const currDate = new Date();

        const options_one = {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            timeZone: 'UTC',
            hour12: true,
            hour: 'numeric',
            minute: 'numeric'
        };

        const options_two = {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        };

        const formattedCurrDate = new Date(currDate.getTime()).toLocaleString('en-US', options_two);
        const formattedItemDate = new Date(getItemDate.getTime()).toLocaleString('en-US', options_one);

        const opacity = toggleStates[index] ? "1" : "0.5";
        const iconClass = toggleStates[index] ? "fa-phone" : "fa-check";

        return `<tr class="text-gray-900 border-b border-indigo-300">
            <td class="px-4 py-2" style="opacity: ${opacity}">${item.Phone}</td>
            <td class="px-4 py-2" style="opacity: ${opacity}">${item.RequestType}</td>
            <td class="px-4 py-2" style="opacity: ${opacity}">${formattedItemDate}</td>
            <td class="px-4 py-2 text-center toggle-row" style="cursor:pointer;">
                <i class="fa-solid ${iconClass}" id="toggle-notifs-phone-icon" style="color:green; opacity: ${opacity}"></i>
            </td>
        </tr>`;
    }

    function handleToggleRowClick(rowIndex) {
        toggleStates[rowIndex] = !toggleStates[rowIndex];

        const row = tbody.querySelector(`tr:nth-child(${rowIndex + 1})`);
        const tds = row.getElementsByTagName("td");

        const opacityValue = toggleStates[rowIndex] ? "1" : "0.5";
        for (const td of tds) {
            td.style.opacity = opacityValue;
        }

        const rowIcon = row.querySelector("#toggle-notifs-phone-icon");
        rowIcon.style.opacity = opacityValue;
        rowIcon.classList.toggle("fa-phone", toggleStates[rowIndex]);
        rowIcon.classList.toggle("fa-check", !toggleStates[rowIndex]);

        localStorage.setItem('toggleStates', JSON.stringify(toggleStates));
    }

    let handleDateFilterListener = () => handleDateFilter(renderTimeout, eventData, window.renderData);
    eventSource.addEventListener('notifs', updatedRequestsTable);

    datePicker.removeEventListener("change", handleDateFilterListener);
    datePicker.addEventListener("change", handleDateFilterListener);
}

document.addEventListener("DOMContentLoaded", handleRequestsUpdates, { once: true });