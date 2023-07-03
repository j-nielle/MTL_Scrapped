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
        const date = new Date(item.created_at);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
                .toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                })
                .toUpperCase()}`;
        
        const extractedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

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

        const row = tbody.querySelector(`tr:nth-child(${rowIndex + 1})`);
        const tds = row.getElementsByTagName("td");

        const opacityValue = toggleStates[rowIndex] ? "1" : "0.5";
        for (const td of tds) {
            td.style.opacity = opacityValue;
        }

        const phoneIcon = row.querySelector(".phone-icon");
        phoneIcon.classList.toggle("fa-phone", toggleStates[rowIndex]);
        phoneIcon.classList.toggle("fa-phone-slash", !toggleStates[rowIndex]);
    }

    const eventSource = new EventSource("/sse-request");
    eventSource.onmessage = handleSSEMessage;
}

document.addEventListener("DOMContentLoaded", handleSSEUpdates);
