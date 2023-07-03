function handleSSEUpdates() {
    const tbody = document.getElementById("notifs-tbody");
    let toggleStates = [];
    let previousCreatedAt;
    let renderTimeout;

    function handleSSEMessage(event) {
        const eventData = JSON.parse(event.data);

        if (eventData.length === 0) {
            return;
        }

        const latestCreatedAt = eventData[0].created_at;

        if (latestCreatedAt === previousCreatedAt) {
            return;
        } else {
            previousCreatedAt = latestCreatedAt;
            console.log("new");
        }

        clearTimeout(renderTimeout);
        renderTimeout = setTimeout(() => {
            renderData(eventData);
        }, 100);
    }

    function renderData(eventData) {
        const maxRows = eventData.length;
        toggleStates = new Array(maxRows).fill(true);

        const rowsHtml = eventData
            .slice(0, maxRows)
            .map((item, index) => createRowHtml(item, index))
            .join("");

        tbody.innerHTML = rowsHtml;

        const toggleRows = document.querySelectorAll(".toggle-row");
        toggleRows.forEach((row, index) => {
            row.addEventListener("click", () => handleToggleRowClick(index));
        });
    }

    function createRowHtml(item, index) {
        const createdDate = new Date(item.created_at);
        const formattedDate = createdDate.toLocaleString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

        const opacity = toggleStates[index] ? "1" : "0.5";
        const phoneIconClass = toggleStates[index] ? "fa-phone" : "fa-phone-slash";

        return `<tr class="text-gray-900 border-b border-gray-300">
        <td class="px-4 py-2" style="opacity: ${opacity}">${item.Phone}</td>
        <td class="px-4 py-2" style="opacity: ${opacity}">${item.RequestType}</td>
        <td class="px-4 py-2" style="opacity: ${opacity}">${formattedDate}</td>
        <td class="px-4 py-2 text-center toggle-row" style="cursor:pointer;">
          <i class="phone-icon fa-solid ${phoneIconClass}"></i>
        </td>
      </tr>`;
    }

    function handleToggleRowClick(rowIndex) {
        toggleStates[rowIndex] = !toggleStates[rowIndex];

        const rows = tbody.getElementsByTagName("tr");
        const rowElements = Array.from(rows);
        const tds = rowElements[rowIndex].getElementsByTagName("td");

        tds[0].style.opacity = toggleStates[rowIndex] ? "1" : "0.5";
        tds[1].style.opacity = toggleStates[rowIndex] ? "1" : "0.5";
        tds[2].style.opacity = toggleStates[rowIndex] ? "1" : "0.5";
        tds[3].style.opacity = toggleStates[rowIndex] ? "1" : "0.5";

        const phoneIcon = rowElements[rowIndex].querySelector(".phone-icon");
        phoneIcon.classList.remove(toggleStates[rowIndex] ? "fa-phone-slash" : "fa-phone");
        phoneIcon.classList.add(toggleStates[rowIndex] ? "fa-phone" : "fa-phone-slash");
    }

    const eventSource = new EventSource("/sse-request");
    eventSource.onmessage = handleSSEMessage;
}

document.addEventListener("DOMContentLoaded", handleSSEUpdates);
