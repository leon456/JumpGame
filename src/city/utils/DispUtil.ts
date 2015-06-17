/**
 * Created by wibrst@qq.com on 2014/10/2.
 */

module city.utils{

    export class DispUtil{
        /**
         * 日常按钮部署操作，包含id信息
         * @param iId
         * @param btn
         * @param x
         * @param y
         * @param container
         * @param btnHandler
         */
        public static layoutButtonHasId(iId:number, btn:city.disp.ButtonHasId, x, y, container:egret.DisplayObjectContainer, btnHandler:Function, anchors:number = .5) {
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
        }


        /**
         * 日常按钮部署操作，包含id信息
         * @param iId                   number
         * @param txBtn                  TxButtonHasId
         * @param x
         * @param y
         * @param container
         * @param btnHandler
         */
        public static layoutTxButtonHasId(iId:number, txBtn:city.disp.TxButtonHasId, label:string, x:number, y:number
            , container:egret.DisplayObjectContainer, btnHandler:Function, hostBtnHandler:any, size:number = 20, anchors:number = .5) {
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
            } else {
                txBtn.strokeColor = 0x666666;
                txBtn.touchEnabled = false;
                txBtn.textColor = 0xffffff;
            }

            container.addChild(txBtn);
        }

        /**
         * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
         */
        public static createBitmapByName(name:string):egret.Bitmap {
            var result:egret.Bitmap = new egret.Bitmap();
            var texture:egret.Texture = city.assets.StrongAssets.extract(name);
            result.texture = texture;
            return result;
        }
    }

}