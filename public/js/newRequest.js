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