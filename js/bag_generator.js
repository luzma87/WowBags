/**
 * Created by lmunda on 12/9/15.
 */

function createBag(slots, name, icon, money) {
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
            var clase = "middle";
            if (row == 0) {
                clase = "top";
            } else if (row == totalRows - 1) {
                clase = "bottom";
            }
            if (createdSlots % 4 == 0) {
                clase += " left";
            } else if (createdSlots % 4 == 3) {
                clase += " right";
            } else {
                clase += " center";
            }

            $content.append($row);
        }
    }

    $bag.append($header).append($content);

    $("body").append($bag);
}