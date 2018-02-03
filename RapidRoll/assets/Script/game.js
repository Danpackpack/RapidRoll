// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

var Ball = require("ball");
var CameraManager = require("cameramanager");
var PrefabManager = require("prefabmanager");

cc.Class({
    extends: cc.Component,

    properties: {
        levDegree: 0,//难度系数
        ball: Ball,
        cameramanager: CameraManager,
        prefabmanager: PrefabManager,

        scoreLabel: cc.Label,
        lifeLabel: cc.Label,
        gameOverMenu: cc.Node,
        overScore: cc.Label,

        bgSound: cc.AudioClip,
        scoreSound: cc.AudioClip,
        crashSound: cc.AudioClip,
        overSound: cc.AudioClip,
    },

    onLoad: function () {
        //返回键返回菜单
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {
                if(keyCode == cc.KEY.back) {
                    cc.director.loadScene('Menu');
                }
            }
        },this.node);
        this.startGame();
    },
    //开始游戏
    startGame: function () {
        cc.director.getCollisionManager().enabled = true;
        this.score = 0;
        this.scoreLabel.string = "SCORE:0";
        this.lifeLabel.string = "2";
        this.cameramanager.init(this);
        this.prefabmanager.init(this);
        this.ball.init(this);
        cc.audioEngine.playMusic(this.bgSound, true);
    },
    //停止游戏
    stopGame: function () {
        cc.director.getCollisionManager().enabled = false;
        cc.audioEngine.stopMusic(this.bgSound);
        cc.audioEngine.playMusic(this.overSound);
        this.gameOverMenu.active = true;
        this.overScore.string = "FINAL SCORE  " + this.score;
        cc.find("Record").getComponent("record").updateScore(this.score);
    },
    //获得分数
    gainScore: function () {
        cc.audioEngine.playEffect(this.scoreSound);
        this.score += 10;
        this.scoreLabel.string = "SCORE:" + this.score;
    },
    //难度提升
    levelUp: function () {
        if(this.levDegree >= 0.5){
            this.levDegree = 0.5;
        }
        this.levDegree += 0.005;
    },
    //返回菜单
    toMenu: function () {
        cc.director.loadScene("MenuScene");
    }
});
