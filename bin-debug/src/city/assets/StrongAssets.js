/**
 * Created by wibrst@qq.com on 2014/10/24.
 */
var city;
(function (city) {
    var assets;
    (function (_assets) {
        var StrongAssets = (function () {
            function StrongAssets() {
            }
            var __egretProto__ = StrongAssets.prototype;
            StrongAssets.extract = function (idAsstes, bSuppressException) {
                if (bSuppressException === void 0) { bSuppressException = false; }
                var assets = RES.getRes(idAsstes);
                if (assets == undefined) {
                    if (bSuppressException) {
                        city.utils.DevUtil.trace(this, "extract failed!" + idAsstes);
                    }
                    else {
                        throw new Error("assets(" + idAsstes + ") doesn't exist!");
                    }
                }
                else {
                    return assets;
                }
            };
            StrongAssets.extractTxtrFromSheet = function (idAsstes, sheet, bSuppressException) {
                if (bSuppressException === void 0) { bSuppressException = false; }
                var assets = sheet.getTexture(idAsstes);
                if (assets == undefined) {
                    if (bSuppressException) {
                        city.utils.DevUtil.trace(this, "extract failed!" + idAsstes);
                    }
                    else {
                        throw new Error("sheet assets(" + idAsstes + ") doesn't exist!");
                    }
                }
                else {
                    return assets;
                }
            };
            StrongAssets.toString = function () {
                return "[-StrongAssets-]";
            };
            return StrongAssets;
        })();
        _assets.StrongAssets = StrongAssets;
        StrongAssets.prototype.__class__ = "city.assets.StrongAssets";
    })(assets = city.assets || (city.assets = {}));
})(city || (city = {}));
