/**
 * Created by lmunda on 12/9/15.
 */
$.widget("lzm.bag", {
    // default options
    options : {
        slots : 6,
        name  : "Linen bag",
        icon  : "images/bags/linen_6.jpg",
        money : false,

        // callbacks
        change : null,
        random : null
    },

    // the constructor
    _create : function () {
        if (name.length > 15) {
            this.options.name = this.options.name.substring(0, 12) + "...";
        }

        this._totalSlots = this.options.slots;
        this._totalRows = Math.ceil(this._totalSlots / 4);
        this._createdSlots = 0;
        this.bag = this.element;
        this.bag.addClass('bag ui-corner-all');

        this.bag.append(this._createHeader()).append(this._createContent());
        if (this.options.money) {
            this.bag.append(this._createMoney());
        }

        this._makeBagDraggable();
        this._makeBagClosable();
    },

    _createHeader : function () {
        var $header = $("<div class='bag-header'></div>");

        var $logo = $("<div class='bag-logo img-circle js-handle'></div>");
        var $image = $("<img src='" + this.options.icon + "' class='bag-logo-image img-circle'/>");
        $logo.html($image);
        var $name = $("<div class='bag-name js-handle'>" + this.options.name + "</div>");
        var $close = $("<div class='bag-close js-link'></div>");

        $header.append($logo).append($name).append($close);
        return $header;
    },

    _createContent : function () {
        var $content = $("<div class='bag-content'></div>");

        for (var row = 0; row < this._totalRows; row++) {
            if (this._createdSlots < this._totalSlots) {
                $content.prepend(this._createRow(row));
            }
        }
        return $content;
    },

    _createRow : function (currentRow) {
        var $row = $("<div class='row slot-height'></div>");
        for (var slot = 0; slot < 4; slot++) {
            if (this._createdSlots < this._totalSlots) {
                $row.append(this._createSlot(currentRow, slot));
                this._createdSlots++;
            }
        }
        return $row;
    },

    _createSlot : function (currentRow, currentSlot) {
        var clase1 = "middle-row";
        if (currentRow == 0) {
            clase1 = "bottom-row";
        } else if (currentRow == this._totalRows - 1) {
            clase1 = "top-row";
        }

        var clase2 = " center-slot";
        var $slot = $("<div></div>");
        if (currentSlot == 0) {
            clase2 = " right-slot";
        } else if (currentSlot == 3 || this._createdSlots == this._totalSlots - 1) {
            clase2 = " left-slot";
        }
        var clase = "col-md-3 pull-right slot-height " + clase1 + clase2;
        $slot.addClass(clase);
        return $slot;
    },

    _createMoney : function () {
        var $money = $("<div class='bag-money'></div>");

        var $gold = $("<div class='bag-money-gold pull-right'>" + this.options.money.gold + "</div>");
        var $silver = $("<div class='bag-money-silver pull-right'>" + this.options.money.silver + "</div>");
        var $copper = $("<div class='bag-money-copper pull-right'>" + this.options.money.copper + "</div>");

        $money.append($copper).append($silver).append($gold);

        return $money;
    },

    _makeBagDraggable : function () {
        this.bag.draggable({
            handle      : ".js-handle",
            containment : "parent",
            snap        : ".bag",
            snapMode    : "outer"
        });
    },

    _makeBagClosable : function () {
        this.bag.find(".bag-close").on("click", function () {
            $(this).parents(".bag").hide();
        });
    },

    // a public method to change the color to a random value
    // can be called directly via .colorize( "random" )
    random : function (event) {
        var colors = {
            red   : Math.floor(Math.random() * 256),
            green : Math.floor(Math.random() * 256),
            blue  : Math.floor(Math.random() * 256)
        };

        // trigger an event, check if it's canceled
        if (this._trigger("random", event, colors) !== false) {
            this.option(colors);
        }
    },

    // events bound via _on are removed automatically
    // revert other modifications here
    _destroy : function () {
        // remove generated elements
        this.changer.remove();

        this.element
            .removeClass("custom-colorize")
            .enableSelection()
            .css("background-color", "transparent");
    },

    // _setOptions is called with a hash of all options that are changing
    // always refresh when changing options
    _setOptions : function () {
        // _super and _superApply handle keeping the right this-context
        this._superApply(arguments);
        this._refresh();
    },

    // _setOption is called for each individual option that is changing
    _setOption : function (key, value) {
        // prevent invalid color values
        if (/red|green|blue/.test(key) && (value < 0 || value > 255)) {
            return;
        }
        this._super(key, value);
    }
});