/**
 * Created by wibrst@qq.com on 2014/8/18.
 */

module city.utils {
    export class DevUtil {

        private static htmlDebug:string = "";

        public static trace(...etc) {
            console.log(etc.join(" "));
        }

        public static traceInHtml(...etc) {
            if ( document.getElementById("info")) {
                this.htmlDebug += etc.join(" ") + "<br>";
                document.getElementById("info").innerHTML = this.htmlDebug;
            }
        }

        public static parseUpMysticalVisual(disp:egret.DisplayObject):string {
            var aTrac:Array<string> = new Array<string>();
            while (disp) {
                aTrac.push(disp + ( disp.name ? " n:" + disp.name : "" ) + " a:" + disp.alpha + " v:" + disp.visible + " x:" + disp.x + " y:" + disp.y + " w:" + disp.width + " h:" + disp.height);
                disp = disp.parent;
            }

            var sTrac:string = "--- --- --- parseMysticalVisual:";

            for (var i:number = aTrac.length - 1; i > -1; --i) {
                sTrac += "\n" + StringUtil.getRepeatString("\t", aTrac.length - i) + aTrac[i];
            }

            sTrac = sTrac;
            return sTrac;
        }

        public static viewThru(tgt:any, bBrief:boolean = false, nLevel:number = 1, nLevelRestrict:number = 3, userMsg:string = ""):string {
            if (!tgt) return "";

            var bHasProps:Boolean = false;
            var msg:string = "";
            if (nLevel == 1) {
                msg += "\n┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯\n";
            }

            var count:number = 0;
            for (var x in tgt) {
                bHasProps = true;

                if (x.indexOf("_") == 0) {
                    continue;
                }

                var elmt:any = tgt[x];
                var type:String = typeof (elmt);
                if (type == "function") {
                    continue;
                }
                var valueElement:String = ( elmt != null )
                    ? (  elmt + " (" + type + ")"  /*+String(elmt is Object)*/ )
                    : ( "<未定义>" );
                var sValueBrief:String = bBrief ? this.getBrief(valueElement.toString(), 24, 20, 10, false) : valueElement;
                var add_str:String = " " + x + " :" + sValueBrief;

                msg += this.getIndent(nLevel) + add_str + "\n";
                if (/*! (<egret.TextField>elmt != null ) &&*/ elmt != null && nLevel < nLevelRestrict) {
                    msg += this.viewThru(elmt, bBrief, nLevel + 1, nLevelRestrict);
                }

                if (++count > 9) {
                    msg += this.getIndent(nLevel) + "......" + "\n";
                    break;
                } else {
                    //msg += count + "\t";
                }
            }

            if (nLevel == 1) {
                msg += "┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷";
            }
            return bHasProps ? msg : "";
        }

        /// just for viewThru
        private static getIndent(nLevel:number):string {
            var prefix:string = "";
            for (var i:number = nLevel; i > 1; --i) {
                prefix += " │";
            }
            return prefix + " ├";
        }

        public static getBrief(sSrc:string, nHeadLen:number = 600, nTailLen:number = 600, nTolerance:number = 20, bLineBreaks:boolean = true):string {
            if (sSrc.length <= nHeadLen + nTailLen + nTolerance)return sSrc;
            else
                return bLineBreaks ?
                sSrc.slice(0, sSrc.slice(0, nHeadLen).lastIndexOf("\n"))
                + "\n\n\t... ... ...\n\n"
                + sSrc.slice(-nTailLen + sSrc.slice(-nTailLen).indexOf("\n") + 1)
                    :
                sSrc.slice(0, nHeadLen)
                + "... ..."
                + sSrc.slice(-nTailLen)
                    ;
        }

        public static resetDebugMark() {
                this.clearDebugMark();
                if (this._aDebugPoint == null) {
                    this._aDebugPoint = new Array<egret.DisplayObject>();
                }
        }

        public static placeDebugMark(cFill:number, x:number, y:number, at:egret.DisplayObjectContainer, alpha:number = 1) {

            /// 调试用显示点
                var mark:city.disp.Mark;

                mark = new city.disp.Mark(0x00FFFF, cFill);
                mark.anchorX = mark.anchorY = .5;
                mark.x = x;
                mark.y = y;
                //mark.scaleX = mark.scaleY = .1;
                mark.alpha = alpha;
                at.addChild(mark);

                if (this._aDebugPoint == null) {
                    this._aDebugPoint = new Array<egret.DisplayObject>();
                }

                this._aDebugPoint.push(mark);
        }

        /// 清理之前的星
        private static clearDebugMark() {
                if (this._aDebugPoint && this._aDebugPoint.length) {
                    var vDebug:egret.DisplayObject;
                    while (this._aDebugPoint.length) {
                        vDebug = this._aDebugPoint.pop();
                        if (vDebug && vDebug.parent) {
                            vDebug.parent.removeChild(vDebug);
                        }
                    }
                }
        }


        public static bezier(a:number, x1:number, y1:number, x2:number, y2:number, x3:number, y3:number, tgt:egret.DisplayObject):void {
            var b:number = 1 - a;
            var pre1:number = a * a;
            var pre2:number = 2 * a * b;
            var pre3:number = b * b;
            tgt.x = pre1 * x1 + pre2 * x2 + pre3 * x3;
            tgt.y = pre1 * y1 + pre2 * y2 + pre3 * y3;
        }

        private static _stage:egret.Stage;
        private static _aDebugPoint:Array<egret.DisplayObject>;

    }
}