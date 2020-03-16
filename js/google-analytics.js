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

let questions = {
  headingOne: "Call",
  headingTwo: "Process",
  headingThree: "Price",
  headingFour: "Retainers",
  headingFive: "Offices",
  headingSix: "Expertise",
  headingSeven: "Training",
  headingEight: "Send me work",
  headingNine: "Work for you",
  headingTen: "Current work"
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
        ga("send", "event", "Questions", questions[q]);
      }
    }
  });
}

let contacts = {
  "contact-top": "Top",
  "contact-intro": "Intro",
  "contact-what": "What",
  "contact-why": "Why",
  "contact-how": "How"
};

for (const c in contacts) {
  $(`#${c}`).click(function() {
    if (location.hostname == "localhost") {
      console.log(`Would send "contact/${contacts[c]}" to GA`);
    } else {
      ga("send", "event", "Contact", contacts[c]);
    }
  });
}
