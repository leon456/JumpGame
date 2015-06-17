/**
 * Created by egret on 2015/1/29.
 */


module city.touch{

    export class TouchTriggerUnit {

        private static tmDelayFirstTrigger:number = 400;
        private static tmIntervalTrigger:number = 80;

        constructor( id:number ){
            //this.tmBegin = tmBegin;
            this.id = id;
        }

        public startTime( tm:number ):void{
            //this.tmBegin = tm;
            this.tmNextTrigger = tm +TouchTriggerUnit.tmDelayFirstTrigger;
        }

        public checkAndUpdateTrigger( tm:number ):boolean{
            console.log( "checkAndUpdateTrigger:", tm, this.tmNextTrigger );
            if( tm > this.tmNextTrigger ){
                this.tmNextTrigger = this.tmNextTrigger + TouchTriggerUnit.tmIntervalTrigger;
                return true;
            }else{
                return false;
            }
        }

        public id:number;

        //public tmBegin:number;
        public tmNextTrigger:number;

    }
}