# `Requests.js`

Handles events and update a table based on data received from a server. It includes functions for handling date filtering and toggling rows in the table. Below is a documentation for the code:

### Functions

**`handleDateFilter(renderTimeout, eventData, renderData)`**: This function is responsible for handling the date filter. It is triggered when the date picker's value changes. It filters the eventData based on the selected date and calls the renderData function to update the table with the filtered data.

**`handleRequestsUpdates()`**: This function sets up the event handling and initializes the table. It establishes a connection with a server-sent event (SSE) endpoint, listens for updates, and handles the received data. It also initializes the date picker change listener and retrieves toggle states from local storage.

**`updatedRequestsTable(event)`**: This function is the event handler for SSE updates. It is called whenever new data is received from the server. It parses the received data, checks for changes, and updates the table if necessary.

**`window.renderData(eventData)`**: This function is responsible for rendering the data in the table. It receives an array of eventData, updates the table rows based on the data, and stores the toggle states in local storage.

**`createRowHtml(item, index)`**: This function generates the HTML markup for a table row based on the provided item object and index. It uses the toggle states to determine the opacity and icon class for each row.

**`handleToggleRowClick(rowIndex)`**: This function is the event handler for toggling rows in the table. It toggles the state of a row when clicked and updates the row's opacity and icon accordingly. It also stores the updated toggle states in local storage.

### **Event listeners:**

**`DOMContentLoaded`**: This event listener is triggered when the initial HTML document has been completely loaded and parsed. It calls the handleRequestsUpdates() function to initialize the table and set up event handlers.

**`change event on the requestDatePicker`**: This event listener is triggered when the value of the date picker changes. It calls the handleDateFilter function to filter the data based on the selected date.

### Usage

To use this code, you need to ensure the following:

- Include the required HTML elements in your page, such as a date picker *(notifs-datepicker*), a table body (*notifs-tbody*), and a toggleable row class (*toggle-row*).
- Make sure the necessary dependencies, such as the Font Awesome library, are included.
- Ensure that the SSE endpoint is correctly set up on the server-side, matching the provided endpoint /sse-request-table.
- Add the provided JavaScript code within a `<script>` tag or an external JavaScript file.
- Ensure the window.renderData function is implemented to update the table with the provided data.

### Code

```javascript
let toggleStates = [];

function handleDateFilter(renderTimeout, eventData, renderData) {
const requestDatePicker = document.getElementById("notifs-datepicker");
clearTimeout(renderTimeout);

renderTimeout = setTimeout(() => {
const selectedDate = new Date(requestDatePicker.value);

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
const eventSource = new EventSource("/sse-request-table");
const tbody = document.getElementById("notifs-tbody");
const requestDatePicker = document.getElementById("notifs-datepicker");

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
// Create an array of true values with the length of the difference between the maxRows and toggleStates array
const newToggleStates = new Array(maxRows - toggleStates.length).fill(true); 
// Add the new array to the beginning of the toggleStates array
toggleStates = newToggleStates.concat(toggleStates); 
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

const options_one = {
month: 'numeric',
day: 'numeric',
year: 'numeric',
timeZone: 'UTC',
hour12: true,
hour: 'numeric',
minute: 'numeric'
};

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

try {
eventSource.addEventListener('notifs', updatedRequestsTable);
} catch (error) {
console.error(error);
}

try {
requestDatePicker.removeEventListener("change", handleDateFilterListener);
requestDatePicker.addEventListener("change", handleDateFilterListener);
} catch (error) {
console.error(error);
}
}
document.addEventListener("DOMContentLoaded", handleRequestsUpdates);
```

---

# `newRequest.js`

Handles alerts for new requests using server-sent events (SSE). It listens for new events from the SSE endpoint /sse-request-alert and displays a flash message on the page when a new request is received. Here's a documentation for the code:

### Functions

`handleRequestsAlerts()`: This function sets up the SSE event handling for request alerts. It establishes a connection with the SSE endpoint, listens for events, and calls the displayRequestAlert function when a new event is received.

`displayRequestAlert(event)`: This function is the event handler for new request alerts. It is called when a new event is received from the SSE endpoint. It parses the event data, retrieves the latest event's creation date, and compares it with the current date. If they match, it displays the flash message element on the page for 5 seconds.

### Event listeners

**DOMContentLoaded**: This event listener is triggered when the initial HTML document has been completely loaded and parsed. It calls the handleRequestsAlerts function to set up the SSE event handling. The `{ once: true }` option ensures that the event listener is removed after being executed once.

### Usage

To use this code, you need to ensure the following:

- Include the required HTML element in your page, such as a flash message element with the *#help-request-alert* that will be displayed when a new request is received.

- Make sure the SSE endpoint `/sse-request-alert` is correctly set up on the server-side to emit new request events.

- Add the provided JavaScript code within a `<script>` tag or an external JavaScript file.

### Code

```js
function handleRequestsAlerts() {
    const requestSource = new EventSource("/sse-request-alert");
    const flashMessage = document.getElementById("help-request-alert");
    let isVisible = false;
    let previousEventData = null;

    function displayRequestAlert(event) {
        const eventData = JSON.parse(event.data);
        const latestData = new Date(eventData[0].created_at);

        const latestCreatedAt = latestData.toLocaleString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            timeZone: 'UTC',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        });
        if (eventData.length === 0) {
            return;
        }
        const currentDate = new Date();

        if (latestCreatedAt === currentDate.toLocaleString()) {
            console.log("New data received");

            if (!isVisible) {
                flashMessage.classList.remove("hidden");
                isVisible = true;
            }

            setTimeout(() => {
                flashMessage.classList.add("hidden");
                isVisible = false;
            }, 5000);
        }

        previousEventData = eventData[0];
    }

    requestSource.addEventListener("newRequest", displayRequestAlert);
}

document.addEventListener("DOMContentLoaded", handleRequestsAlerts);
```
