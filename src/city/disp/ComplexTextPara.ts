/**
 * Created by wibrst@qq.com on 2014/9/29.
 */
module city.disp {
    export class ComplexTextPara extends egret.Sprite {

        public constructor(atl:Array<ComplexTextLine>) {
            super();

            var wMax:number = 0;

            var tl:ComplexTextLine;
            for (var i:number = 0; i < atl.length; ++i) {
                if (atl[i].width > wMax) {
                    wMax = atl[i].width;
                }
            }

            var hOffset:number = 0;
            for (var i:number = 0; i < atl.length; ++i) {
                atl[i].x = ( wMax - atl[i].width ) / 2;
                atl[i].y = hOffset;
                hOffset += atl[i].height;
                this.addChild(atl[i]);
            }

        }

    }
}