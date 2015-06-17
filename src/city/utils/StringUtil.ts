/**
 * Created by wibrst@qq.com on 2014/10/14.
 */

module city.utils{
    export class StringUtil {

        public static getRepeatString( sBase:string, nRepeat:number ):string {

            if( nRepeat <= 0 ){
                throw new Error("lenth must >= 0!");
            }else{
                var sProd:string = sBase;
                for ( var i:number = nRepeat; i > 1; --i ) sProd = sBase + sProd;
                return sProd;
            }
        }

        public static charIsNum(charSuper:string):boolean {
            return charSuper >= "0" && charSuper <= "9";
        }

        public static charIsLower(charSuper:string):boolean {
            return charSuper >= "a" && charSuper <= "z";
        }

        public static charIsUpper(charSuper:string):boolean {
            return charSuper >= "A" && charSuper <= "Z";
        }

        public static get urlRandomPostfix():string {
            return "?pfr=" + egret.getTimer().toString() + Math.ceil(Math.random() * 100000);
            /// postfix random
        }

    }
}