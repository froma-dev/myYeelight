/**
* Yeelight API
**/
(function(global) {
	global.yee = {

		/**
		 * @param {array} params - List of parameters to check
		 * @description Retrieves current property of the smart led.
		 **/
		getProp: function(params) {
			ioRequest({
				method:"POST",
				url: "api/yeelight/sendCommand",
				body: {
					method: CONST.METHOD.GET_PROP,
					params: params || []
				}
			});
		},
		/**
		 * @param {number} ctVal - Color temperature value(ms). range: 1700 ~ 6500 (k)
		 * @param {string} effect - Changing effect. values: "sudden" || "smooth"
		 * @param {number} duration - Total time of gradual change (ms). min=30ms
		 * @param {string} [method] - Method to execute.
		 * @description Changes the color temperature of the smart led.
		 **/
		setCtAbx: function(ctVal, effect, duration, method) {
			var val = ctVal,
				eff = effect || CONST.EFFECT.SMOOTH,
				dur = duration || 500;
			ioRequest({
				method:"POST",
				url: "api/yeelight/sendCommand",
				body: {
					method: method || CONST.METHOD.SET_CT_ABX,
					params: [val, eff, dur]
				}
			});
		},

		/**
		 * @param {number} rgbVal - RGB color expressed in decimal integer. range 0 - 16777215
		 * @param {string} effect - Changing effect.
		 * @param {number} duration - Total time of gradual change (ms). min=30ms
		 * @param {string} [method] - Method to execute.
		 * @description Changes the color of the smart led.
		 **/
		setRgb: function(rgbVal, effect, duration, method) {
			var val = rgbVal,
				eff = effect || CONST.EFFECT.SMOOTH,
				dur = duration || 500;
			ioRequest({
				method:"POST",
				url: "api/yeelight/sendCommand",
				body: {
					method: method || CONST.METHOD.SET_RGB,
					params: [val, eff, dur]
				}
			});
		},

		/**
		 * @param {number} hueVal - Hue value. range: 0 - 359.
		 * @param {number} satVal - Saturation value. range: 0 - 100.
		 * @param {string} effect - Changing effect. values: "sudden" || "smooth"
		 * @param {number} duration - Total time of gradual change (ms). min=30ms
		 * @param {string} [method] - Method to execute.
		 * @description Changes the color of the smart led.
		 **/
		setHsv: function(hueVal, satVal, effect, duration, method) {
			var val = hueVal,
				val2 = satVal,
				eff = effect || CONST.EFFECT.SMOOTH,
				dur = duration || 500;
			ioRequest({
				method:"POST",
				url: "api/yeelight/sendCommand",
				body: {
					method: method || CONST.METHOD.SET_HSV,
					params: [val, val2, eff, dur]
				}
			});
		},

		/**
		 * @param {number} brightnessVal - Brightness value. range: 1 - 100.
		 * @param {string} effect - Changing effect. values: "sudden" || "smooth"
		 * @param {number} duration - Total time of gradual change (ms). min=30ms
		 * @param {string} [method] - Method to execute.
		 * @description changes the brightness value of the smart led.
		 **/
		setBright: function(brightnessVal, effect, duration, method) {
			var val = brightnessVal,
				eff = effect || CONST.EFFECT.SMOOTH,
				dur = duration || 500;
			ioRequest({
				method:"POST",
				url: "api/yeelight/sendCommand",
				body: {
					method: method || CONST.METHOD.SET_BRIGHT,
					params: [val, eff, dur]
				}
			});
		},

		/**
		 * @param {string} powerVal - "on" or "off" value to switch on/off smart led.
		 * @param {string} effect - Changing effect. values: "sudden" || "smooth"
		 * @param {number} duration - Total time of gradual change (ms). min=30ms
		 * @param {number} [mode=0] - Turn on mode. range: 1.- CT, 2.- RGB, 3.- HSV, 4.- CF, Night light (ceiling light only)
		 * @param {string} [method] - Method to execute.
		 * @description Switches on or off the smart led.
		 **/
		setPower: function(powerVal, effect, duration, mode, method) {
			var val = powerVal,
				eff = effect || CONST.EFFECT.SMOOTH,
				dur = duration || 500,
				mod = mode || 0;
			ioRequest({
				method:"POST",
				url: "api/yeelight/sendCommand",
				body: {
					method: method || CONST.METHOD.SET_POWER,
					params: [val, eff, dur, mod]
				}
			});
		},

		/**
		 * @param {string} [method] - Method to execute.
		 * @description Toggles the smart led's state.
		 **/
		toggle: function(method) {
			ioRequest({
				method:"POST",
				url: "api/yeelight/sendCommand",
				body: {
					method: method || CONST.METHOD.TOGGLE
				}
			});
		},

		/**
		 * @param {string} [method] - Method to execute.
		 * @description Saves the current state of the smart led in persistent memory.
		 **/
		setDefault: function(method) {
			ioRequest({
				method:"POST",
				url: "api/yeelight/sendCommand",
				body: {
					method: method || CONST.METHOD.SET_DEFAULT
				}
			});
		},

		/**
		 * @param {number} count - total number of visible state changing before color flow stopped. (0 value is infinite loop)
		 * @param {number} action - Action taken after flow stops. values: 0.- returns to initial color before starting the cf, 1.- stays at the state when flow is stopped. 2.- turns off smart led after the flow stops.
		 * @param {string} flow - flow expression. [duration(min 50ms), mode(1.-color, 2.-CT, 7.-sleep), value(rgbVal or ctVal), brightness(-1 or 1 ~ 100)]
		 * @param {string} [method] - Method to execute.
		 * @description Starts a color flow (brightness, color, or ct changing). Can be used for scenes.
		 **/
		startCf: function(count, action, flow, method) {
			var val = count,
				act = action,
				cflow = flow;
			ioRequest({
				method:"POST",
				url: "api/yeelight/sendCommand",
				body: {
					method: method || CONST.METHOD.START_CF,
					params: [val, act, cflow]
				}
			});
		},

		/**
		 * @param {string} [method] - Method to execute.
		 * @description Stops a running CF.
		 **/
		stopCf: function(method) {
			ioRequest({
				method:"POST",
				url: "api/yeelight/sendCommand",
				body: {
					method: method || CONST.METHOD.STOP_CF
				}
			});
		},

		/**
		 * @param {string} sceneClass -
		 * @param {string} val1 -
		 * @param {string} val2 -
		 * @param {string} val3 -
		 * @param {string} [method] - Method to execute.
		 * @description
		 **/
		setScene: function(sceneClass, val1, val2, val3, method) {
			var sclass = sceneClass,
				scval1 = val1,
				scval2 = val2,
				scval3 = val3;
			ioRequest({
				method:"POST",
				url: "api/yeelight/sendCommand",
				body: {
					method: method || CONST.METHOD.SET_SCENE,
					params: [sclass, scval1, scval2, scval3]
				}
			});
		},

		/**
		 * @param {number} ctype - cron type can only be 0 (power off)
		 * @param {number} val - timer (minutes)
		 * @description start a timer job on the smart led.
		 **/
		cronAdd: function(type, val) {
			var ctype = type || 0,
				time = val;
			ioRequest({
				method:"POST",
				url: "api/yeelight/sendCommand",
				body: {
					method: CONST.METHOD.CRON_ADD,
					params: [ctype, time]
				}
			});
		},

		/**
		 * @param {number} type - cron job type (only 0 supported)
		 * @description retrieves the current cron job.
		 **/
		cronGet: function(type) {
			var ctype = type || 0;
			ioRequest({
				method:"POST",
				url: "api/yeelight/sendCommand",
				body: {
					method: CONST.METHOD.CRON_GET,
					params: [ctype]
				}
			});
		},

		/**
		 * @param {}  -
		 * @description Stops the specified cron job.
		 **/
		cronDel: function(type) {
			var ctype = type;
			ioRequest({
				method:"POST",
				url: "api/yeelight/sendCommand",
				body: {
					method: CONST.METHOD.CRON_DEL,
					params: [ctype]
				}
			});
		},

		/**
		 * @param {string} action - direction of the adjustment.
		 * @param {string} prop - Property to adjust.
		 * @param {string} [method] - Method to execute.
		 * @description Changes brightness, CT, or color without knowing the current value. (mainly for controllers)
		 **/
		setAdjust: function(action, prop, method) {
			var	act = action,
				property = prop;
			if(act !== CONST.ADJUST.ACTION.CIRCLE || act !== CONST.ADJUST.ACTION.DECREASE || act !== CONST.ADJUST.ACTION.INCREASE) {
				//TODO action not available
			}
			if(property === CONST.ADJUST.PROP.COLOR && act !== CONST.ADJUST.ACTION.CIRCLE){
				//TODO can't set a different action than circle.
			}
			ioRequest({
				method:"POST",
				url: "api/yeelight/sendCommand",
				body: {
					method: method || CONST.METHOD.SET_ADJUST,
					params: [act, property]
				}
			});
		},

		/**
		 * @param {number} action - turns on / off music mode. (1 || 0)
		 * @param {string} host - music server's address.
		 * @param {number} port - TCP port music app is listening on.
		 * @description Starts or stops music mode.
		 **/
		setMusic: function(action, host, port) {
			var act = action,
				shost = host,
				sport = port;
			ioRequest({
				method:"POST",
				url: "api/yeelight/sendCommand",
				body: {
					method: CONST.METHOD.SET_MUSIC,
					params: [act, shost, sport]
				}
			});
		},

		/**
		 * @param {string} name - Name of the device.
		 * @description Set the device's name.
		 **/
		setName: function(name) {
			var val = name;
			ioRequest({
				method:"POST",
				url: "api/yeelight/sendCommand",
				body: {
					method: CONST.METHOD.STOP_CF,
					params: [val]
				}
			});
		},

		/**
		 * @param {number} percentage - percentage to adjust. (-100 ~ 100)
		 * @param {number} duration - Total time of gradual change (ms). min=30ms
		 * @param {string} [method] - Method to execute.
		 * @description adjust brightness by specified percentage within the given duration.
		 **/
		adjustBright: function(percentage, duration, method) {
			var val = percentage,
				dur = duration;
			ioRequest({
				method:"POST",
				url: "api/yeelight/sendCommand",
				body: {
					method: method || CONST.METHOD.ADJUST_BRIGHT,
					params: [val, dur]
				}
			});
		},

		/**
		 * @param {number} percentage - percentage to adjust. (-100 ~ 100).
		 * @param {number} duration - Total time of gradual change (ms). (min=30ms)
		 * @param {string} [method] - Method to execute.
		 * @description adjust ct by specified percentage within the given duration.
		 **/
		adjustCt: function(percentage, duration, method) {
			var val = percentage,
				dur = duration;
			ioRequest({
				method:"POST",
				url: "api/yeelight/sendCommand",
				body: {
					method: method || CONST.METHOD.ADJUST_CT,
					params: [val, dur]
				}
			});
		},

		/**
		 * @param {number} percentage - percentage to adjust. (-100 ~ 100).
		 * @param {number} duration - Total time of gradual change (ms). (min=30ms)
		 * @param {string} [method] - Method to execute.
		 * @description adjust color by specified percentage within the given duration.
		 **/
		adjustColor: function(percentage, duration, method) {
			var val = percentage,
				dur = duration;
			ioRequest({
				method:"POST",
				url: "api/yeelight/sendCommand",
				body: {
					method: method || CONST.METHOD.ADJUST_COLOR,
					params: [val, dur]
				}
			});
		},

		/**
		 * ---------------------------------------------------------------------------
		 *	The following methods are used to control background light.
		 *	These command are only supported on lights equipped with bg light.
		 * ---------------------------------------------------------------------------
		 **/

		/**
		 * @see {@link toggle}
		 * @description toggles the main light and background light at the same time.
		 **/
		devToggle: function() {
			this.toggle(CONST.METHOD.DEV_TOGGLE);
		},

		/**
		 * @see {@link setRgb}
		 **/
		bgSetRgb: function(rgbVal, effect, duration) {
			this.setRgb(rgbVal, effect, duration, CONST.METHOD.BG_SET_RGB);
		},

		/**
		 * @see {@link setHsv}
		 **/
		bgSetHsv: function(hueVal, satVal, effect, duration) {
			this.setHsv(hueVal, satVal, effect, duration, CONST.METHOD.BG_SET_HSV);
		},

		/**
		 * @see {@link setCtAbx}
		 **/
		bgSetCtAbx: function(ctVal, effect, duration) {
			this.setCtAbx(ctVal, effect, duration, CONST.METHOD.BG_SET_CT_ABX)
		},

		/**
		 * @see {@link startCf}
		 **/
		bgStartCf: function(count, action, flow) {
			this.startCf(count, action, flow, CONST.METHOD.BG_START_CF);
		},

		/**
		 * @see {@link stopCf}
		 **/
		bgStopCf: function() {
			this.stopCf(CONST.METHOD.BG_STOP_CF);
		},

		/**
		 * @see {@link setScene}
		 **/
		bgSetScene: function(sceneClass, val1, val2, val3) {
			this.setScene(sceneClass, val1, val2, val3, CONST.METHOD.BG_SET_SCENE);
		},

		/**
		 * @see {@link setDefault}
		 **/
		bgSetDefault: function() {
			this.setDefault(CONST.METHOD.BG_SET_DEFAULT);
		},

		/**
		 * @see {@link setPower}
		 **/
		bgSetPower: function(powerVal, effect, duration, mode) {
			this.setPower(powerVal, effect, duration, mode, CONST.METHOD.BG_SET_POWER)
		},

		/**
		 * @see {@link setBright}
		 **/
		bgSetBright: function(brightnessVal, effect, duration) {
			this.setBright(brightnessVal, effect, duration, CONST.METHOD.BG_SET_BRIGHT)
		},

		/**
		 * @see {@link setAdjust}
		 **/
		bgSetAdjust: function(action, prop) {
			this.setAdjust(action, prop, CONST.METHOD.BG_SET_ADJUST)
		},

		/**
		 * @see {@link toggle}
		 **/
		bgToggle: function() {
			this.toggle(CONST.METHOD.BG_TOGGLE);
		},

		/**
		 * @see {@link adjustBright}
		 **/
		bgAdjustBright: function(percentage, duration) {
			this.adjustBright(percentage, duration, CONST.METHOD.BG_ADJUST_BRIGHT);
		},

		/**
		 * @see {@link adjustCt}
		 **/
		bgAdjustCt: function(percentage, duration) {
			this.adjustCt(percentage, duration, CONST.METHOD.BG_ADJUST_CT);
		},

		/**
		 * @see {@link adjustColor}
		 **/
		bgAdjustColor: function(percentage, duration) {
			this.adjustColor(percentage, duration, CONST.METHOD.BG_ADJUST_COLOR);
		}
	};

	function processResponse(res) {
		var id = res.id;

		if(res.result) {
			// Received some result
			var result = res;
		} else if(res.error) {
			// Received some error
			var errCode = res.error.code,
				message = res.error.message;
		}
	}
}(window));