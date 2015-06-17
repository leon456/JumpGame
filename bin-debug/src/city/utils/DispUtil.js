/**
 * Created by wibrst@qq.com on 2014/10/2.
 */
var city;
(function (city) {
    var utils;
    (function (utils) {
        var DispUtil = (function () {
            function DispUtil() {
            }
            var __egretProto__ = DispUtil.prototype;
            /**
             * 日常按钮部署操作，包含id信息
             * @param iId
             * @param btn
             * @param x
             * @param y
             * @param container
             * @param btnHandler
             */
            DispUtil.layoutButtonHasId = function (iId, btn, x, y, container, btnHandler, anchors) {
                if (anchors === void 0) { anchors = .5; }
                btn.id = iId;
                btn.anchorX = anchors;
                btn.anchorY = anchors;
                btn.x = x;
                btn.y = y;
                btn.touchEnabled = true;
                if (btnHandler) {
                    btn.addEventListener(egret.TouchEvent.TOUCH_TAP, btnHandler, container);
                }
                container.addChild(btn);
            };
            /**
             * 日常按钮部署操作，包含id信息
             * @param iId                   number
             * @param txBtn                  TxButtonHasId
             * @param x
             * @param y
             * @param container
             * @param btnHandler
             */
            DispUtil.layoutTxButtonHasId = function (iId, txBtn, label, x, y, container, btnHandler, hostBtnHandler, size, anchors) {
                if (size === void 0) { size = 20; }
                if (anchors === void 0) { anchors = .5; }
                txBtn.id = iId;
                txBtn.fontFamily = "Verdana";
                txBtn.textColor = 0;
                txBtn.size = size;
                txBtn.stroke = 1.2;
                txBtn.anchorX = anchors;
                txBtn.anchorY = anchors;
                txBtn.x = x;
                txBtn.y = y;
                txBtn.textAlign = egret.HorizontalAlign.LEFT;
                txBtn.text = label;
                txBtn.cacheAsBitmap = true;
                if (btnHandler) {
                    txBtn.strokeColor = 0x000000;
                    txBtn.touchEnabled = true;
                    txBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, btnHandler, hostBtnHandler);
                    txBtn.textColor = 0xffffff;
                }
                else {
                    txBtn.strokeColor = 0x666666;
                    txBtn.touchEnabled = false;
                    txBtn.textColor = 0xffffff;
                }
                container.addChild(txBtn);
            };
            /**
             * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
             */
            DispUtil.createBitmapByName = function (name) {
                var result = new egret.Bitmap();
                var texture = city.assets.StrongAssets.extract(name);
                result.texture = texture;
                return result;
            };
            return DispUtil;
        })();
        utils.DispUtil = DispUtil;
        DispUtil.prototype.__class__ = "city.utils.DispUtil";
    })(utils = city.utils || (city.utils = {}));
})(city || (city = {}));
