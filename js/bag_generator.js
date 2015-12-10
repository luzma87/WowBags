/**
 * Created by lmunda on 12/9/15.
 */

function createBag(attrs) {
    var slots = attrs.slots;
    var name = attrs.name;
    var icon = attrs.icon;
    var money = attrs.money;

    if (name.length > 15) {
        name = name.substring(0, 12) + "...";
    }

    var totalRows = Math.ceil(slots / 4);
    var createdSlots = 0;

    var $bag = $("<div class='bag ui-corner-all'></div>");

    var $header = $("<div class='bag-header'></div>");

    var $logo = $("<div class='bag-logo'></div>");
    var $image = $("<img src='" + icon + "' class='bag-logo-image'/>");
    $logo.html($image);
    var $name = $("<div class='bag-name'>" + name + "</div>");
    var $close = $("<div class='bag-close'></div>");

    $header.append($logo).append($name).append($close);

    var $content = $("<div class='bag-content'></div>");

    for (var row = 0; row < totalRows; row++) {
        if (createdSlots < slots) {
            var $row = $("<div class='bag-row'></div>");
            var clase1 = "middle";
            if (row == 0) {
                clase1 = "bottom";
            } else if (row == totalRows - 1) {
                clase1 = "top";
            }
            for (var slot = 0; slot < 4; slot++) {
                if (createdSlots < slots) {
                    var clase2 = " center";
                    var $slot = $("<div></div>");
                    if (slot == 0) {
                        clase2 = " right";
                    } else if (slot == 3 || createdSlots == slots - 1) {
                        clase2 = " left";
                    }
                    var clase = "bag-slot " + clase1 + clase2;
                    $slot.addClass(clase);
                    $row.append($slot);
                    createdSlots++;
                }
            }

            $content.prepend($row);
        }
    }

    $bag.append($header).append($content);

    if (money) {
        var $money = $("<div class='bag-money'></div>");
        var gold = money.gold || 0;
        var silver = money.silver || 0;
        var copper = money.copper || 0;

        var $gold = $("<div class='bag-money-gold'>" + gold + "</div>");
        var $silver = $("<div class='bag-money-silver'>" + silver + "</div>");
        var $copper = $("<div class='bag-money-copper'>" + copper + "</div>");

        $money.append($copper).append($silver).append($gold);

        $bag.append($money);
    }

    $("body").append($bag);
}