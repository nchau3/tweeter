$(document).ready(function() {

  //char-counter
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

  //show back-to-top & hide form on scroll
  $(document).scroll(function() {
    const scrollTopVal = $(this).scrollTop();
    if (scrollTopVal > 0) {
      $('#back-to-top').fadeIn({duration: 100});
    }
    if (scrollTopVal === 0) {
      $('#back-to-top').fadeOut({duration: 100});
    }
  });

});