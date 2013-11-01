window.cssom = {
    init: function () {
        var _this = window.cssom;
        _this.functions.bootstrapTable();
    },
    data: {
        rootClass: "CSSOM",
        tableClass: "table",
        buttonText: {
            disabled: "Disabled",
            enabled: "Enabled"
        }
    },
    events: {
        buttonToggle: function (e) {
            var _this = window.cssom,
                buttonText = _this.data.buttonText,
                el = e.target,
                state = el.getAttribute('data-state'),
                sheetIndex = el.getAttribute('data-stylesheet');
            if (state === "enabled") {
                el.setAttribute("data-state", "disabled");
                el.innerHTML = buttonText.disabled;
                _this.functions.toggleStyleSheet(sheetIndex);
            } else {
                el.setAttribute("data-state", "enabled");
                el.innerHTML = buttonText.enabled;
                _this.functions.toggleStyleSheet(sheetIndex);
            }
        }
    },
    helpers: {
        setupTableWrapper: function () {
            var _this = window.cssom,
                wrapper = document.createElement('div');
            wrapper.className = _this.data.rootClass;
            _this.data.tableWrapper = wrapper;
        },
        setupTable: function () {
            var _this = window.cssom,
                table = document.createElement('table'),
                tBody = document.createElement('tbody');
            table.appendChild(tBody);
            table.className = _this.data.rootClass + "__" + _this.data.tableClass;
            _this.data.table = table;
        },
        addTableToWrap: function () {
            var _this = window.cssom;
            _this.data.tableWrapper.appendChild(_this.data.table);
            document.body.appendChild(_this.data.tableWrapper);
        },
        addRowData: function (row, styleSheet) {
            var _this = window.cssom,
                h = row.insertCell(0),
                t = row.insertCell(1),
                d = row.insertCell(2);
            if (styleSheet !== undefined) {
                var ref = styleSheet.href !== undefined ? styleSheet.href : "nada",
                    title = styleSheet.title !== undefined ? styleSheet.title : "",
                    disabled = styleSheet.disabled !== undefined ? styleSheet.disabled : false,
                    sheetIndex = row.getAttribute('data-index');
                ref = document.createTextNode(ref);
                title = document.createTextNode(title);
                disabled = _this.functions.createButton(sheetIndex);
                h.appendChild(ref);
                t.appendChild(title);
                d.appendChild(disabled);
            }
        },
        setupRows: function () {
            var _this = window.cssom,
                table = _this.data.table,
                styleSheets = document.styleSheets,
                i = 0;
            for (var styleSheet in styleSheets) {
                if (styleSheet !== undefined) {
                    var row = table.insertRow(i), 
                        sheet = styleSheets[i];
                    row.setAttribute('data-index', i);
                    _this.helpers.addRowData(row, sheet);
                    i++;
                }
            }
        }
    },
    functions: {
        bootstrapTable: function (){
            var _this = window.cssom;
            _this.helpers.setupTableWrapper();
            _this.helpers.setupTable();
            _this.helpers.setupRows();
            _this.helpers.addTableToWrap();
        },
        createButton: function (sheetIndex){
            var _this = window.cssom,
                buttonText = _this.data.buttonText,
                b = document.createElement('button');
            b.innerHTML = buttonText.enabled;
            b.addEventListener('click', _this.events.buttonToggle);
            b.setAttribute("data-state", "enabled");
            b.setAttribute('data-stylesheet', sheetIndex)
            return b;
        },
        toggleStyleSheet: function (sheetIndex) {
            var styleSheet = document.styleSheets[sheetIndex];
            if (styleSheet.disabled === true) {
                styleSheet.disabled = false;
            } else {
                styleSheet.disabled = true;
            }
        }
    }
};
window.cssom.init();