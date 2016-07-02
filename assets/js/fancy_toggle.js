$.fn.fancytoggle = function(options) {

  options = $.extend({
    openSpeed: 400,
    closeSpeed: 400,
    easing: 'linear',
    singleItemOpen: false,
    onItemClick: $.noop,
    onItemOpen: $.noop,
    onItemClosed: $.noop,
    initialOpenElement: ''
  }, options);

  this.each(function() {

    $(this).addClass('js-ftoggle');
    var $children = $(this).children();

    $(window).on('resize', function() {
      setItemMinMaxHeights($children);
    });

    $children.each(function() {
      var $item = $(this);
      $item.addClass('js-fchild');
      $item.wrapInner('<div class="content"></div>');

      var title = $item.attr('data-jsfancytitle') || 'Toggle';
      $item.prepend('<div class="title">' + title + '</div>');

      //on title click, togle it 
      $item.on('click', '.title', function(event) {
        toggle($(this).parent(), event);
      });

    });
    setItemMinMaxHeights($children);

    //if we have an element set to be opened on load
    if (options.initialOpenElement) {
      var element = $(this).children(options.initialOpenElement);
      animate(element, 'data-max-height', 'closeSpeed');
    }

  });

  //animate toggle close / open
  function animate($item, height, dirSpeed) {
    $item.css('height', $item.attr(height) + 'px');
    $item.css({
      'transition': 'height ' + options.easing + ' ' + $item.attr(dirSpeed) + 'ms'
    }).toggleClass('active');
  }

  //toggle when clicked
  function toggle($item, event) {

    options.onItemClick.call(null, $item, event);

    if (options.singleItemOpen === true) {
      var $activePanel = $item.siblings('.active');
      animate($activePanel, 'data-min-height', 'data-close-speed');
    }

    if ($item.hasClass('active')) {
      animate($item, 'data-min-height', 'data-close-speed');
      options.onItemClose.call(null, $item, event);
    } else {
      animate($item, 'data-max-height', 'data-open-speed');
      options.onItemOpen.call(null, $item, event);
    }
  }

  //calculate min /max heights and apply them to toggle children 
  function setItemMinMaxHeights($children) {
    $children.each(function() {
      var $item = $(this);
      var $title = $item.children('.title');
      var $content = $item.children('.content');
      var maxHeight = 0;
      var minHeight = 0;

      if ($title) {
        maxHeight += $title.outerHeight(true);
        minHeight += $title.outerHeight(true);
      }
      if ($content) {
        maxHeight += $content.outerHeight(true);
      }

      $item.attr('data-max-height', maxHeight);
      $item.attr('data-min-height', minHeight);
      $item.attr('data-close-speed', options.closeSpeed);
      $item.attr('data-open-speed', options.openSpeed)

      if ($item.hasClass('active')) {
        $item.height(maxHeight);
      } else {
        $item.height(minHeight);
      }
    });
  }

  return this;
}