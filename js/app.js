!(function($) {
  "use strict";
  // Loader
  $(window).on("load", function() {
    $("#status").fadeOut();
    $("#preloader")
      .delay(350)
      .fadeOut("slow");
    $("body")
      .delay(350)
      .css({
        overflow: "visible"
      });
  });

  // Navbar
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();

    if (scroll >= 50) {
      $(".sticky").addClass("nav-sticky");
    } else {
      $(".sticky").removeClass("nav-sticky");
    }
  });
})(jQuery);
