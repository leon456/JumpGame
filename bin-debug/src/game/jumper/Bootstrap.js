var game;
(function (game) {
    var jumper;
    (function (jumper) {
        var Bootstrap = (function (_super) {
            __extends(Bootstrap, _super);
            function Bootstrap() {
                _super.call(this);
                this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            }
            var __egretProto__ = Bootstrap.prototype;
            __egretProto__.onAddToStage = function (event) {
                //设置加载进度界面
                this.loadingView = new city.disp.LoadingUI(this.stage.stageWidth, this.stage.stageHeight);
                this.stage.addChild(this.loadingView);
                //初始化Resource资源加载库
                RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
                RES.loadConfig("resource/resource.json", "resource/");
            };
            /**
             * 配置文件加载完成,开始预加载preload资源组。
             */
            __egretProto__.onConfigComplete = function (event) {
                RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                RES.loadGroup("preload");
            };
            /**
             * preload资源组加载完成
             */
            __egretProto__.onResourceLoadComplete = function (event) {
                if (event.groupName == "preload") {
                    this.stage.removeChild(this.loadingView);
                    RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                    RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                    this.createGameScene();
                }
            };
            /**
             * preload资源组加载进度
             */
            __egretProto__.onResourceProgress = function (event) {
                if (event.groupName == "preload") {
                    this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
                }
            };
            /**
             * 创建游戏场景
             */
            __egretProto__.createGameScene = function () {
                jumper.GameCore.$i.launch(this);
            };
            return Bootstrap;
        })(egret.DisplayObjectContainer);
        jumper.Bootstrap = Bootstrap;
        Bootstrap.prototype.__class__ = "game.jumper.Bootstrap";
    })(jumper = game.jumper || (game.jumper = {}));
})(game || (game = {}));
