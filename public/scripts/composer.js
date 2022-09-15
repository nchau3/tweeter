$(document).ready(function() {

  $('#tweet-text').on('input', function () {
    let count = $(this).val().length;
    let counter = $(this).next().children()[1];
    if (count > 140) {
      $(counter).css('color', "red");
      counter.innerHTML = 140 - count;
    } else {
      $(counter).css('color', "#545149");
      counter.innerHTML = 140 - count;
    }
  });

  $(document).scroll(function() {
    if ($(this).scrollTop() > 0) {
      $('#back-to-top').css('display', 'block');
      $('#new-tweet').slideUp({duration: 600});
    }
    if ($(this).scrollTop() === 0) {
      $('#back-to-top').css('display', 'none');
    }
  });

});