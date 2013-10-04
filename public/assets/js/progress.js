progressNote = {
    init: function () {
        this.addMeter();
        this.bindEvents();
    },
    bindEvents: function () {
        $('.itemList').on('click','.listBox', function (e) {
            var listGroup = $(this).parents('.itemList');
            var totalItems = $(listGroup).find('.listBox').length;
            progressNote.updateMeter(e);
            
        });    
    },
    helpers: {
        totalItems: function (el) {
            var totalItems = $(el).find('.listBox').length;
            return totalItems;                
        },
        checkedItems: function (e) {
            var self = e.currentTarget;
            var papaSelf = $(self).parents('.itemList');
            var checkedItems = $(papaSelf).find('.listBox:checked').length;
            return checkedItems;
        }    
    },
    updateMeter: function (e) {
           var checkedItems =  progressNote.helpers.checkedItems(e);  
            var self = e.currentTarget;
           var meter = $(self).parents('.itemList').find('.progress');
        $(meter).val(checkedItems);
    },
    addMeter: function () {
        $('.itemList').each(function (index, el){
            var items = progressNote.helpers.totalItems(el);
            var id =  $(el).attr('id');
            var attrs = {
                id: 'progres-'+id,
                class: 'progress',
                val: 0,
                min: 0,
                max: items
            };
            $(el).find('legend').append('<meter>');  
            $(el).find('meter').attr(attrs);
        } );  
    }
}

progressNote.init();