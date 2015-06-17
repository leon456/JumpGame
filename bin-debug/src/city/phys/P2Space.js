/**
 * Created by egret on 2015/1/9.
 * author: city@egret-labs.org
 */
var city;
(function (city) {
    var phys;
    (function (phys) {
        var P2Space = (function () {
            function P2Space() {
            }
            var __egretProto__ = P2Space.prototype;
            P2Space.checkIfCanJump = function (world, body) {
                var result = false;
                for (var i = 0; i < world.narrowphase.contactEquations.length; i++) {
                    var c = world.narrowphase.contactEquations[i];
                    if (c.bodyA === body || c.bodyB === body) {
                        var d = p2.vec2.dot(c.normalA, this.yAxis); // Normal dot Y-axis
                        if (c.bodyA === body)
                            d *= -1;
                        if (d > 0.5)
                            result = true;
                    }
                }
                return result;
            };
            P2Space.syncDisplay = function (body) {
                var disp = body.displays[0];
                if (disp) {
                    var loc = P2Space.getEgretLoc(body);
                    disp.x = loc[0];
                    disp.y = loc[1];
                    disp.rotation = 360 - body.angle * 180 / Math.PI;
                }
            };
            P2Space.extentEgret = function (extentP2) {
                return extentP2 * this.$factor;
            };
            P2Space.extentP2 = function (extentEgret) {
                return extentEgret / this.$factor;
            };
            P2Space.getP2Pos = function (xEgret, yEgret) {
                return [xEgret / this.$factor, (this._rectWorld.height - yEgret) / this.$factor];
            };
            P2Space.getEgretLoc = function (body) {
                //var shp:p2.Shape = body.shapes[0];
                var xP2 = body.position[0];
                var yP2 = body.position[1];
                /*switch ( shp.type ){
                 case p2.Shape.RECTANGLE:
                 xP2 -= (<p2.Rectangle>shp).width / 2;
                 yP2 -= (<p2.Rectangle>shp).height / 2;
                 break;
                 case p2.Shape.CIRCLE:
                 xP2 -= (<p2.Circle>shp).radius;
                 yP2 -= (<p2.Circle>shp).radius;
                 break;
                 }*/
                return [xP2 * this.$factor, this._rectWorld.height - yP2 * this.$factor];
            };
            P2Space.initSpace = function (factor, rectWorld) {
                this.$factor = factor;
                this._rectWorld = rectWorld;
            };
            /**
             * debug模式，使用图形绘制
             * from jerry
             */
            P2Space.debug = function (world) {
                var factor = 50;
                var canvas = document.createElement("canvas");
                var stage = egret.MainContext.instance.stage;
                var stageWidth = stage.stageWidth;
                var stageHeight = stage.stageHeight;
                canvas.width = stageWidth;
                canvas.height = stageHeight;
                var ctx = canvas.getContext("2d");
                ctx.fillStyle = "rgba(" + 255 + "," + 255 + "," + 0 + "," + .5 + ")";
                ctx.strokeStyle = "rgba(" + 255 + "," + 0 + "," + 0 + "," + 1 + ")";
                ctx.lineWidth = 1;
                var rendererContext = egret.MainContext.instance.rendererContext;
                var f = rendererContext['onRenderFinish'];
                rendererContext['onRenderFinish'] = function () {
                    ctx.clearRect(0, 0, stageWidth, stageHeight);
                    var l = world.bodies.length;
                    for (var i = 0; i < l; i++) {
                        var boxBody = world.bodies[i];
                        if (boxBody.sleepState == p2.Body.SLEEPING) {
                            ctx.globalAlpha = 0.5;
                        }
                        else {
                            ctx.globalAlpha = 1;
                        }
                        for (var j = 0; j < boxBody.shapes.length; j++) {
                            var boxShape = boxBody.shapes[j];
                            if (boxShape instanceof p2.Rectangle) {
                                var x = (boxBody.position[0] + +boxBody.shapeOffsets[j][0]) * factor;
                                var y = stageHeight - (boxBody.position[1] + +boxBody.shapeOffsets[j][1]) * factor;
                                var w = boxShape.width * factor;
                                var h = boxShape.height * factor;
                                var matrix = egret.Matrix.identity.identity();
                                matrix.prependTransform(x, y, 1, 1, 360 - boxBody.angle * 180 / Math.PI, 0, 0, 0, 0);
                                ctx.save();
                                ctx.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
                                ctx.beginPath();
                                ctx.rect(-boxShape.width / 2 * factor, -boxShape.height / 2 * factor, w, h);
                                ctx.fill();
                                ctx.closePath();
                                ctx.restore();
                            }
                            else if (boxShape instanceof p2.Plane) {
                                ctx.save();
                                ctx.setTransform(1, 0, 0, 1, 0, stageHeight - (boxBody.position[1] + boxBody.shapeOffsets[j][1]) * factor);
                                ctx.beginPath();
                                ctx.moveTo(0, 0);
                                ctx.lineTo(stageWidth, 0);
                                ctx.stroke();
                                ctx.closePath();
                                ctx.restore();
                            }
                            else if (boxShape instanceof p2.Circle) {
                                var x = (boxBody.position[0] + boxBody.shapeOffsets[j][0]) * factor;
                                var y = stageHeight - (boxBody.position[1] + boxBody.shapeOffsets[j][1]) * factor;
                                var matrix = egret.Matrix.identity.identity();
                                matrix.prependTransform(x, y, 1, 1, 360 - boxBody.angle * 180 / Math.PI, 0, 0, 0, 0);
                                ctx.save();
                                ctx.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
                                ctx.beginPath();
                                ctx.arc(0, 0, boxShape.radius * factor, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.closePath();
                                ctx.restore();
                            }
                        }
                    }
                    rendererContext["_cacheCanvasContext"].drawImage(canvas, 0, 0, stageWidth, stageHeight, 0, 0, stageWidth, stageHeight);
                    f.call(rendererContext);
                };
            };
            P2Space.yAxis = p2.vec2.fromValues(0, 1);
            return P2Space;
        })();
        phys.P2Space = P2Space;
        P2Space.prototype.__class__ = "city.phys.P2Space";
    })(phys = city.phys || (city.phys = {}));
})(city || (city = {}));
