/**
 * Created by egret on 2015/2/4.
 */
var game;
(function (game) {
    var jumper;
    (function (jumper) {
        var GameCore = (function (_super) {
            __extends(GameCore, _super);
            function GameCore() {
                _super.call(this);
                this.PLAYER_VY = 9;
                this.PLAYER_VX = 3;
                this.leftOrRight = 1;
                this.WORLD_STEP_DT = 0.05;
                this.scoreNum = 0;
            }
            var __egretProto__ = GameCore.prototype;
            __egretProto__.touchProcess = function (e) {
                if (city.key.KeyManager.isDown(city.key.KeyManager.Alt_L)) {
                    console.log("touchProcess 1");
                    this.debugLogLoc(Math.floor(e._stageX), Math.floor(e._stageY));
                }
                else if (e.stageY > 750) {
                    console.log("touchProcess 2");
                    if (e.stageX < 240) {
                        this._pbPlayer.velocity[0] = -this.PLAYER_VX;
                    }
                    else {
                        this._pbPlayer.velocity[0] = this.PLAYER_VX;
                    }
                }
                else {
                    //if( city.phys.P2Space.checkIfCanJump( this._pw, this._pbPlayer ) ){
                    this._pbPlayer.velocity[1] = this.PLAYER_VY;
                    this._pbPlayer.velocity[0] = this.PLAYER_VX * this.leftOrRight;
                }
            };
            __egretProto__.run = function (dt) {
                this._pw.step(this.WORLD_STEP_DT);
                this.system.emitterX = this._pbPlayer.displays[0].x;
                this.system.emitterY = this._pbPlayer.displays[0].y;
                this.system.start();
                /// 玩家
                city.phys.P2Space.syncDisplay(this._pbPlayer);
                /// 浮动板
                if (this._vcGroundsFloating[0].position[0] > this._p2FloatingLimitRight) {
                    this._vcGroundsFloating[0].position[0] = this._p2FloatingLimitLeft;
                }
                city.phys.P2Space.syncDisplay(this._vcGroundsFloating[0]);
                if (this._vcGroundsFloating[1].position[0] < this._p2FloatingLimitLeft) {
                    this._vcGroundsFloating[1].position[0] = this._p2FloatingLimitRight;
                }
                city.phys.P2Space.syncDisplay(this._vcGroundsFloating[1]);
                if (this._vcGroundsFloating[2].position[0] > this._p2FloatingLimitRight) {
                    this._vcGroundsFloating[2].position[0] = this._p2FloatingLimitLeft;
                }
                city.phys.P2Space.syncDisplay(this._vcGroundsFloating[2]);
            };
            __egretProto__.setDev = function () {
            };
            __egretProto__.initDebug = function () {
                /// debug显示
                egret.Profiler.getInstance().run();
                this._txTouchStatus = new city.disp.TxButtonHasId;
                city.utils.DispUtil.layoutTxButtonHasId(-1, this._txTouchStatus, "", 280, 3, this, null, null, 28, 0);
            };
            __egretProto__.beginContactHandler = function (event) {
                console.log(event.bodyA.id, event.bodyB.id);
                if (event.bodyA.id == 0) {
                    switch (event.bodyB.id) {
                        case 1:
                            this._pbPlayer.fixedRotation = false;
                            this._pbPlayer.velocity[1] = 1;
                            this._pbPlayer.velocity[0] = (this.PLAYER_VX + 10) * this.leftOrRight;
                            break;
                        case 2:
                            this.scoreNum++;
                            this.score.text = this.scoreNum.toString();
                            this.leftOrRight = 1;
                            this._pbPlayer.velocity[1] = this.PLAYER_VY + 1;
                            this._pbPlayer.velocity[0] = this.PLAYER_VX * this.leftOrRight;
                            this._pbPlayer.displays[0].scaleX = this.leftOrRight;
                            break;
                        case 3:
                            this.scoreNum++;
                            this.score.text = this.scoreNum.toString();
                            this.leftOrRight = -1;
                            this._pbPlayer.velocity[1] = this.PLAYER_VY + 1;
                            this._pbPlayer.velocity[0] = this.PLAYER_VX * this.leftOrRight;
                            this._pbPlayer.displays[0].scaleX = this.leftOrRight;
                            break;
                        case 4:
                        case 5:
                        case 6:
                            break;
                    }
                }
                //console.log("endContactHandler", event.bodyA, event.bodyB, event.shapeA, event.shapeB,"contactEquations:"+ event.contactEquations ); 
            };
            __egretProto__.endContactHandler = function (event) {
                //this.removeChild(this.system);
                this.system.stop();
                //console.log("endContactHandler", event.bodyA, event.bodyB, event.shapeA, event.shapeB,"contactEquations:"+ event.contactEquations );
            };
            __egretProto__.createWorldSystem = function () {
                /// P2Center 初始化
                city.phys.P2Space.initSpace(50, new egret.Rectangle(0, 0, this.stage.stageWidth, this.stage.stageHeight));
                this._p2FloatingLimitLeft = city.phys.P2Space.extentP2(-100);
                this._p2FloatingLimitRight = city.phys.P2Space.extentP2(this.stage.stageWidth + 100);
                //创建 world
                this._pw = new p2.World();
                this._pw.on("beginContact", this.beginContactHandler, this);
                this._pw.on("endContact", this.endContactHandler, this);
                //this._pw.sleepMode = p2.World.BODY_SLEEPING;
                this._pw.defaultContactMaterial.friction = 0.5;
                this._pw['setGlobalStiffness'](1e5);
                //P2Center.debug( world );
                //this._pw.gravity[1] = -20;
                city.utils.DevUtil.trace("gravity:", this._pw.gravity[0], this._pw.gravity[1]);
                /// 创建浮动跳板
                this._vcGroundsFloating = [
                    this.createGround(this._pw, this, 4, 0.6, 120, 20, "rects.rect-" + "0", this._p2FloatingLimitLeft, 600),
                    this.createGround(this._pw, this, 5, -0.8, 90, 20, "rects.rect-" + "8", this._p2FloatingLimitRight, 450),
                    this.createGround(this._pw, this, 6, 1.2, 80, 20, "rects.rect-" + "10", this._p2FloatingLimitLeft, 300)
                ];
                /// 创建 墙面 底部高50, 两边墙面间距50
                this._vcGroundsFixed = [
                    this.createGround(this._pw, this, 7, 0, 640, 50, "rects.rect-" + "9", 0, 0),
                    this.createGround(this._pw, this, 1, 0, 640, 50, "rects.rect-" + "9", 0, 750),
                    this.createGround(this._pw, this, 2, 0, 0, 750, "rects.rect-" + "1", 0, 0),
                    this.createGround(this._pw, this, 3, 0, 0, 750, "rects.rect-" + "1", 475, 0)
                ];
                city.phys.P2Space.syncDisplay(this._vcGroundsFixed[0]);
                city.phys.P2Space.syncDisplay(this._vcGroundsFixed[1]);
                city.phys.P2Space.syncDisplay(this._vcGroundsFixed[2]);
                /// 玩家
                this._pbPlayer = this.createPlayer(this._pw, this, 0, "bear_png", 200, 750);
                //鼠标点击跳跃
                this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchProcess, this, false);
            };
            /**
             * 创建玩家
             * @param world
             * @param container
             * @param id
             * @param resid
             * @param xLanding          显示像素坐标系
             * @param yLanding          显示像素坐标系，以玩家底部为准，函数将根据宽度自动调整
             * @returns {p2.Body}
             */
            __egretProto__.createPlayer = function (world, container, id, resid, xLanding, yLanding) {
                var p2body = new p2.Body({ mass: 1, fixedRotation: true, type: p2.Body.DYNAMIC });
                p2body.id = id;
                world.addBody(p2body);
                /// 依照图元尺寸
                var display = city.utils.DispUtil.createBitmapByName(resid);
                display.anchorX = display.anchorY = .5;
                /// 对应p2形状的宽高要根据玩家计算
                var p2rect = new p2.Rectangle(city.phys.P2Space.extentP2(display.texture.textureWidth), city.phys.P2Space.extentP2(display.texture.textureHeight));
                p2body.addShape(p2rect);
                p2body.position = city.phys.P2Space.getP2Pos(xLanding, yLanding - display.texture.textureHeight / 2);
                this._p2posYPlayerLanding = p2body.position[1];
                p2body.displays = [display];
                container.addChild(display);
                return p2body;
            };
            /**
             * 地面，泛义，也包含了墙面
             * @param world
             * @param container
             * @param id
             * @param vx                不论固定地面、移动地面、还是墙面，均不需要设置y方向的速度。
             *                                     且本游戏中，地面的速度没有变化的，只有固定的
             *                                     函数将根据此值是否为零自动设置Body类型
             * @param w
             * @param h
             * @param resid
             * @param x0                    只需给出左上角坐标，函数会自动根据宽度调整
             * @param y0
             * @returns {p2.Body}
             */
            __egretProto__.createGround = function (world, container, id, vx, w, h, resid, x0, y0) {
                var p2body = new p2.Body({ mass: 1, fixedRotation: true, position: city.phys.P2Space.getP2Pos(x0 + w / 2, y0 + h / 2), type: vx == 0 ? p2.Body.STATIC : p2.Body.KINEMATIC, velocity: [vx, 0] });
                p2body.id = id;
                console.log("位置：", p2body.position);
                world.addBody(p2body);
                var p2rect = new p2.Rectangle(city.phys.P2Space.extentP2(w), city.phys.P2Space.extentP2(h));
                p2body.addShape(p2rect);
                var bitmap = city.utils.DispUtil.createBitmapByName(resid);
                bitmap.width = w;
                bitmap.height = h;
                bitmap.anchorX = bitmap.anchorY = .5;
                p2body.displays = [bitmap];
                container.addChild(bitmap);
                return p2body;
            };
            __egretProto__.launch = function (container) {
                var texture = RES.getRes("newParticle_png");
                var config = RES.getRes("newParticle_json");
                this.system = new particle.GravityParticleSystem(texture, config);
                container.addChildAt(this.system, 0);
                this.score = new egret.TextField();
                this.score.text = "0";
                this.score.x = 240;
                this.score.y = 300;
                container.addChild(this.score);
                var uiStage = new egret.gui.UIStage();
                container.addChild(uiStage);
                uiStage.addElement(new live.Menu());
                container.addChild(this);
                city.key.KeyManager.init();
                this.initDebug();
                this.createWorldSystem();
                //P2Space.debug( this._pw );
                /// run the world
                egret.Ticker.getInstance().register(this.run, this);
            };
            __egretProto__.debugLogLoc = function (x, y) {
                this._txTouchStatus.text = "[" + x + "," + y + "]";
            };
            Object.defineProperty(GameCore, "$i", {
                get: function () {
                    if (this._i == null) {
                        this._i = new GameCore;
                    }
                    return this._i;
                },
                enumerable: true,
                configurable: true
            });
            return GameCore;
        })(egret.Sprite);
        jumper.GameCore = GameCore;
        GameCore.prototype.__class__ = "game.jumper.GameCore";
    })(jumper = game.jumper || (game.jumper = {}));
})(game || (game = {}));
