self.addEventListener("install", (event) => {
  console.log("Service Worker installing.");
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating.");
});

self.addEventListener("message", (event) => {
  if (event.data === "show-notification") {
    // Make a request to the API
    fetch("https://picsum.photos/200/300")
      .then((response) => {
        // Get the final URL from the response
        const imageUrl = response.url;

        // Show the notification with the image URL
        self.registration.showNotification("New Image", {
          body: "Click to see the image.",
          icon: imageUrl, // Optionally use the image as an icon
          data: {
            url: imageUrl, // Store the URL to use when the notification is clicked
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }
});

self.addEventListener("notificationclick", (event) => {
  const notification = event.notification;
  const url = notification.data.url;

  notification.close();

  // Open the URL in a new window/tab
  event.waitUntil(clients.openWindow(url));
});
