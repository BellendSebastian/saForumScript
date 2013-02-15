/*global window, console, $, localStorage*/
(function () {
    "use strict";

    var commandBar = $("<input id='command-bar' type='text' placeholder='Enter command&hellip;'>"),
        localStorageItem = "saForumList";

    var positionBar = function () {
        var bar = $("#command-bar"),
            w = 1,
            h = 1;
    };

    var buildForumList = function () {
        var listItems = $("select[name=\"forumid\"]"),
            tForums = [];
        $.each(listItems.find('option'), function (i, v) {
            if ($(v).val() !== "-1") {
                var t = {
                    forumId: $(v).val(),
                    forumText: $(v).html().replace(/(-)/g, '')
                };
                forums.push(t);
            }
        });
        localStorage.setItem(localStorageItem, JSON.stringify(tForums));
    };

    var getForumList = function () {
        return JSON.parse(localStorage.getItem(localStorageItem));
    };

    var checkForForumList = function () {
        if (localStorage.getItem(localStorageItem) === null) {
            console.log("no forum list");
            if ($("select[name=\"forumid\"]").length > 0) {
                buildForumList();
            } else {
                console.log("cannot build forum list");
            }
        } else {
            console.log("forum list exists");
        }
    };

    var debugDropListing = function () {
        localStorage.removeItem(localStorageItem);
        console.log("Removing " + localStorageItem + " from localStorage.");
    };

    var init = function () {
        checkForForumList();
        $("body").append(commandBar);
        $("#command-bar").hide();
        positionBar();
        window.addEventListener("keydown", function (e) {
            if (e.ctrlKey === true && e.keyCode === 32) {
                $("#command-bar").fadeIn(100).val("").focus();
            } else if (e.keyCode === 27) {
                $("#command-bar").fadeOut(100);
            }
        });
        console.log(getForumList());
        $("#command-bar").autocomplete({
            minLength: 0,
            source: getForumList,
            focus: function (event, ui) {
                console.log(ui);
                return false;
            },
            select: function (event, ui) {
                console.log(event, ui.item);
                return false;
            }
        });
    };

    init();
}());
