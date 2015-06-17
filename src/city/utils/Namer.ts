/**
 * Created by wibrst@qq.com on 2014/10/23.
 */

module city.utils{
    export class Namer{
        private static count:number = 0;
        public static get getOne():string{
            ++ this.count;
            return "obj_" + this.count;
        }
    }
}
