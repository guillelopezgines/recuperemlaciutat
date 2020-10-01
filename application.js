var reload = function(){
  $.get({
    url: "https://recuperem-cors-anywhere.herokuapp.com/docs.google.com/spreadsheets/d/e/2PACX-1vQiCUlLoI5grAcifORhhWirGLoaFA7t9v024l3V4MMhoC7XHvMLSNWZs2-1IPOIil1Wxgzm0J8kjCpi/pub?gid=2065355145&single=true&output=csv&cache=" + Date.now(),
    dataType: "text",
    success: function(response){
      var data = $.csv.toArrays(response),
          $entitats = $('#entitats'),
          $individuals = $('#individuals'),
          entities_count = 0,
          people_count = 0,
          goal_count = 0;

      // clear
      $entitats.empty();
      $individuals.empty();

      // fill
      for(var i = 0; i<data.length; i++) {
        var row = data[i],
            name = row[1];
        if(row[0] == 'Persona individual') {
          people_count++;
          $individuals.append("<li>" + name + "</li>")
        } else {
          entities_count++;
          $entitats.append("<li>" + name + "</li>")
        }
      }

      goal_count = 5000;
      if(people_count > goal_count) goal_count = 7500;
      if(people_count > goal_count) goal_count = 10000;
      if(people_count > goal_count) goal_count = 15000;
      if(people_count > goal_count) goal_count = 20000;
      if(people_count > goal_count) goal_count = 25000;
      if(people_count > goal_count) goal_count = 50000;
      if(people_count > goal_count) goal_count = 75000;
      if(people_count > goal_count) goal_count = 100000;

      var formatNumber = function (x) {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }

      $('#entities-count').html(formatNumber(entities_count));
      $('#people-count').html(formatNumber(people_count));
      $('#goal-count').html(formatNumber(goal_count));
      $('.progress').show();
      $('.progress .bar').css('width', (100 * people_count/goal_count) + '%')
    }   
  });
};

$(document).ready(function() {
  reload();
  setInterval(function(){
    reload();
  }, 60 * 1000);

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
      var destination = $share.offset().top - 100;
      if(window.scrollY < destination) {
        $('body,html').animate({
          scrollTop: destination
        }, { 
          duration: 600
        });
      }
    }
  });
  $('[data-action=more-drawings]').on('click', function(e){
    e.preventDefault();
    $('.drawings .hidden').toggle();
    $(this).parents('.more').remove()
  });
});