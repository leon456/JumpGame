/**
 * Created by egret on 2015/2/2.
 * author: city@egret-labs.org
 */
var city;
(function (city) {
    var key;
    (function (key) {
        var KeyManager = (function () {
            function KeyManager() {
            }
            var __egretProto__ = KeyManager.prototype;
            KeyManager.init = function () {
                var rfThis = this;
                document.onkeydown = function (evt) {
                    rfThis.onkeydown(evt);
                };
                document.onkeyup = function (evt) {
                    rfThis.onkeyup(evt);
                };
                this.dictKeyDn = {};
            };
            KeyManager.isDown = function (keycode) {
                return this.dictKeyDn[keycode] && this.dictKeyDn[keycode] == true;
            };
            KeyManager.onkeydown = function (evt) {
                var keycode = window.event ? evt.keyCode : evt.which;
                this.dictKeyDn[keycode] = true;
            };
            KeyManager.onkeyup = function (evt) {
                var keycode = window.event ? evt.keyCode : evt.which;
                this.dictKeyDn[keycode] = false;
            };
            KeyManager.Shift_L = 16;
            KeyManager.Ctrl_L = 17;
            KeyManager.Alt_L = 18;
            return KeyManager;
        })();
        key.KeyManager = KeyManager;
        KeyManager.prototype.__class__ = "city.key.KeyManager";
    })(key = city.key || (city.key = {}));
})(city || (city = {}));
