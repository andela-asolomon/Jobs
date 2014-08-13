jQuery(document).ready(function($){

	var $productTabs = $('#product-tabs .tabs');
	var $productTabsContent = $('#product-tabs .tabs-content');
	var tabMapping = {
		'Description': '#tab-description',
		'Directions': '#tab-directions',
		'Ingredients': '#tab-ingredients',
	};

	// This first section is all about formatting the content correctly for tabs
	
	// Add the opening list tag before the first h2 within the description 
	//$('.description h2:first-of-type').before('<ul class="tabs" />');
	
	// Loop through each h2 in the description
	$('#product-description-html h2').each(function(index, value){
	    // Assign them each a number, in order
		var num = index + 1;
		
		// For each h2, wrap everything from after the heading to just before the next one in a div
		// Give each div a unique ID that includes those assigned numbers

		var name = $(this).text();

		if (!(name in tabMapping)) {
			return;
			//$productTabs.append('<li><a href="#tab-' + num + '">' + name + '</a></li>');
			//$productTabsContent.append('<div id="tab-' + num + '"></div>');
			//$tabContent = $('#tab-' + num);
		} else {
			$tabContent = $(tabMapping[name]);
		}

	    $(this).nextUntil('h2').appendTo($tabContent);
	});
	
	// The rest of this is the actual tab functionality, from http://www.jacklmoore.com/notes/jquery-tabs/
	$productTabs.each(function(){
	 
	  // For each set of tabs, we want to keep track of
	  // which tab is active and it's associated content
	  var $active, $content, $links = $(this).find('a');
	
	  // If the location.hash matches one of the links, use that as the active tab.
	  // If no match is found, use the first link as the initial active tab.
	  $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
	  $active.addClass('active');
	  $content = $($active.attr('href'));
	
	  // Hide the remaining content
	  $links.not($active).each(function () {
	    $($(this).attr('href')).hide();
	  });
	
	  // Bind the click event handler
	  $(this).on('click', 'a', function(e){
	    // Make the old tab inactive.
	    $active.removeClass('active');

		var $oldTab = $content;

	    // Update the variables with the new link and content
	    $active = $(this);
	    $content = $($(this).attr('href'));

	    var $newTab = $content;
	
	    // Make the tab active.
	    $active.addClass('active');

	    $oldTab.fadeOut(function() {
	    	$newTab.fadeIn();
	    })
	
	    // Prevent the anchor's default click action
	    e.preventDefault();
	  });
	});
});


//highlight hover
$.fn.highlightHover = function(){
  
  //var highLight = $('<div class="highlight highlight-lg"/><div class="highlight highlight-md"/><div class="highlight highlight-sm"/><div class="highlight highlight-xs"/><div class="highlight highlight-xxs"/>');
  var highLight = $('<div class="highlight"/>');
  
  var beginOpacity = .15;
  var isNotIE = $.support.opacity;
  
  if(isNotIE){
    beginOpacity = .25;
  }
  
  highLight.fadeTo(0, beginOpacity);
  
  var $img = this.find('.image');
  $img.append(highLight);
  highLight.css({
    width: $img.width(),
    height: $img.height(),
    bottom: $img.height() * 0.25
  });
  
  this.hover(function(){
    //over
    if(isNotIE){
      $(this).addClass('over').find('.highlight').stop().fadeTo(400, .9);
    }else{
      $(this).addClass('over').find('.highlight').stop().fadeTo(400, .45);
    }
  },function(){
    //out
    $(this).removeClass('over').find('.highlight').stop().fadeTo(400, beginOpacity);
  });
}

$(window).load(function() {
  createHighlights();
});

$(window).resize(function() {
  createHighlights();
});

function createHighlights() {
  $('.product .highlight').remove();
  
  $('.products .product').each(function() {
    $(this).highlightHover();
  });
  
  $('.highlight').each(function(){
    var t = $(this);
    var tw = t.width();
    var th = t.height();
    var paper = Raphael(this, tw, th);
    var c = paper.circle((tw)/2, th, tw/1.8);
    var opac = 1;
    var end;
    var theFill = 'r(0.5, .5)#CCC-#121211';
    var location = $(t.parent().parent());
    
    if($.support.opacity){
      // if not IE
      opac = 0;
      theFill = 'r(0.5, .5)#C5C5C4-#121211';
    }else{
      //if IE
      if(location.hasClass('grid')){
        theFill = 'r(.5, .5)#CCC-#5B5A58-#504F4C-#3F3F3C-#2A2927-#121211-#111110';
      }else if(location.hasClass('module')){
        theFill = 'r(.5, .5)#AAA-#666-#454545-#333-#282827-#1B1A19';
      }else{
        theFill = 'r(.5, .5)#999-#454545-#0F0F0E';
      }
      opac = 1;
    }
    c.attr({
      'fill':theFill,
      'fill-opacity':opac,
      'stroke':'none'
    })
  });
}