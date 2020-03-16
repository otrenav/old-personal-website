window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "UA-98004849-1");

let questions = {
  headingOne: "call",
  headingTwo: "process",
  headingThree: "price",
  headingFour: "retainers",
  headingFive: "on-site",
  headingSix: "expertise",
  headingSeven: "training",
  headingEight: "send-me-work",
  headingNine: "work-for-you",
  headingTen: "current-work"
};

for (const q in questions) {
  $(`#${q}`).click(function() {
    if (
      $(this)
        .parent()
        .attr("class")
        .split(/\s+/)
        .includes("collapsed")
    ) {
      if (location.hostname == "localhost") {
        console.log(`Would send "questions/${questions[q]}" to GA`);
      } else {
        ga("send", "event", "questions", questions[q]);
      }
    }
  });
}
