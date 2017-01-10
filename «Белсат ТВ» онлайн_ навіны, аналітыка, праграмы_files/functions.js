jQuery(document).ready(function($) {



  // Selects
  $(".select-wrap select").change(function(){
    var selectedText = $(this).find("option:selected").text();
    $(this).parent().find($("span")).text(selectedText);
    if($(this).parent().attr('id')!='time_zone'){
    	var selectedUrl = $(this).find("option:selected").attr("value");	
    	window.location.href = selectedUrl;
    }
  });


  // Sticky_menus
  $(window).load(function(){
    if ($(window).width() > 1240){  
      $(".stick_content .social").stick_in_parent({
        parent: ".article_row",
        // offset_top: 10
      });
    }
    // if ($(window).width() > 1000){
    //   $(".left_side_menu").stick_in_parent({
    //     parent: ".main_page_content",
    //     // offset_top: 10
    //   });
    // }
  });

  $(window).resize(function(){
    if ($(window).width() <= 1240){
      $(".stick_content .social").trigger("sticky_kit:detach");
    }
    else{  
      $(".stick_content .social").stick_in_parent({
        parent: "body",
        // offset_top: 10
      });
    }

    // if($(window).width() <= 1000){
    //   $(".left_side_menu").trigger("sticky_kit:detach");
    // }
    // else{
    //   $(".left_side_menu").stick_in_parent({
    //     parent: ".main_page_content",
    //     // offset_top: 10
    //   });
    // }

  });

  $(".article_row.hidden").show();

  // Gallery
  $(".lightSlider").each(function(){
    $(this).lightSlider({
        slideWidth:"",
        slideMargin:0,
        slideMove:1,
        minSlide:1,
        // maxSlide:8,
 
        pager:true,
        controls:true,
        prevHtml:'',
        nextHtml:'',
        keyPress:true,
        thumbWidth:60,
        thumbMargin:5,
        gallery:true,
        currentPagerPosition:'middle',
        
        useCSS:true,
        auto: false,
        pause: 2000,
        loop:true,
        easing: '',
        speed: 400,
        mode:"slide",
        swipeThreshold:10
    });
   });

   // Tabs bar
  $(".tabs_container .tab_menu li a").click(function(e){
    e.preventDefault();
    var thisContext = $(this).closest(".tabs_container");
    var tabName = $(this).parent().attr("attr-tab");
    console.log(tabName);
    
    // Change menu
    thisContext.find(".tab_menu li.active").removeClass("active");
    $(this).parent().addClass("active");

    // Change content
    if(thisContext.find(".tab_content").hasClass("video_tabs")){
      var oldTab = thisContext.find(".tab_content").find("li.active");
      var oldTabHtml = oldTab.html();
      oldTab.empty();
      oldTab.html(oldTabHtml);
      $('.open-ajax').magnificPopup({
        type:'ajax',
        midClick: false // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
      });
    }
    thisContext.find(".tab_content").find("li.active").removeClass("active");
    thisContext.find(".tab_content").find("li[attr-tab="+tabName+"]").addClass("active");
  })

  // Hide tabs

  $(window).load(function(){
    $(".tab_content li").addClass("hidden");
  });


  $(".article_row.hidden").hide();

  // Magnific popup
  $('.popup_link').magnificPopup({ 
    type: 'image',
    image: {
      cursor:false,
      titleSrc: function(item) {
        return item.el.closest("figure").find("figcaption").html();
      }
    }
  });

  // Slider gallery
  $('.slider_wrap').each(function(){
    $(this).find("a.zoom").magnificPopup({
      type: 'image',
      gallery: {
        enabled:true
      },
      image: {
        cursor:false,
        titleSrc: function(item) {
          return item.el.closest("li").find("figcaption").html();
        }
      }
    });
  });

  // Menu opening
  var menuOpenSelector = $(".open_menu");
  var headerOpened;

  $(window).load(function(){
   $("header.page_header").css({"height": "auto"});
    headerOpened = $("header.page_header").height();
    $("header.page_header").css({"height": " "});
  });

  menuOpenSelector.on('click', function(e){
    e.preventDefault();
    if($("header.page_header.opened-menu").length<1){
      $("header.page_header").addClass("opened-menu");
      $("header.page_header").addClass("calculated");
      $("header.page_header").height(headerOpened);
    }
    else{
      $("header.page_header").removeClass("opened-menu");
      $("header.page_header").css({"height":" "});
    }
  });

  $(window).resize(function(event){
    $("header.page_header").removeClass("opened-menu");
    $("header.page_header").removeClass("calculated");
    $("header.page_header").css({"height":" "});
    $("header.page_header").css({"height": "auto"});
    headerOpened = $("header.page_header").height();
    $("header.page_header").css({"height": " "});
  });


  
  // Collapse

  $(".collapse_parent .collapsible").collapse({
    open: function() {
      this.addClass("open");
      this.css({ height: this.children().outerHeight() });
    },
    close: function() {
      this.css({ height: "0px" });
      this.removeClass("open");
    }
  });


  // More description 

  $(".open_description").click(function(e){
    e.preventDefault();
    if($(this).hasClass("clicked")){
      $(this).find(".more_text").show();
      $(this).find(".less_text").hide();
      $(".article_row.hidden").slideUp();
      $(this).removeClass("clicked");
    }
    else {
      $(this).find(".more_text").hide();
      $(this).find(".less_text").show();
      $(".article_row.hidden").slideDown();
      $(this).addClass("clicked");
    }
  });




  // Check if touch
  function is_touch_device() {
    return 'ontouchstart' in window || 'onmsgesturechange' in window;
  }


  if(is_touch_device()){
    $("html").addClass("touch");
  }

  else{
    $("html").addClass("no-touch");
  }





  // Multi gallery 
  
  var galleryOptions = {
    counter: "long",
    continuous: true
  };

  var swipes = [];


  $(window).load(function(){
    // Make every gallery

    // Make swipe gallery
    $('.gallery').each(function(i, obj){

      // every gallery
      $(this).attr("data-gallery", i);

      var thisElement = i;
      // Create slide.js gallery

      swipes[i] = new window.Swipe(obj,{
        continuous: galleryOptions.continuous,
        // auto: 2000,
        callback: function(index){afterTransition(thisElement, index);}
      });

      // Add dots
      var totalLength = $(this).children().children().length;
      var ulSelector = $(this).parent().find("nav ul");
      if(galleryOptions.counter === "long"){
        for(i=0; i<totalLength; i++){
          ulSelector.append("<li><a>"+(i+1)+"</a></li>");
        }
        ulSelector.find("li").eq(0).addClass("active");
      }
      if(galleryOptions.counter === "short"){
        ulSelector.append("<li><span>1</span>/"+totalLength+"</li>");
      }

      // Do height
      var thisGalleryWrap = $(this).parents(".gallery-wrap");
      var activeHeight = thisGalleryWrap.find(".slide").eq(0).height();
      $(this).height(activeHeight);

    });

    // Dots action
    $(".gallery-wrap nav ul li a").on('click', function(){
      var thisIndex = $(this).parents(".gallery-wrap").find(".gallery").attr('data-gallery');
      var liIndex = $(this).parent().index();
      swipes[thisIndex].slide(liIndex);
    });


  });

  // Do height on window resize
  $(window).resize(function(){
    $(".gallery-wrap").each(function(){
      var thisGallery = $(this);
      var thisGalleryIndex = thisGallery.find(".gallery").attr("data-gallery");
      var activeIndex = swipes[thisGalleryIndex].getPos();
      var activeHeightResize = thisGallery.find(".slide").eq(activeIndex).height();
      thisGallery.find(".gallery").height(activeHeightResize);
    });
  });


  // Next click function

  function nextGallery(thisIndex){
    swipes[thisIndex].next();
  }

  // Prev click function

  function prevGallery(thisIndex){
    swipes[thisIndex].prev();
  }

  // Next button
  $(".gallery-wrap .next").on("click",function(){
    var thisIndex = $(this).parents(".gallery-wrap").find(".gallery").attr('data-gallery');
    nextGallery(thisIndex);
  });

  // Prev button
  $(".gallery-wrap .prev").on("click",function(){
    var thisIndex = $(this).parents(".gallery-wrap").find(".gallery").attr('data-gallery');
    prevGallery(thisIndex);
  });


  function afterTransition(i, index){
    var thisGalleryWrap = $(".gallery[data-gallery="+i+"]").parents(".gallery-wrap");
    if(galleryOptions.counter === "long"){
      thisGalleryWrap.find("nav ul li.active").removeClass("active");
      thisGalleryWrap.find("nav ul li").eq(index).addClass("active");
    }
    if(galleryOptions.counter === "short"){
      thisGalleryWrap.find("nav ul li span").text(index+1);
    }
    var activeHeight = thisGalleryWrap.find(".slide").eq(index).height();
    $(".gallery[data-gallery="+i+"]").addClass("transit");
    $(".gallery[data-gallery="+i+"]").height(activeHeight);
  }


  // Datepicker
  function setURLParam(paramName, paramValue) {
  	    var is_pagination = location.pathname.search("page");
  	    var lc = -1;
  	    if(location.pathname.search("ru")||location.pathname.search("en")||location.pathname.search("pl")){
  	    	lc = 1;
  	    }
  	    var pathname = '';
  	    if(is_pagination > 0){
  	    	pathname = location.pathname.substring(0,is_pagination);
  	    }else{
  	    	pathname = location.pathname;
  	    	pathname = removeLastDirInPath(pathname, lc);
  	    }
        window.location.href = location.protocol + '//' + location.host + pathname + '?' + paramName + '=' + paramValue;
    } 
    
   function removeLastDirInPath(path, lc) {
        var array_path = path.split('/');
        if((lc > 0 && array_path.length > 4) || (lc < 0 && array_path.length > 3)) {
                array_path.pop();
                array_path.pop();
        }
        return(array_path.join('/'));
  }
 
 
   
  var calendar = $('#dp3 .span2').datepicker({
    language: LANGUAGE_CODE,
    endDate: "now",
    autoclose: true,
    format: 'dd.mm.yyyy',
    weekStart: "1"
  }).on('changeDate', function (e) {
    setURLParam('cd', $(this).val());
  });


  // Login
  $('.open-popup').magnificPopup({
    type:'inline',
    midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
  });


  // Schedule
  $('.open-ajax').magnificPopup({
    type:'ajax',
    midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
  });

  // Silverlight
  $('.open-ajax-video').magnificPopup({
    type:'ajax',
    closeBtnInside: true,
    midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
  });
  

  jQuery.fx.interval = 20;
  // Get film width
  var runOffset = $(window).width()/2;
  var runningWidth = $('.running_line .film').width();
  var runningSpeed = (runningWidth / 50) * 1000;
  var offsetSpeed = (runOffset / 50) * 1000;
  var runningline;
  // Duplicate runningline content
  $('.running_line').append($('.running_line').html());
  $('.running_line').css({"padding-left":runOffset});
  $('.running_line').animate({'padding-left': "0px" }, offsetSpeed, "linear", function(){
    filmrotation();
  });

  function filmrotation(){
    $('.running_line .film').animate({'left': -runningWidth }, runningSpeed, "linear", function(){
      $('.running_line .film').css({'left':'0px'});
    });
    runningline = setTimeout(function(){filmrotation()}, runningSpeed);
  }

  

  $(window).resize(function(event) {
    window.clearTimeout(runningline);
    var runningWidth = $('.running_line .film').width();
    var runningSpeed = (runningWidth / 60) * 1000;
    $('.running_line .film').css({'left':'0px'});
    filmrotation();
  });
  
  // Broadcast fitvids
  $(".broadcast .post .content").fitVids();
  $(".banner").fitVids();



  //==== Article infinite scroll ====//

  var stopScroll = false;

  function loadNextArticle(){
    var nextArticleUrl = $(".page_content_container .article_container:last-child").attr("data-load-next");
    if(nextArticleUrl !== ""){
      $.get(nextArticleUrl, function(data){ 
        $(".page_content_container").append(data);
        FB.XFBML.parse(); 
        twttr.widgets.load();
        setTimeout(function() {
          stopScroll = false;
          $(".page_content_container .article_container:last-child .stick_content .social").stick_in_parent({
            parent: ".article_row"
          });

        }, 100);
      });
    }
  }

  if($(".article_container[data-load-next]").length > 0){
    $(window).scroll(function() {
      if($(window).scrollTop() + $(window).height()> $(document).height() - 800 && !stopScroll ) {
        stopScroll = true;
        loadNextArticle();
      }
    });
  }
  var dontMissSlider = $(".dont-miss-box").lightSlider({
    slideWidth:"",
    loop:true,
    pause: 6000,
    speed: 400,
    auto: true,
    onSliderLoad: function(el){
      $(".dont-miss-loader").addClass("animate");
      $(".dont-miss-box").removeClass("hidden");
    }
  });
  $(".dont-miss-box-offset").mouseenter(function(){
    dontMissSlider.pause();
    $(".dont-miss-loader").removeClass("animate");
    $(".dont-miss-loader").offsetWidth = $(".dont-miss-loader").offsetWidth;
  });
  $(".dont-miss-box-offset").mouseleave(function(){
    $(".dont-miss-loader").addClass("animate");
    setTimeout(function(){
      dontMissSlider.play();
    }, 6000);
  });

$("#wpadminbar .screen-reader-shortcut").css('top','10em');
});
