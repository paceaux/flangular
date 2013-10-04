// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

if (window.jQuery){
  (function( $ ){
    $.fn.editable = function( options ) {
    //SETUP    
        var $this = $(this);
        var $parent = $(this).parent();
    //INTERNAL FUNCTIONS
        function testFeature (el, attr) {
          var test = document.createElement(el);
          if (attr in test) {
            return true;
          } else {
            return false;
          }                
        }
        //set features as a global variable, that way I'm not access it everytime the plugin runs? maybe?    
        var features = {
            contenteditable : testFeature('div', 'contenteditable'),
            scoped : testFeature('style','scoped')
        };
    //DEFAULT SETTINGS
        var settings = $.extend( {
          'stylable'         : false,
          'recoverable' : false,
           'savable': false
        }, options);
    //PLUGIN METHODS
        var methods = {
            init : function () {
                this.bindEvents();
                this.addIndexId();
                this.makeStylable();
            },
            removeEditable : function (el) {
              if ($(el).is('[contenteditable="true"]')){
                  $(el).removeAttr('contenteditable');
              }     
            },
            makeEditable : function (el) {
              if ( $(el).is('[contenteditable="true"]') ){
                  $(el).removeAttr('contenteditable');
              } else {
                  $(el).attr('contenteditable', true);    
              }
            },
            addIndexId : function () {
              $this.each(function(index) {
                  $(this).attr('id','ce-'+index);
              });
            },
            getChildEls: function (el) {
                var childEls = [];
                $(el).children().each(function(index) {
                  var tagName = $(this).prop('tagName');
                    if (index > 0){
                        //don't want to style the style, since it has an index of 0, we get everything after it
                        childEls.push(tagName);
                    }
                });
                return childEls;
            },
            addChildElsToStyles: function (p) {
                var childEls = methods.getChildEls($(p));
                $.each(childEls, function(index, value) {
                  //where browser doesn't support scope, append the parent ID selector
                  var fallback = features.scoped == true ? '' : "#"+$(p).attr('id')+' ';
                    $(p).find('style').append(fallback+ value+'{} ');
                  });
            },
            makeStylable : function () {
              //need to also add a fallback for feature detection
              if(settings.stylable == true){
                  $this.each(function(index) {
                      var styleBlock = $(this).prepend('<style scoped></style>');
                      methods.addChildElsToStyles($(this));
                  });
              }
            },
            bindEvents : function () {
              $this.bind({
                dblclick: function() {
                    methods.makeEditable($(this));
                    $(this).focus();                                     
                  },
                mouseout: function() {
                  methods.removeEditable($(this));                
                  },
                focusout: function() {
                  methods.removeEditable($(this));                                       
                }
              });
            }
      };
       methods.init();
    };
  })( jQuery );
}
// Place any jQuery/helper plugins in here.
