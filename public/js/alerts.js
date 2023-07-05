function handleRequestsAlerts() {
    const requestSource = new EventSource("/sse-request-alert");
    const flashMessage = document.getElementById("help-request-alert");
    let isVisible = false;
    let previousEventData = null;

    function displayRequestAlert(event) {
        const eventData = JSON.parse(event.data);

        if (eventData.length === 0) {
            return;
        }

        const latestCreatedAt = eventData[0].created_at;

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

        previousEventData = eventData[0];
    }

    requestSource.addEventListener("newRequest", displayRequestAlert);
}

document.addEventListener("DOMContentLoaded", handleRequestsAlerts, { once: true});
