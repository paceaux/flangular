window.storage = {
            init: function () {
            if (window.jQuery){
                    console.log('storage init');
                }
            },
            test: function() {
                try{

                } catch (e) {
                    return false;
                }
            },
            types: [localStorage,sessionStorage],
            convertValue: function (v) {
                if (typeof v == "object" ){
                    var v = JSON.stringify(v);
                }
                return v;
            },
            unconvertValue: function (v) {
                if ( v.indexOf("{") === 0){
                    var v = JSON.parse(v);
                }
                return v;
            },
            contentObj: function (title,content,expy) {
                this.title = title;
                this.content = content;
                this.expy = expy;
            },
            set: function (type, k, v) {
                var v = this.convertValue(v);
                window.storage.types[type].setItem(k,v); 
            },
            get: function (type, k) {
                var v = window.storage.types[type].getItem(k);
                return    this.unconvertValue(v);
            },
            del: function (type, k){
                window.storage.types[type].removeItem(k);       
            },
            clr: function (type){
                window.storage.types[type].clear();
            },
        };
window.notes = {
    init: function () {
        var self = window.notes;
        if (window.jQuery){
            console.log(' notes init');
            self.bindEvents();
            self.bindUI();
        }
    },
    bindUI: function () {
        $('.note').draggable({handle: "header"});        
    },
    bindEvents: function () {
        var self = window.notes;
        $('#showNotes').on('click', function (e) {
            if ($(this).is('.hiding')){
                self.showStorage();    
                self.helpers.showNotes();

            } else {
                self.hideNotes();
            }
        });
        $('#newNote').on('click', function (e) {
            self.createBlank();
            self.helpers.showNotes();
        });
        $('.note').on('blur', '.note__header__summary', function (e) {
            console.log('blurred summary');
            var val = $(this).html();
            self.setKey(e.currentTarget,val);
            var noteData = self.prepareNoteData(e);
            self.storeNote(noteData); 
        });
        $('.note').on('blur ', '.note__details', function (e) {
            console.log('blured details')
            var key = $(this).attr('data-key');
            var noteData = self.prepareNoteData(e);
            self.storeNote(noteData);                    

        });
        $('.note').on('click','.note__header__delete', function (e){
            var key = $(this).attr('data-key');
            self.storage.del(0,key);
            $(this).parents('.note').remove()
        });
        $('.note').on('change','.note__footer__expy', function (e) {
            var noteData = self.prepareNoteData(e);
            self.storeNote(noteData);  
        });
        $('#overlay').on('click', function (e) {
            self.helpers.hideNotes();
        });
    },
    helpers: {
        showNotes: function () {
            $('#overlay, #notes').show();
            $('#showNotes').removeClass('hiding').addClass('showing');
            $('#showNotes').html('Hide Notes');                
        },
        hideNotes: function () {
            $('#overlay, #notes').hide()
                $('#showNotes').removeClass('showing').addClass('hiding');
                $('#showNotes').html('Show Notes');
        }
    },
    showStorage: function () {
        var self=window.notes;
        for (var i in window.localStorage){
            var key = localStorage.getItem(i);
            var val = window.storage.get(0,i);
            if (self.checkExpired(val) == false){
                var storedItem = '<div class="note" data-key="'+i+'"><header class="note__header">';
                storedItem += '<button class="note__header__delete" data-key="'+i+'">X</button>';
                storedItem += '<input class="key note__header__summary" data-key="'+i+'" tabindex val='+i+'></header>';
                storedItem += '<textarea class="val note__details" data-key="'+i+'" tabindex >'+val.content+'</textarea>';
                if (val.expy != "none") {
                    storedItem += '<footer class="note__footer"><p>Expires  '+val.expy;
                    storedItem += '</p></footer>';
                }
                storedItem += '</div>';
                $('#notes').append(storedItem);
            
            } else {
                window.storage.del(0,i);
            }
            self.bindUI();
        }
    },
    createBlank: function () {
        var self=window.notes;
        var tp = new Date();
        timestamp = tp.getMonth() + '-'+tp.getDate()+'-'+tp.getYear();
        var blankNote = '<div class="blank note" data-timestamp="'+timestamp+'">';
        blankNote += '<header class="note__header">';
        blankNote += '<button class="note__header__delete" data-key="'+tp+'">X</button>';
        blankNote += '<input class="note__header__summary" tabindex /></header>';
        blankNote += '<textarea class="note__details" data-key="'+timestamp+'" tabindex></textarea>';
        blankNote += '<footer class="note__footer">';
        blankNote += '<input type="date" class="note__footer__expy" name="expy" />';
        blankNote += '</footer></div>';

        var appendBlank = $('#notes').append(blankNote);
        self.bindUI();
    },
    setKey: function (selector,val) {
        $(selector).parents('.note').attr('data-key',val);
        $(selector).parents('.note').find('.note__header__summary, .note__header__delete, .note__details').attr('data-key', val);
    },
    prepareNoteData: function (e){
        noteData = {
            title: $(e.currentTarget).parents('.note').find('.note__header__summary').text(),
            content: $(e.currentTarget).parents('.note').find('.note__details').html(),
            expy : $(e.currentTarget).parents('.note').find('.note__footer__expy').val()
        }
        console.log(noteData);
        return noteData;
    },
    storeNote: function (noteData){
        var self=window.notes;
        console.log('storeNote');
        if (noteData.expy != ""){
            var year = noteData.expy.slice(0,4);
            var month = noteData.expy.slice(5,7);
            var day = noteData.expy.slice(8, 10);
            var dateObj = new Date(year, month-1, day);
            var noteDataObj =  new window.storage.contentObj(noteData.title,noteData.content,dateObj);
        } else {
            var noteDataObj = new window.storage.contentObj(noteData.title, noteData.content, "none");
        }
        window.storage.set(0,noteData.title, noteDataObj);        
    },
    checkExpired: function (val) {
        if(val.expy != "none"){
            var expyObj = new Date(val.expy);  
            var today = new Date();
            if (expyObj < today ) {
                return true;
            } else {
                return false;
            }
        }
        else {
            return false
        }
    }
}
window.notes.init();
