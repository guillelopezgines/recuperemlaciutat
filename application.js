$(document).ready(function() {
  $.get({
    url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQiCUlLoI5grAcifORhhWirGLoaFA7t9v024l3V4MMhoC7XHvMLSNWZs2-1IPOIil1Wxgzm0J8kjCpi/pub?gid=2065355145&single=true&output=csv&cache=" + Date.now(),
    dataType: "text",
    success: function(response){
      var data = $.csv.toArrays(response),
          $entitats = $('#entitats'),
          $individuals = $('#individuals');

      // clear
      // $entitats.empty();
      // $individuals.empty();

      window.data = data;

      // fill
      for(var i = 0; i<data.length; i++) {
        var row = data[i],
            name = row[1];
        if(row[0] == 'Persona individual') {
          // $individuals.append("<li>" + name + "</li>")
        } else {
          // $entitats.append("<li>" + name + "</li>")
        }
      }
    }   
  });

  $('[data-action=scroll-to][data-destination]').on('click', function(e){
    e.preventDefault();
    var destionationId = $(this).data('destination'),
        $destination = $('#' + destionationId);
    if($destination) {
      $('body,html').animate({
        scrollTop: $destination.offset().top
      }, { 
        duration: 600
      });
    }
  });
  $('[data-action=share]').on('click', function(e){
    e.preventDefault();
    var $share = $('.share');
    $share.slideToggle();
    $share.toggleClass('active');
    if($share.hasClass('active')) {
      var destination = $share.offset().top - $(window).height()/2 - $share.outerHeight()/2;
      if(window.scrollY < destination) {
        $('body,html').animate({
          scrollTop: destination
        }, { 
          duration: 600
        });
      }
    }
  });
});