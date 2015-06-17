var live;
(function (live) {
    /**
     *
     * @author
     *
     */
    var Menu = (function (_super) {
        __extends(Menu, _super);
        function Menu() {
            _super.call(this);
            this.skinName = game.jumper.MenuSkin;
        }
        var __egretProto__ = Menu.prototype;
        return Menu;
    })(egret.gui.SkinnableComponent);
    live.Menu = Menu;
    Menu.prototype.__class__ = "live.Menu";
})(live || (live = {}));
//# sourceMappingURL=Menu.js.map