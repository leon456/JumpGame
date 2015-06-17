/**
 * Created by wibrst@qq.com on 2014/9/4.
 */
module city.utils {
    export class ArrayUtil {

        public static removeElem(elem:any, aOrig:Array<any>):boolean {
            var idxHit:number = aOrig.indexOf(elem);
            if (idxHit != -1) {
                aOrig.splice(idxHit, 1);
                return true;
            } else {
                return false;
            }
        }

        public static shuffle(aOrig:Array<any>):void {
            for (var i:number = aOrig.length - 1; i > -1; --i) {
                var r:number = Math.floor(aOrig.length * Math.random());          /// produce random idx
                var tmp:Object = aOrig[i];
                aOrig[i] = aOrig[r];
                aOrig[r] = tmp;     /// swap element between thru idx and randm idx
            }
        }

        /// 目前只支持返回一个元素！
        public static getRdmElem(aSrc:Array<any>, bRemove:boolean = false, nStart:number = 0, nEnd:number = -1):number {
            if (nEnd == -1) nEnd = aSrc.length;

            var nLenValid:number = nEnd - nStart;
            var idxHit:number = this.getRdmIdx(nLenValid, nStart);
            if (bRemove) {
                return aSrc.splice(idxHit, 1)[0];
            } else {
                return aSrc[idxHit];
            }
        }

        public static getRdmIdx(nLen:number, nBase:number = 0):number {
            return nBase + Math.floor(Math.random() * nLen);
        }

        // 取得序列数组
        public static getSeriesNumArr(iLen:number, iStart:number = 0):Array<number> {
            //trace( "[CommUtils] getSeriesNumArr", arguments );
            if (iLen <= 0) {
                return [];
            }

            var aProd:Array<number> = new Array<number>();
            for (var i:number = iStart + iLen - 1; i >= iStart; --i) {
                aProd.unshift(i);
            }
            return aProd;
        }


    }
}