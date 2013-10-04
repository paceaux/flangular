window.clickMenu = {
    init: function () {
        console.log('clickMenu init');
        this.bindEvents();    
        this.functions.addMenu();
    },
    data:  {
        wrapper: $('<div class="myMenu"></div>'),
        functionList: [
            {
                title: "Edit Styles",
                click: "blah"
            },
            {
                title: "Make Note",
                click: "paceaux.notes.createBlank()"
            }
        ]
    }, 
    helpers: {
        setCoords: function (x, y) {
            $('.myMenu').css(
                {
                    top: y-10,
                    left: x-10
                }
            )
        },
        showMenu: function () {
            $('.myMenu').show();
        },
        hideMenu: function () {
            $('.myMenu').hide()
        },
        menuItems: function () {
            var list = window.clickMenu.data.functionList, 
                myList = $('<ul class="myMenu__list"></ul>');
            for (var i in list) { 
                $(myList).append('<li class="myMenu__list__item onclick('+list[i].click+')">'+list[i].title+'</li>');
            }
             return myList 
        }
        
    },
    bindEvents: function () {
        var self = window.clickMenu
        $('main').on('contextmenu', function (e) {
            e.preventDefault();
            var targetEl = e.target;
            self.helpers.setCoords(e.clientX, e.clientY);
            self.helpers.showMenu();
        });
        $('body').on('mouseover', '.myMenu', function (e) {
            e.preventDefault();
            self.helpers.showMenu();
        });
        $('body').on('mouseout', '.myMenu', function (e) {
            self.helpers.hideMenu();
        });
    },
    functions:  {
        addMenu: function () {
            var self = window.clickMenu
            var wrapper = self.data.wrapper,
                items = self.helpers.menuItems(),
                menu = $(wrapper).append(items);
            $('body').append(menu);
        }
    }
}
window.clickMenu.init()


