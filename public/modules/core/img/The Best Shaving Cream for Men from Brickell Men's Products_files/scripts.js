jQuery(window).load(function(){
  
  
  $('.flexslider').flexslider({
    animation: "slide",
    slideshow: true,
    animationDuration: 700,
    slideshowSpeed: 8000,
    animation: "fade",
    controlsContainer: ".flex-controls",
    controlNav: false,
    keyboardNav: true
  }).hover(function(){ $('.flex-direction-nav').fadeIn();}, function(){$('.flex-direction-nav').fadeOut();});
  
  
  $("select.loc_on_change").change(function(){
    if($(this).find(":selected").attr("value") == "#") return false;
    window.location = $(this).find(":selected").attr("value");
  });
    
  
});

jQuery(document).ready(function($){
    

  // force wide nav -->  
  
  // <-- end force wide nav
  
  $(".flyout").hide();

  $("#menu-button").on("click", function() {
    $(".flyout").slideToggle( "fast" );
  });

  $(".sub-menu").hide();
  $(".more, .account-links").on("click", function() {
    $(this).nextAll("ul").slideToggle( "fast" );
    $("i", this).toggleClass("fa-plus fa-minus");
    $(this).next(".more").find("i").toggleClass("fa-user fa-minus");
  });
     
  $("a.zoom").fancybox({
    padding: 0
  });

  $("nav.mobile select").change(function(){ window.location = jQuery(this).val(); });
  $('#product .thumbs a').click(function(){
    
    $('#placeholder').attr('href', $(this).attr('href'));
    $('#placeholder img').attr('src', $(this).attr('data-original-image'))
    
    $('#zoom-image').attr('href', $(this).attr('href'));
    return false;
  });
  
  $('input[type="submit"], input.btn, button').click(function(){ // remove ugly outline on input button click
    $(this).blur();
  })
  
  $('li.dropdown').hover(function(){
    $(this).children('.dropdown').show();
    $(this).children('.dropdown').stop();
    $(this).children('.dropdown').animate({
      opacity: 1.0
    }, 200);
  }, function(){
    $(this).children('.dropdown').stop();
    $(this).children('.dropdown').animate({
      opacity: 0.0
    }, 400, function(){
      $(this).hide();
    });
  });
  
});