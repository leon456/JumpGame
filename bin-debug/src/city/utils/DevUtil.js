/**
 * Created by wibrst@qq.com on 2014/8/18.
 */
var city;
(function (city) {
    var utils;
    (function (utils) {
        var DevUtil = (function () {
            function DevUtil() {
            }
            var __egretProto__ = DevUtil.prototype;
            DevUtil.trace = function () {
                var etc = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    etc[_i - 0] = arguments[_i];
                }
                console.log(etc.join(" "));
            };
            DevUtil.traceInHtml = function () {
                var etc = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    etc[_i - 0] = arguments[_i];
                }
                if (document.getElementById("info")) {
                    this.htmlDebug += etc.join(" ") + "<br>";
                    document.getElementById("info").innerHTML = this.htmlDebug;
                }
            };
            DevUtil.parseUpMysticalVisual = function (disp) {
                var aTrac = new Array();
                while (disp) {
                    aTrac.push(disp + (disp.name ? " n:" + disp.name : "") + " a:" + disp.alpha + " v:" + disp.visible + " x:" + disp.x + " y:" + disp.y + " w:" + disp.width + " h:" + disp.height);
                    disp = disp.parent;
                }
                var sTrac = "--- --- --- parseMysticalVisual:";
                for (var i = aTrac.length - 1; i > -1; --i) {
                    sTrac += "\n" + utils.StringUtil.getRepeatString("\t", aTrac.length - i) + aTrac[i];
                }
                sTrac = sTrac;
                return sTrac;
            };
            DevUtil.viewThru = function (tgt, bBrief, nLevel, nLevelRestrict, userMsg) {
                if (bBrief === void 0) { bBrief = false; }
                if (nLevel === void 0) { nLevel = 1; }
                if (nLevelRestrict === void 0) { nLevelRestrict = 3; }
                if (userMsg === void 0) { userMsg = ""; }
                if (!tgt)
                    return "";
                var bHasProps = false;
                var msg = "";
                if (nLevel == 1) {
                    msg += "\n┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯\n";
                }
                var count = 0;
                for (var x in tgt) {
                    bHasProps = true;
                    if (x.indexOf("_") == 0) {
                        continue;
                    }
                    var elmt = tgt[x];
                    var type = typeof (elmt);
                    if (type == "function") {
                        continue;
                    }
                    var valueElement = (elmt != null) ? (elmt + " (" + type + ")") : ("<未定义>");
                    var sValueBrief = bBrief ? this.getBrief(valueElement.toString(), 24, 20, 10, false) : valueElement;
                    var add_str = " " + x + " :" + sValueBrief;
                    msg += this.getIndent(nLevel) + add_str + "\n";
                    if (elmt != null && nLevel < nLevelRestrict) {
                        msg += this.viewThru(elmt, bBrief, nLevel + 1, nLevelRestrict);
                    }
                    if (++count > 9) {
                        msg += this.getIndent(nLevel) + "......" + "\n";
                        break;
                    }
                    else {
                    }
                }
                if (nLevel == 1) {
                    msg += "┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷";
                }
                return bHasProps ? msg : "";
            };
            /// just for viewThru
            DevUtil.getIndent = function (nLevel) {
                var prefix = "";
                for (var i = nLevel; i > 1; --i) {
                    prefix += " │";
                }
                return prefix + " ├";
            };
            DevUtil.getBrief = function (sSrc, nHeadLen, nTailLen, nTolerance, bLineBreaks) {
                if (nHeadLen === void 0) { nHeadLen = 600; }
                if (nTailLen === void 0) { nTailLen = 600; }
                if (nTolerance === void 0) { nTolerance = 20; }
                if (bLineBreaks === void 0) { bLineBreaks = true; }
                if (sSrc.length <= nHeadLen + nTailLen + nTolerance)
                    return sSrc;
                else
                    return bLineBreaks ? sSrc.slice(0, sSrc.slice(0, nHeadLen).lastIndexOf("\n")) + "\n\n\t... ... ...\n\n" + sSrc.slice(-nTailLen + sSrc.slice(-nTailLen).indexOf("\n") + 1) : sSrc.slice(0, nHeadLen) + "... ..." + sSrc.slice(-nTailLen);
            };
            DevUtil.resetDebugMark = function () {
                this.clearDebugMark();
                if (this._aDebugPoint == null) {
                    this._aDebugPoint = new Array();
                }
            };
            DevUtil.placeDebugMark = function (cFill, x, y, at, alpha) {
                if (alpha === void 0) { alpha = 1; }
                /// 调试用显示点
                var mark;
                mark = new city.disp.Mark(0x00FFFF, cFill);
                mark.anchorX = mark.anchorY = .5;
                mark.x = x;
                mark.y = y;
                //mark.scaleX = mark.scaleY = .1;
                mark.alpha = alpha;
                at.addChild(mark);
                if (this._aDebugPoint == null) {
                    this._aDebugPoint = new Array();
                }
                this._aDebugPoint.push(mark);
            };
            /// 清理之前的星
            DevUtil.clearDebugMark = function () {
                if (this._aDebugPoint && this._aDebugPoint.length) {
                    var vDebug;
                    while (this._aDebugPoint.length) {
                        vDebug = this._aDebugPoint.pop();
                        if (vDebug && vDebug.parent) {
                            vDebug.parent.removeChild(vDebug);
                        }
                    }
                }
            };
            DevUtil.bezier = function (a, x1, y1, x2, y2, x3, y3, tgt) {
                var b = 1 - a;
                var pre1 = a * a;
                var pre2 = 2 * a * b;
                var pre3 = b * b;
                tgt.x = pre1 * x1 + pre2 * x2 + pre3 * x3;
                tgt.y = pre1 * y1 + pre2 * y2 + pre3 * y3;
            };
            DevUtil.htmlDebug = "";
            return DevUtil;
        })();
        utils.DevUtil = DevUtil;
        DevUtil.prototype.__class__ = "city.utils.DevUtil";
    })(utils = city.utils || (city.utils = {}));
})(city || (city = {}));
