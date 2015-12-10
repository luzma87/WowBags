/**
 * Created by lmunda on 12/9/15.
 */

var totalSlots, createdSlots;
var totalRows;
var name, icon;
var money;

function createBag(attrs) {
    initParams(attrs);
    var $bag = $("<div class='bag ui-corner-all'></div>");
    $bag.append(createHeader()).append(createContent());
    if (money) {
        $bag.append(createMoney());
    }
    $("body").append($bag);
}

function initParams(attrs) {
    totalSlots = attrs.slots;
    name = attrs.name;
    icon = attrs.icon;
    money = attrs.money;

    if (name.length > 15) {
        name = name.substring(0, 12) + "...";
    }

    totalRows = Math.ceil(totalSlots / 4);
    createdSlots = 0;
}

function createHeader() {
    var $header = $("<div class='bag-header'></div>");

    var $logo = $("<div class='bag-logo'></div>");
    var $image = $("<img src='" + icon + "' class='bag-logo-image'/>");
    $logo.html($image);
    var $name = $("<div class='bag-name'>" + name + "</div>");
    var $close = $("<div class='bag-close'></div>");

    $header.append($logo).append($name).append($close);

    return $header;
}

function createContent() {
    var $content = $("<div class='bag-content'></div>");

    for (var row = 0; row < totalRows; row++) {
        if (createdSlots < totalSlots) {
            $content.prepend(createRow(row));
        }
    }
    return $content;
}

function createRow(currentRow) {
    var $row = $("<div class='bag-row'></div>");
    for (var slot = 0; slot < 4; slot++) {
        if (createdSlots < totalSlots) {
            $row.append(createSlot(currentRow, slot));
            createdSlots++;
        }
    }
    return $row;
}

function createSlot(currentRow, currentSlot) {
    var clase1 = "middle";
    if (currentRow == 0) {
        clase1 = "bottom";
    } else if (currentRow == totalRows - 1) {
        clase1 = "top";
    }

    var clase2 = " center";
    var $slot = $("<div></div>");
    if (currentSlot == 0) {
        clase2 = " right";
    } else if (currentSlot == 3 || createdSlots == totalSlots - 1) {
        clase2 = " left";
    }
    var clase = "bag-slot " + clase1 + clase2;
    $slot.addClass(clase);
    return $slot;
}

function createMoney() {
    var $money = $("<div class='bag-money'></div>");
    var gold = money.gold || 0;
    var silver = money.silver || 0;
    var copper = money.copper || 0;

    var $gold = $("<div class='bag-money-gold'>" + gold + "</div>");
    var $silver = $("<div class='bag-money-silver'>" + silver + "</div>");
    var $copper = $("<div class='bag-money-copper'>" + copper + "</div>");

    $money.append($copper).append($silver).append($gold);

    return $money;
}