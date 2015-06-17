/**
 * Created by wibrst@qq.com on 2014/9/4.
 */
module city.disp {

    export class TxButtonHasId extends egret.TextField {

        public constructor() {
            super();
        }

        public  toString():string {
            return "[txbtn" + this.id.toString() + "]";
        }

        public id:number;
    }
}