//character counter
$(document).ready(function() {
  $('#tweet-text').on("input", function() {
    const countdown = 140 - this.value.length;
    const counter = $(this).siblings().children('.counter');
    counter.html(countdown);
    counter.css('color',  countdown < 0 ? 'red' : '#545149');
  });
});