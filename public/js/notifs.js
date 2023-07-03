function handleSSEUpdates() {
    const tbody = document.getElementById("notifs-tbody");
    let toggleStates = [];
    let previousCreatedAt;
    let renderTimeout;

    function renderData(eventData) {
        const maxRows = eventData.length;
        toggleStates = new Array(maxRows).fill(true);

        const rowsHtml = eventData
            .slice(0, maxRows)
            .map((item, index) => `
                <tr class="text-gray-900 border-b border-gray-300">
                    <td class="px-4 py-2" style="opacity: ${toggleStates[index] ? '1' : '0.5'}">${item.Phone}</td>
                    <td class="px-4 py-2" style="opacity: ${toggleStates[index] ? '1' : '0.5'}">${item.RequestType}</td>
                    <td class="px-4 py-2" style="opacity: ${toggleStates[index] ? '1' : '0.5'}">${item.created_at}</td>
                    <td class="px-4 py-2 text-center">
                        <i class="phone-icon fa-solid ${toggleStates[index] ? 'fa-phone' : 'fa-phone-slash'}"></i>
                    </td>
                </tr>
            `)
            .join('');

        tbody.innerHTML = rowsHtml;

        const phoneIcons = document.querySelectorAll(".phone-icon");
        phoneIcons.forEach((icon, index) => {
            icon.addEventListener("click", () => handlePhoneIconClick(index));
        });
    }

    function handlePhoneIconClick(rowIndex) {
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

    function handleSSEMessage(event) {
        const eventData = JSON.parse(event.data);

        if (eventData.length === 0) {
            return;
        }

        const latestCreatedAt = eventData[0].created_at; 
        const date = new Date(latestCreatedAt);
        const formattedDate = date.toLocaleString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        });

        if (latestCreatedAt === previousCreatedAt) {
            console.log('same timestamp');
            return;
        } else {
            previousCreatedAt = latestCreatedAt;
            console.log('new timestamp');
        }

        clearTimeout(renderTimeout);
        renderTimeout = setTimeout(() => {
            renderData(eventData);
        }, 100);
    }

    

    const eventSource = new EventSource("/sse-request");
    eventSource.onmessage = handleSSEMessage;
}

document.addEventListener('DOMContentLoaded', handleSSEUpdates);