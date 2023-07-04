function handleRequestsAlerts() {
    const eventSource = new EventSource("/sse-request");
    const flashMessage = document.getElementById("help-request-alert");
    let isVisible = false;
    let previousEventData = null;

    function displayRequestAlert(event) {
        const eventData = JSON.parse(event.data);

        if (eventData.length === 0) {
            return;
        }

        // Assuming the 'created_at' property is a valid ISO8601 date string
        const latestCreatedAt = eventData[0].created_at;
        const currentDateTime = new Date().toISOString();

        if (
            previousEventData &&
            new Date(previousEventData.created_at) < new Date(latestCreatedAt)
        ) {
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

        // Store the latest eventData for future comparisons
        previousEventData = eventData[0];
    }

    eventSource.addEventListener("notifs", displayRequestAlert);
}

document.addEventListener("DOMContentLoaded", handleRequestsAlerts);
