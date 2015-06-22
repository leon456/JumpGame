/**
 * Created by wibrst@qq.com on 2014/9/4.
 */
var city;
(function (city) {
    var disp;
    (function (disp) {
        var TxButtonHasId = (function (_super) {
            __extends(TxButtonHasId, _super);
            function TxButtonHasId() {
                _super.call(this);
            }
            var __egretProto__ = TxButtonHasId.prototype;
            __egretProto__.toString = function () {
                return "[txbtn" + this.id.toString() + "]";
            };
            return TxButtonHasId;
        })(egret.TextField);
        disp.TxButtonHasId = TxButtonHasId;
        TxButtonHasId.prototype.__class__ = "city.disp.TxButtonHasId";
    })(disp = city.disp || (city.disp = {}));
})(city || (city = {}));
