function handleSSEUpdates() {
    const tbody = document.getElementById("notifs-tbody");
    let toggleStates = [];
    let previousCreatedAt;
    let renderTimeout;

    function renderData(eventData) {
        const maxRows = eventData.length;
        toggleStates = new Array(maxRows).fill(true); // Initialize toggleStates array with true values

        const rowsHtml = eventData
            .slice(0, maxRows)
            .map((item, index) => `
                <tr class="text-gray-900 border-b border-gray-300">
                    <td class="px-4 py-2" style="opacity: ${toggleStates[index] ? '1' : '0.5'}">${item.Phone}</td>
                    <td class="px-4 py-2" style="opacity: ${toggleStates[index] ? '1' : '0.5'}">${item.RequestType}</td>
                    <td class="px-4 py-2" style="opacity: ${toggleStates[index] ? '1' : '0.5'}">${item.created_at}</td>
                    <td class="px-4 py-2 text-center">
                        <i class="eye-icon fa-solid ${toggleStates[index] ? 'fa-eye' : 'fa-eye-slash'}"></i>
                    </td>
                </tr>
            `)
            .join('');

        tbody.innerHTML = rowsHtml;

        // Add click event listener to the eye icons
        const eyeIcons = document.querySelectorAll(".eye-icon");
        eyeIcons.forEach((icon, index) => {
            icon.addEventListener("click", () => handleEyeIconClick(index));
        });
    }

    function handleEyeIconClick(rowIndex) {
        toggleStates[rowIndex] = !toggleStates[rowIndex]; // Toggle the state
    
        // Get the row elements
        const rows = tbody.getElementsByTagName("tr");
        const rowElements = Array.from(rows);
    
        // Get the corresponding td elements for the clicked row
        const tds = rowElements[rowIndex].getElementsByTagName("td");
    
        // Change opacity of td elements based on the toggle state
        tds[0].style.opacity = toggleStates[rowIndex] ? "1" : "0.5";
        tds[1].style.opacity = toggleStates[rowIndex] ? "1" : "0.5";
        tds[2].style.opacity = toggleStates[rowIndex] ? "1" : "0.5";
    
        // Change the eye icon based on the toggle state
        const eyeIcon = rowElements[rowIndex].querySelector(".eye-icon");
        eyeIcon.classList.remove(toggleStates[rowIndex] ? "fa-eye-slash" : "fa-eye");
        eyeIcon.classList.add(toggleStates[rowIndex] ? "fa-eye" : "fa-eye-slash");
    }    

    function handleSSEMessage(event) {
        const eventData = JSON.parse(event.data);

        if (eventData.length === 0) {
            return;
        }

        const latestCreatedAt = eventData[0].created_at;

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