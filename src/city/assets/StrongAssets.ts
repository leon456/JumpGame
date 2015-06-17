/**
 * Created by wibrst@qq.com on 2014/10/24.
 */
module city.assets{
    export class StrongAssets{

        public static extract( idAsstes:string, bSuppressException:boolean = false ):any{
            var assets:any = RES . getRes( idAsstes );
            if( assets == undefined ){
                if( bSuppressException ){
                    city.utils.DevUtil.trace( this, "extract failed!" + idAsstes );
                }else{
                    throw  new Error( "assets("+idAsstes+") doesn't exist!" );
                }
            }else{
                return assets;
            }
        }

        public static extractTxtrFromSheet( idAsstes:string, sheet:egret.SpriteSheet, bSuppressException:boolean = false ):any{
            var assets:any = sheet.getTexture( idAsstes );
            if( assets == undefined ){
                if( bSuppressException ){
                    city.utils.DevUtil.trace( this, "extract failed!" + idAsstes );
                }else{
                    throw  new Error( "sheet assets("+idAsstes+") doesn't exist!" );
                }
            }else{
                return assets;
            }
        }

        public static toString():string{
            return "[-StrongAssets-]";
        }

    }

}
