/**
 * Created by wibrst@qq.com on 2014/9/29.
 */
module city.disp {

    export class LoadingUI extends egret.Sprite {

        private static _$i:LoadingUI;

        public static $i( w:number = 0, h:number = 0 ):LoadingUI {
            if (this._$i == null) {
                this._$i = new LoadingUI( w, h );
            }
            return this._$i;
        }

        public constructor( w:number, h:number ) {
            super();
            this._w = w;
            this._h = h;
            this.createView();
        }

        private _w:number;
        private _h:number;

        private createView():void {
            this._icon = new egret.Bitmap;
            this.addChild(this._icon);

            this._tx = new egret.TextField;
            this.addChild(this._tx);
        }

        public displayLoadingIcon():void {
            var txtr:egret.Texture = city.assets.StrongAssets.extract("loading", true);
            if (txtr) {
                this._icon.texture = txtr;

                this._icon.x = ( this._w - this._icon.width ) / 2;
                this._icon.y = ( this._h - this._icon.height ) / 2;

                this._tx.x = ( this._w - this._tx.width ) / 2;
                this._tx.y = ( this._h - this._tx.height ) / 2 + this._icon.height + 10;
            }
        }

        public setProgress(current, total):void {
            this._tx.text = "努力加载中... " + Math.round(current / total * 100) + "%";
            //Util.trace( "文本区域:", this._tx.width, this._tx.height );

            this._tx.x = ( this._w - this._tx.width ) / 2;
            this._tx.y = ( this._h - this._tx.height ) / 2 + this._icon.height + 10;
        }

        private _tx:egret.TextField;

        private _icon:egret.Bitmap;

    }
}