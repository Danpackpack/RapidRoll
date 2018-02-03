"use strict";
cc._RF.push(module, '4e86eMshXVK94MYoqaMn+0/', 'cameramanager');
// Script/cameramanager.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        cloud: cc.Node,
        //相对小球移动速度
        cloudRelSpeed: 0,
        //循环滚动距离
        cloudOffY: 0,

        prefabLayer: cc.Node,
        layerSpeed: 0
    },

    init: function init(game) {
        this.game = game;
        this.oCloudY = this.cloud.y; //初始节点位置
    },

    moveBg: function moveBg(distance) {
        this.cloud.y += distance * this.cloudRelSpeed;
        if (this.cloud.y > this.cloudOffY - this.oCloudY) {
            this.cloud.y = this.oCloudY;
        }
    },

    update: function update(dt) {
        if (this.game.ball.state != 3) {
            this.prefabLayer.y += dt * this.layerSpeed;
        }
    }
});

cc._RF.pop();