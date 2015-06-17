/**
 * Created by wibrst@qq.com on 2014/9/29.
 */

module city.disp {
    export class ComplexTextLine extends egret.Sprite {

        public constructor(atu:Array<ComplexTextUnit>) {
            super();
            var tu:ComplexTextUnit;
            var xOffset:number = 0;
            for (var i:number = 0; i < atu.length; ++i) {
                tu = atu[i];
                tu.x = xOffset;
                xOffset += tu.width;
                super.addChild(tu);
            }
        }

    }
}