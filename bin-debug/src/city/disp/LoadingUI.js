/**
 * Created by wibrst@qq.com on 2014/9/29.
 */
var city;
(function (city) {
    var disp;
    (function (disp) {
        var LoadingUI = (function (_super) {
            __extends(LoadingUI, _super);
            function LoadingUI(w, h) {
                _super.call(this);
                this._w = w;
                this._h = h;
                this.createView();
            }
            var __egretProto__ = LoadingUI.prototype;
            LoadingUI.$i = function (w, h) {
                if (w === void 0) { w = 0; }
                if (h === void 0) { h = 0; }
                if (this._$i == null) {
                    this._$i = new LoadingUI(w, h);
                }
                return this._$i;
            };
            __egretProto__.createView = function () {
                this._icon = new egret.Bitmap;
                this.addChild(this._icon);
                this._tx = new egret.TextField;
                this.addChild(this._tx);
            };
            __egretProto__.displayLoadingIcon = function () {
                var txtr = city.assets.StrongAssets.extract("loading", true);
                if (txtr) {
                    this._icon.texture = txtr;
                    this._icon.x = (this._w - this._icon.width) / 2;
                    this._icon.y = (this._h - this._icon.height) / 2;
                    this._tx.x = (this._w - this._tx.width) / 2;
                    this._tx.y = (this._h - this._tx.height) / 2 + this._icon.height + 10;
                }
            };
            __egretProto__.setProgress = function (current, total) {
                this._tx.text = "努力加载中... " + Math.round(current / total * 100) + "%";
                //Util.trace( "文本区域:", this._tx.width, this._tx.height );
                this._tx.x = (this._w - this._tx.width) / 2;
                this._tx.y = (this._h - this._tx.height) / 2 + this._icon.height + 10;
            };
            return LoadingUI;
        })(egret.Sprite);
        disp.LoadingUI = LoadingUI;
        LoadingUI.prototype.__class__ = "city.disp.LoadingUI";
    })(disp = city.disp || (city.disp = {}));
})(city || (city = {}));
