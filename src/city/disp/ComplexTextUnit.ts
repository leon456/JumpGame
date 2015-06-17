/**
 * Created by wibrst@qq.com on 2014/9/29.
 */
module city.disp {
    export class ComplexTextUnit extends egret.TextField {

        public constructor(text:string, color:number) {
            super();
            this.fontFamily = "微软雅黑";
            this.textColor = color;
            this.size = 40;
            this.text = text;
        }

    }
}