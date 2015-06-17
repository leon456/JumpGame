/**
 * Created by wibrst@qq.com on 2014/10/27.
 */

module city.utils {
    export class BrowserUtil {

        public static updateURL(uTo:string):void {
            window.open(uTo, "_self");
        }

        public static refreshSelf():void {
            location.reload();
        }

    }
}