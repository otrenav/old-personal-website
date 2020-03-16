if (location.hostname == "localhost") {
  console.log("Avoided contaminating Google Analytics");
} else {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "UA-98004849-1");
}
