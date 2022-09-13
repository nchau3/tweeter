$(document).ready(function() {

  $('#tweet-text').on('input change', function () {
    let count = $(this).val().length;
    let counter = $(this).next().children()[1];
    if (count > 140) {
      $(counter).css('color', "red");
      counter.innerHTML = 140 - count;
    } else {
      $(counter).css('color', "#545149");
      counter.innerHTML = 140 - count;
    }
  })

});