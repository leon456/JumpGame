/**
 * Created by wibrst@qq.com on 2014/9/4.
 */
var city;
(function (city) {
    var disp;
    (function (disp) {
        var ButtonHasId = (function (_super) {
            __extends(ButtonHasId, _super);
            function ButtonHasId(txtr) {
                _super.call(this, txtr);
            }
            var __egretProto__ = ButtonHasId.prototype;
            __egretProto__.toString = function () {
                return "[btn" + this.id.toString() + "]";
            };
            return ButtonHasId;
        })(egret.Bitmap);
        disp.ButtonHasId = ButtonHasId;
        ButtonHasId.prototype.__class__ = "city.disp.ButtonHasId";
    })(disp = city.disp || (city.disp = {}));
})(city || (city = {}));
