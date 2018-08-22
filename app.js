(function (global) {
    var modInstance;
    function init(initParams) {
        debugger;
        var initParam = initParams.initParam;
        var _this = this;
        function fn1(param1) {
            this.t = param1;
            console.log(this.t);
            debugger;
            this.fn2(this.t);
            console.log("this.2 ===>" + this.t);
            
        }
        
        function fn2(param1) {
            return ("+++" + param1);
        }
        
        function fn3(param1) {
            this.t = param1 + "+++";
        }
        
        
        return {
            fn1: fn1,
            fn3: fn3
        };
    }
    
    function getInstance() {
        if (!modInstance) {
            modInstance = init({initParam: "somParamFromGetInstance"});
        }
        return modInstance;
    }
    global.mod = getInstance;
}(window));