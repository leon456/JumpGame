/**
 * Created by egret on 2015/1/29.
 */

module city.touch{

    export class TouchTriggerCenter{

        /**
         * 增加显示对象用于触控触发
         * @param dispatcher    显示对象引用
         * @param id                    id
         * @param handler         触发处理函数，会传出id
         */
        public static addTarget( dispatcher:egret.DisplayObject, id:number, handler:Function, hostHandler:any ):void{

            /// record
            if( this._dictName2TriggerUnit == null ){
                this._dictName2TriggerUnit = new Object;
                egret.Ticker.getInstance().register( this.advance, this);
            }
            if( this._vcActiveName == null ){
                this._vcActiveName = new Array<string>();
            }

            this.register( handler, hostHandler );

            dispatcher.name = city.utils.Namer.getOne;
            dispatcher.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this );
            dispatcher.addEventListener( egret.TouchEvent.TOUCH_END, this.touchHandler, this );
            this._dictName2TriggerUnit[ dispatcher.name ] = new TouchTriggerUnit( id );
            console.log( "addTarget:", this._dictName2TriggerUnit[ dispatcher.name ] );
        }

        private static touchHandler( evt:egret.TouchEvent ):void{
            var name:string = evt.currentTarget.name;
            var unit:TouchTriggerUnit = this._dictName2TriggerUnit[ name ];
            switch ( evt.type ){
                case egret.TouchEvent.TOUCH_BEGIN:
                    /// 启动计时
                    unit.startTime( egret.getTimer() );
                    this._vcActiveName.push( name );
                    break;
                case egret.TouchEvent.TOUCH_END:

                    /// 终止计时
                    this._vcActiveName.splice( this._vcActiveName.indexOf( name ) );
                    break;
            }

        }

        private static advance( advancedTime ):void{
            //console.log( "advance:", advancedTime );
            if( this._vcActiveName.length ){

                var tm:number = egret.getTimer();
                for ( var i in this._vcActiveName ){
                    var unit:TouchTriggerUnit = this._dictName2TriggerUnit[ this._vcActiveName[i] ];
                    if( unit.checkAndUpdateTrigger( tm ) ){
                        for ( var j:number = this._vcHandler.length - 1; j>-1; --j ){
                            this._vcHandler[ j ].apply( this._vcHostHandler[ j ], [ unit.id ] );
                        }
                    }
                }

            }
        }

        private static register( handler:Function, hostHandler:any ):void{
            if( this._vcHandler == null ){
                this._vcHandler = new Array<Function>();
                this._vcHostHandler = new Array<any>();
            }
            if( this._vcHandler.indexOf( handler ) == -1 ||
                this._vcHandler.indexOf( handler ) != this._vcHostHandler.indexOf( hostHandler ) ) {
                this._vcHandler.push( handler );
                this._vcHostHandler.push( hostHandler );
            }
        }

        //private static _vcTarget:Array<egret.DisplayObject>;

        private static _dictName2TriggerUnit:Object;
        private static _vcActiveName:Array<string>;

        /// 成对出现
        private static _vcHandler:Array<Function>;
        private static _vcHostHandler:Array<any>;

    }

}
