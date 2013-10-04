/*!
* Forminator T100: Protect all your form inputs from bad internet connections and an angry John Connor
* @requires Jquery v1.4 or above
*
* Copyright (c) 2012 Frank M. Taylor
* Dual licensed under MIT and GPL licenses 
* http://opensource.org/licenses/MIT
* http://www.gnu.org/licenses/gpl.html
* version 0.1.0
*/
/*
*   USAGE
*   1. apply .forminator() to any form
*   2. include optional arguments for which selectors you want, whether we store on name or id, and clear button
*/
/*   VERSIONS
*       0.1.0 - First working version
*       0.2.0 - Turned into a jQuery plugin
*       0.2.1 - Actually got the storedFields argument working, fixed the range field
*/
;(function ( $ ) {
    $.fn.forminator = function(storedFields, storageKey, clearButton) {
        form = this;    
        // CAPTURE FORM DATA
        $(form).children(storedFields).keyup(function(event){ 
            var name = $(form).attr("id")+"-" + $(this).attr(storageKey);
            var value = $(this).val();
            localStorage.setItem(name, value);
            currentval = $(this).val();
        });
        //use this for the input slider - since it doesn't use the keyboard
        $(form).children('[type="range"]').mousemove(function(event){
            var name = $(form).attr("id") +"-"+ $(this).attr(storageKey);
            var value = $(this).val();
            localStorage.setItem(name, value);
            currentval = $(this).val();
        });
        //LOAD FORM DATA
        $(form).children(storedFields).each(function(event) {
            var fieldkey = $(form).attr("id") + "-" + $(this).attr(storageKey);
            var fieldval = localStorage.getItem(fieldkey);
            $(this).val(fieldval);
        });
        $(clearButton).click(function(event){
            localStorage.clear();    
        });
    };
})(jQuery);