/**
 * Created by wibrst@qq.com on 2014/8/20.
 */
module city.disp{
    export class Mark extends egret.Shape{

        public constructor( cLine:number, cFill:number ){
            super();
            this.graphics.lineStyle( 1,cLine );
            this.graphics.beginFill( cFill );
            this.graphics.drawRect( 0, 0, 10, 10 );
            this.graphics.endFill();
        }

    }
}
