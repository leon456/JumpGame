/**
 * Created by wibrst@qq.com on 2014/10/27.
 */

module city.utils {

    export class GeomUtil {

        public static TEXT_MATRIX_ADJUST_X:number = 8;
        public static TEXT_MATRIX_ADJUST_Y:number = 8;

        public static adjustDispWithCen(pCen:egret.Point, disp:egret.DisplayObject):void {
            disp.x = pCen.x - disp.width * (.5 - disp.anchorX) + this.TEXT_MATRIX_ADJUST_X;
            disp.y = pCen.y - disp.height * (.5 - disp.anchorY) + this.TEXT_MATRIX_ADJUST_Y;
        }

    }
}