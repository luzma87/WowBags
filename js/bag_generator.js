/**
 * Created by lmunda on 12/9/15.
 */
$.widget("lzm.bag", {
    // default options
    options : {
        slots     : 6,
        name      : "Linen bag",
        icon      : "images/bags/linen_6.jpg",
        money     : false,
        draggable : true,
        closable  : true,
        class     : ""
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
        this.bag.addClass('bag ui-corner-all')
            .addClass(this.options.class);

        this.bag.append(this._createHeader()).append(this._createContent());
        if (this.options.money) {
            this.bag.append(this._createMoney());
        }
        if (this.options.draggable) {
            this._makeBagDraggable();
        } else {
            this.bag.find(".js-handle").removeClass("js-handle");
        }
        if (this.options.closable) {
            this._makeBagClosable();
        } else {
            this.bag.find(".bag-close").remove();
        }
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
    }
});