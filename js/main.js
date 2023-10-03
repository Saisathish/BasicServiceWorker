if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw_cacheSite.js")
      .then((reg) => console.log("service worker : Registered"))
      .catch((err) => console.log(`Service Worker : error -> ${err}`));
  });
}
