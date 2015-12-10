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
        this._bag = this.element;
        this._bag.addClass('bag ui-corner-all')
            .addClass(this.options.class);

        this._bag.append(this._createHeader()).append(this._createContent());
        if (this.options.money) {
            this._bag.append(this._createMoney());
        }
        if (this.options.draggable) {
            this._makeBagDraggable();
        } else {
            this._bag.find(".js-handle").removeClass("js-handle");
        }
        if (this.options.closable) {
            this._makeBagClosable();
        } else {
            this._bag.find(".bag-close").remove();
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
        var clase = "col-md-3 pull-right item-slot slot-height " + clase1 + clase2;
        $slot.addClass(clase);
        this._makeSlotDroppable($slot);
        return $slot;
    },

    _makeSlotDroppable : function ($slot) {
        var moveOldItem = function ($oldItem) {
            if (this._originSlot.hasClass("occupied")) {
                this.addItem($oldItem);
            } else {
                this._originSlot.append($oldItem);
                this._originSlot.addClass("occupied");
            }
        };
        $slot.droppable({
            revert : "invalid",
            drop   : function (event, ui) {
                var $this = $(this);
                var $item = ui.draggable;
                if ($this.hasClass("occupied")) {
                    moveOldItem($this.children());
                }
                $this.append($item);
                $item.css({
                    top  : 0,
                    left : 0
                });
                $this.addClass("occupied");
            }
        });
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
        this._bag.draggable({
            handle      : ".js-handle",
            containment : "parent",
            snap        : ".bag",
            snapMode    : "outer"
        });
    },

    _makeBagClosable : function () {
        this._bag.find(".bag-close").on("click", function () {
            $(this).parents(".bag").hide();
        });
    },

    addItem : function (item) {
        var $slot = this._bag.find(".item-slot").not(".occupied").first();
        var $item = this.createItem(item);
        $slot.html($item).addClass("occupied");
    },

    createItem : function (item) {
        var $item = $("<div class='item ui-corner-all js-handle'></div>");
        var $img = $("<img class='img-rounded item-image slot-height' src='" + item.icon + "'/>");
        $item.html($img);
        this._addItemTooltip($item, item);
        this._makeItemDraggable($item);
        return $item;
    },

    _addItemTooltip : function ($item, item) {
        $item.tooltip({
            html      : true,
            placement : "auto",
            title     : function () {
                var html = "<div class='item-name " + item.rarity + "'>" + item.name + "</div>";
                html += "<div class='item-level'>Item Level " + item.level + "</div>";
                if (item.bop) {
                    html += "<div class='item-bop'>" + item.bop + "</div>";
                }
                if (item.slot) {
                    html += "<div class='item-slot'>" + item.slot + "</div>";
                }
                if (item.unique) {
                    html += "<div class='item-unique'>Unique</div>";
                }
                if (item.slots) {
                    html += "<div class='item-slots'>" + item.slots + " Slot Bag</div>";
                }
                if (item.requires) {
                    html += "<div class='item-requires'>Requires " + item.requires + "</div>";
                }
                return html;
            }
        });
    },

    _makeItemDraggable : function ($item) {
        var setOriginSlot = function ($slot) {
            this._originSlot = $slot;
        };
        $item.draggable({
            snap     : ".item-slot ",
            snapMode : "inner",
            stack    : ".item",
            start    : function (event, ui) {
                setOriginSlot($(this).parent());
                $(this).closest(".item-slot").removeClass("occupied");
                $item.tooltip('hide')
            },
            drag     : function () {
                $item.tooltip('hide');
            }
        });
    }
});