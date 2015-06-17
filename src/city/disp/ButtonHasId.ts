/**
 * Created by wibrst@qq.com on 2014/9/4.
 */

module city.disp {
    export class ButtonHasId extends egret.Bitmap {

        public constructor(txtr?:egret.Texture) {
            super(txtr);
        }

        public  toString():string {
            return "[btn" + this.id.toString() + "]";
        }

        public id:number;
    }
}