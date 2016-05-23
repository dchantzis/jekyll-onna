$(window).load(function() {

  var imgCoversSrc = [];

  $('.collection-cover img').each(function (item, i) {
    imgCoversSrc[$(this).attr('data-gallery')] = $(this).attr('src');
  });

  $('.image-gallery').on('mouseenter', 'img', function(){
    galleryId = $(this).attr('data-gallery');
    coverContainer = $('#' + galleryId).find('div.collection-cover');
    coverContainer.find('img').attr('src', $(this).attr('src'));
  });

  $('.image-gallery').on('mouseleave', function(){
    galleryId = $(this).attr('id');
    coverContainer = $(this).find('div.collection-cover');
    coverContainer.find('img').attr('src', imgCoversSrc[galleryId]);
  });

  var initLightbox = function() {
    if( $(".lightbox-switch").length && $(".lightbox-switch").css('display').toLowerCase() == 'block') {

      $('.image-gallery').on('click', '.image-wrapper',  function(e) {
        e.preventDefault();
        var $this = $(this);
        if($this.hasClass('collection-cover')){
          var $collectionGallery = $this.next();
          $this = $collectionGallery.find('.image-wrapper').first();
        }
        $this.addClass('js-lightbox-image-selected');
        $('.lightbox-img').attr('src', $this.find('a').attr('href'));
        $('.lightbox').attr('data-state','visible');
      });

      $('.btn-close').on('click', function(e){
        $('.lightbox').attr('data-state','hidden');
      });

    } else {
      $('.image-gallery').unbind('click');
      $('.image-gallery').unbind('mouseleave');
    }

    var openNextImage = function() {
      var $currentElement = $('.js-lightbox-image-selected');
      var $nextElement = $('.js-lightbox-image-selected').next();
      var $currentGallery = $currentElement.find('img').attr('data-gallery');

      if ( $nextElement.html() == undefined) {
        $nextElement = $('#'+$currentGallery+' .image-wrapper').first();
        if($nextElement.hasClass('collection-cover')){
          var $collectionGallery = $nextElement.next();
          $nextElement = $collectionGallery.find('.image-wrapper');
        }
      }

      $('.lightbox-img').attr('src', $nextElement.find('a').attr('href'));
      $('.lightbox').attr('data-state','visible');

      $currentElement.removeClass('js-lightbox-image-selected');
      console.log($nextElement.html);
      $nextElement.addClass('js-lightbox-image-selected');
    }

    var openPreviousImage = function() {
      var $currentElement = $('.js-lightbox-image-selected');
      var $previousElement = $('.js-lightbox-image-selected').prev();
      var $currentGallery = $currentElement.find('img').attr('data-gallery');

      if ( $previousElement.html() == undefined) {
        $previousElement = $('#'+$currentGallery+' .image-wrapper').last();
        if($previousElement.hasClass('collection-cover')){
          var $collectionGallery = $previousElement.next();
          $previousElement = $collectionGallery.find('.image-wrapper');
        }
      }

      $('.lightbox-img').attr('src', $previousElement.find('a').attr('href'));
      $('.lightbox').attr('data-state','visible');

      $currentElement.removeClass('js-lightbox-image-selected');
      $previousElement.addClass('js-lightbox-image-selected');
    }

    $('.lightbox-controls-next').on('click', function() {
      openNextImage();
    });

    $('.lightbox-controls-previous').on('click', function() {
      openPreviousImage();
    });

    $('html').on('keydown', function(e){
      if($(".lightbox-switch").css('display').toLowerCase() == 'block') {
        e.preventDefault();
        if('39' == e.keyCode || '38' == e.keyCode) {
          openNextImage();
        } else if('37' == e.keyCode || '40' == e.keyCode) {
          openPreviousImage();
        }
      }
    });

    $('html').on("swiperight",function(){
      openNextImage();
    });

    $('html').on("swipeleft",function(){
      openNextImage();
    });

  }

  initLightbox();

  $(window).resize(function() {
    initLightbox();
  });

});
