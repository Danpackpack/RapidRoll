"use strict";
cc._RF.push(module, '2b634YcLXpP55AXutuq28k2', 'prefabmanager');
// Script/prefabmanager.js

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
        stairPre: cc.Prefab,
        stairKillerPre: cc.Prefab,
        prefabLayer: cc.Node,

        stairSpace: 0, //上下梯子间距
        oStairY: 0, //第一个梯子位置
        stairCount: 0 //梯子数量
    },

    init: function init(game) {
        this.game = game;
        this.stairPool = new cc.NodePool();
        this.stairKillerPool = new cc.NodePool();
        for (var i = 0; i < 8; i++) {
            this.stairPool.put(cc.instantiate(this.stairPre));
        }
        for (var i = 0; i < 4; i++) {
            this.stairKillerPool.put(cc.instantiate(this.stairKillerPre));
        }
        this.currentStairY = this.oStairY; //当前梯子位置
        for (var i = 0; i < 8; i++) {
            this.newStair();
        }

        cc.director.getCollisionManager().enabled = true;
    },

    onCollisionEnter: function onCollisionEnter(other, self) {
        if (other.tag === 100) {
            this.desStair(other.node);
        }
        if (other.tag === 101) {
            this.desStairKiller(other.node);
        }
    },

    newStair: function newStair() {
        this.stairCount += 1;
        var stairGroup = null;
        var randD = cc.random0To1();
        if (randD > this.game.levDegree) {
            if (this.stairPool.size() > 0) {
                stairGroup = this.stairPool.get();
            } else {
                stairGroup = cc.instantiate(this.stairPre);
            }
        } else if (randD <= this.game.levDegree) {
            if (this.stairKillerPool.size() > 0) {
                stairGroup = this.stairKillerPool.get();
            } else {
                stairGroup = cc.instantiate(this.stairKillerPre);
            }
        }
        this.prefabLayer.addChild(stairGroup);

        var stairX = 500 * cc.random0To1() - 250;
        var stairY = this.currentStairY;
        stairGroup.setPosition(stairX, stairY);

        this.currentStairY -= this.stairSpace;
        //cc.log(stairX);

        //cc.log(stairY);
    },

    desStair: function desStair(node) {
        this.stairPool.put(node);
        this.newStair();
    },

    desStairKiller: function desStairKiller(node) {
        this.stairKillerPool.put(node);
        this.newStair();
    }
});

cc._RF.pop();