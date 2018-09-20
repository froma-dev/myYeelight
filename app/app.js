(function (global) {
    var Toggle = (function() {
        var turnOnButtonElement = document.getElementById("turn-on-button"),
            turnOffButtonElement = document.getElementById("turn-off-button");
        turnOnButtonElement.addEventListener("click", function() {
            yee.setPower("on", "smooth", 10000);
        });
        turnOffButtonElement.addEventListener("click", function() {
            yee.setPower("off", "smooth", 10000);
        });
    }());

    var Cron = (function() {
        var turnOnButtonElement = document.getElementById("turn-off-cron");
        turnOnButtonElement.addEventListener("click", function() {
            console.log("turn off cron");
            ioRequest({url:"/api/yeelight/timeout/1"});
        });
    }());

    var Bright = (function() {
        var brightnessElement = document.getElementById("brightness-slider");
        brightnessElement.addEventListener("change", function(ev) {
            var brightness = Number(ev.target.value);
            ioRequest({method:"POST", url: "api/yeelight/sendCommand", body: {method:"set_bright", params: [brightness, "smooth", 500]} });
            //ioRequest({url:"/api/yeelight/turnon"});
        });
    }());

    var Clock = (function() {
        var clockElement = document.getElementsByClassName("clock");
        var time = Date().now;
    }());
    /*global.Mod = Mod;
    global.Toggle = Toggle;*/
    var colorPicker = new iro.ColorPicker("#color-picker-container", {
      // Set the size of the color picker UI
      width: 320,
      height: 320,
      // Set the initial color to red
      color: "#f00"
    });

    colorPicker.on("input:end", function() {
        var color = colorPicker.color.hexString;
        color = color.replace("#", "0x");
        debugger;
        color = Number(color);
        ioRequest({method:"POST", url: "api/yeelight/sendCommand", body: {method:"set_rgb", params: [color, "smooth", 500]} });
    });

    var App = function() {};
    var app = function() {
        return new App();
    };

    /*TODO testing purposes, delete*/
    var clockTimeElement = document.getElementsByClassName("clock__time")[0],
        today = new Date(),
        ss = today.getSeconds();

    setClockTime(clockTimeElement);

    var timeoutMs = (60-parseInt(ss)) * 1000;
    setTimeout(initializeClock, timeoutMs);

    function initializeClock(){
        setClockTime(clockTimeElement);
        setInterval(setClockTime.bind(this, clockTimeElement), 60000);
    }

    function setClockTime(element) {
        var today = new Date();
        var hh = today.getHours(),
            mm = today.getMinutes();

        if (hh < 10)
            hh = "0" + hh;
        if (mm < 10)
            mm = "0" + mm;

        element.innerHTML = hh + ":" + mm;
    }
    /*TODO testing purposes, delete**/

    App.prototype = {
        getAppId: function() {
            return 10010;
        },
        toggle: Toggle,
        bright: Bright,
        clock: Clock,
        cron: Cron
    };
    global.App = app;
}(window));