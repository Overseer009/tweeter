//character counter
$(document).ready(function() {
  $('#tweet-text').on("input", function() {
    const countdown = 140 - this.value.length;
    const counter = $(this).siblings().children('.counter');
    counter.html(countdown);
    if (countdown < 0) {
      $("output").addClass("error")
    } else (
      $("output").removeClass("error")
    )
  });
});