/**
 * Created by egret on 2015/2/2.
 * author: city@egret-labs.org
 */


module city.key {

    export class KeyManager {

        public static a;

        public static init() {
            var rfThis = this;
            document.onkeydown = function (evt) {
                rfThis.onkeydown(evt);
            }
            document.onkeyup = function (evt) {
                rfThis.onkeyup(evt);
            }
            this.dictKeyDn = {};
        }

        public static isDown( keycode:number ):boolean{
            return this.dictKeyDn[ keycode ] && this.dictKeyDn[ keycode ] == true;
        }

        private static onkeydown( evt ):void{
            var keycode = window.event ? evt.keyCode : evt.which;
            this.dictKeyDn[ keycode ] = true;
        }

        private static onkeyup( evt ):void{
            var keycode = window.event ? evt.keyCode : evt.which;
            this.dictKeyDn[ keycode ] = false;
        }

        public static Shift_L:number = 16;
        public static Ctrl_L:number = 17;
        public static Alt_L:number = 18;

        private static dictKeyDn:Object;

    }

}