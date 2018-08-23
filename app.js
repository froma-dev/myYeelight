(function (global) {
    var Mod = (function() {
        var modInstance;
        /**
        * Constructor
        **/
        function init(initParams) {
            var initParam1 = initParams.initParam1,
                initParam2 = initParams.initParam2,
                someParam1 = initParams.initParam1, 
                someParam2 = initParams.initParam2,
                mainContainer,
                subContent;
            
            (function (param1) {
                create();
            }("newSomParam1"));
            
            function create() {
                mainContainer = document.getElementById("main-container");
                subContent = document.createElement("div");
                subContent.classList.add("subcontent");
                
                mainContainer.appendChild(subContent);
            }

            function fn0() {
                console.log("fn0");
                debugger;
                anotherParam1 = "NEWEST";
            }

            function fn2(param1) {
                console.log("fn2");
                return ("+++" + param1);
            }
            function fn3(param1) {
                someParam2 = param1 + "+++";
            }
            function getSomeParam1(){
                return someParam1;
            }
            function getSomeParam2(){
                return someParam2;
            }
            function getAnotherParam1() {
                return anotherParam1;
            }

            return {
                fn0: fn0,
                fn2: fn2,
                fn3: fn3,
                getAnotherParam1: getAnotherParam1,
                getSomeParam1: getSomeParam1,
                getSomeParam2: getSomeParam2
            };
        }

        return {
            getInstance: function(initParams) {
                var params = initParams || {initParam1: "somParam1FromGetInstance", initParam2: "somParam2FromGetInstance"};
                if (!modInstance) {
                    modInstance = init(params);
                    debugger;
                    modInstance.fn0();
                }
                return modInstance;
            }
        }
    }())
    global.Mod = Mod;
}(window));