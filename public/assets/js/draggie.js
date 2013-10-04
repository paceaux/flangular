window.draggie = {
    init : function () {
        if (window.jQuery){
            console.log("draggie init");
            this.bindEvents();
            this.addGuiFeatures.init();
        }
    },
    bindEvents: function () {
        console.log('binding');
        $('[name="setCols"]').change( function (e) {
            var val = $(this).val();
            if (val != "two"){
                draggie.switchLayout(val);
            }
        });
        $('.twoColSelect').change(function (e) {
            var val = "two";
            var side = $(this).val();
            draggie.switchLayout(val,side);
        });
        $('#controls').draggable(function(e) {
            console.log('draggable')
        });
        $('.navTypes').change(function (e) {
        	$(this).next().show();
        });
        $('.addNav').click(function (e) {
        	var val = $(this).prev('select').val();
        	draggie.ctrlFunctions.addNav(val);
        });
    },
    addGuiFeatures: {
    	init: function() {
            if (window.jQuery){
                this.itemDelButton();
                this.navDelButton();
                this.wrapperOptions();
                this.bindGuiEvents();
            }
    	},
    	itemDelButton: function () {
    		$('.sidebar, nav, h1, form').each(function (index) {
    			$(this).addClass('delItem').prepend('<span class="delItem__button">X</span>');
    		});
    	},
    	navDelButton: function () {
    		$('nav').each(function (index) {
    			if(!$(this).is('.delItem')){
    				$(this).addClass('delItem').prepend('<span class="delItem__button">X</span>');
    			}
    		});
    	},
        wrapperOptions: function () {
            $('.features').each(function (index) { 
                $(this).addClass('classable').prepend('<span class="stack">Stack</span>');
            });
        },
    	bindGuiEvents: function () {
    		$('span.delItem__button').click(function (e) {
    			$(this).parent().detach();
    		});
            $('.features.classable span.stack').click(function (e) {
                if ($(this).parents('.classable').hasClass('stack')== true){
                    $(this).parents('.classable').removeClass('stack');
                } else{
                    $(this).parents('.classable').addClass('stack');
                }
            });
    	}
    },
    ctrlFunctions:  {
    	addNav: function (val) {
    		var navData = draggie.ctrlFunctions.getNavData(val);
    		console.log(navData);
    		$(navData.loc).append('<nav class="'+navData.classes+'"><ul><li>new nav</li></ul></nav>');
    		draggie.addGuiFeatures.navDelButton();
    	},
    	getNavData: function (navData) {
    		var theOption = $('.navTypes').find('option[value="'+navData+'"]');
    		var optData = {
    			side: $(theOption).attr('data-side'),
    			type: $(theOption).attr('data-type'),
    			loc: $(theOption).attr('data-loc'),
    			classes: $(theOption).attr('data-nav')
    		};
    		return optData;
    	}
    },
    bindEvents: function () {
        if (window.jQuery){
            $("nav").sortable({
                items:'li',
                connectWith: '.globalHeader__topNav, .sidebar__nav',
                refresh: true,
                toArray:true
              });
            $( "section.main" ).sortable();
            $('form.employee').sortable({
                items: 'fieldset',
                refresh: true,
                toArray: true
            });
            $( ".sidebar--left" ).sortable({
                items: 'nav, h1',
                connectWith:'.siebar--right',
                refresh: true,
                toArray:true
            });
            $("section.side").sortable({
                items: 'article',
                connectWith:'section.main > aside, .features',
                refresh: true,
                toArray:true
            });

            $( "section.main" ).disableSelection();
    }
    },
    layoutInfo: {
    	navigations: {

    	},
        columns: {
            colCount: "three",
            main:  {
                name: 'main',
                slf: $('section.main'),
                papa: $('section.main').parent(),
                state: "shown"
            },
            rht: {
                name: 'rht',
                slf: $('section.main .right.side'),
                papa: $('section.main .right.side').parent(),
                state: "shown"            
            } ,
            lft: {
                name: 'lft',
                slf: $('.left.side'),
                papa: $('.left.side').parent(),
                state: "shown"
            } 
        }
    },
    functions: {
        switchColumns: {
            one: function () {
                draggie.functions.leftCol();
                draggie.functions.rightCol();
                draggie.layoutInfo.columns.colCount = "one";
            },
            two: function (side) {
                var side = side+"Col";
                draggie.functions[side]();
                draggie.layoutInfo.columns.colCount = "two";
            
            },
            three: function () {
                draggie.functions.leftCol();
                draggie.functions.rightCol(); 
                draggie.layoutInfo.columns.colCount = "three";           
            },
        },
        leftCol: function (state) {
            var theCol = draggie.layoutInfo.columns.lft.slf;
            var colName = draggie.layoutInfo.columns.lft.name;
            var myState = draggie.layoutInfo.columns.lft.state;
            //if it's already shown, we should hide
            if (myState == "shown"){
                var theCode = $(theCol)[0].outerHTML;
                sessionStorage.setItem( colName, theCode);
                $(theCol).remove();
                draggie.layoutInfo.columns.lft.state = "hidden";
            } 
            if (myState == "hidden") {
                var theCode = draggie.storage.get('session', colName);
                var theParent = draggie.layoutInfo.columns.lft.papa;
                draggie.layoutInfo.columns.lft.slf = $(theParent).prepend(theCode);
                console.log(draggie.layoutInfo.columns.lft.slf);
                draggie.layoutInfo.columns.lft.state = "shown";
            }
            console.log(draggie.layoutInfo.columns);
        },
        rightCol: function (state) {
            var theCol = draggie.layoutInfo.columns.rht.slf;
            var colName = draggie.layoutInfo.columns.rht.name;
            var myState = draggie.layoutInfo.columns.rht.state;
            //if it's already shown, we should hide
            if (myState == "shown"){
                var theCode = $(theCol)[0].outerHTML;
                sessionStorage.setItem( colName, theCode);
                $(theCol).remove();
                draggie.layoutInfo.columns.rht.state = "hidden";
            } 
            if (myState == "hidden") {
                var theCode = draggie.storage.get('session', colName);
                var theParent = draggie.layoutInfo.columns.rht.papa;
                draggie.layoutInfo.columns.rht.slf = $(theParent).prepend(theCode);
                console.log(draggie.layoutInfo.columns.rht.slf);
                draggie.layoutInfo.columns.rht.state = "shown";
            }
            console.log(draggie.layoutInfo.columns);
        },
    },
    switchLayout : function (col, side) {
        if (draggie.layoutInfo.columns.colCount != col) {
            draggie.functions.switchColumns[col](side);
            draggie.bindEvents();
        }
        if (draggie.layoutInfo.columns.colCount == "two"){
            console.log("still two");
            draggie.functions.switchColumns[col](side);
            draggie.bindEvents();
        }
        console.log(draggie.layoutInfo);
    }
    
};
window.draggie.init();