var game;
(function (game) {
    var jumper;
    (function (jumper) {
        var MenuSkin = (function (_super) {
            __extends(MenuSkin, _super);
            function MenuSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.elementsContent = [this.__3_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = MenuSkin.prototype;
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "source", "width"], [20, "kuchipatchi1.png", 20]);
                return t;
            };
            return MenuSkin;
        })(egret.gui.Skin);
        jumper.MenuSkin = MenuSkin;
        MenuSkin.prototype.__class__ = "game.jumper.MenuSkin";
    })(jumper = game.jumper || (game.jumper = {}));
})(game || (game = {}));
//# sourceMappingURL=MenuSkin.js.map