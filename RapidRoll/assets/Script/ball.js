// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

var STATE = cc.Enum({
    NONE: 0,
    NORMAL: 1,
    THUMP: 2,
    DEAD: 3,
});
cc.Class({
    extends: cc.Component,

    properties: {
        //水平速度
        movespeed: 0,
        //垂直速度
        speedY: 0,
        //重力加速度
        gravity: 0,

        state: {
            default: STATE.NONE,
            type: STATE,
            visible: false,
        },

        crashSound: cc.AudioClip,
    },

    init: function (game) {
        this.game = game;
        this.state = STATE.NORMAL;
        this.life = this.game.lifeLabel.string;
        this.oBallX = this.node.x;
        this.oBallY = this.node.y;
        this.registerInput();
    },

    onCollisionEnter: function (other, self) {
        if(this.state == STATE.NORMAL) {
            this.state = STATE.THUMP;
            if(other.tag == 100) {
                //this.node.y = this.node.y;
                //cc.log(other.offset.y);
                this.game.gainScore();
                this.game.levelUp();
                this.onStair = true;
            }
            if(other.tag == 200 || other.tag == 300 || other.tag == 101){
                cc.audioEngine.playEffect(this.crashSound);
                this.die();
            }
        }
    },

    onCollisionExit: function (other, self) {
        this.state = STATE.NORMAL;
        this.onStair = false;
        this.speedY = 0;
    },

    registerInput: function () {
        var self = this;
        //键盘事件
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event){
                switch(keyCode){
                    case cc.KEY.a: self.moveLeft = true; break;
                    case cc.KEY.d: self.moveRight = true; break;
                }
            },
            onKeyReleased: function(keyCode, event) {
                switch(keyCode){
                    case cc.KEY.a: self.moveLeft = false; break;
                    case cc.KEY.d: self.moveRight = false; break;
                }
            }
        },self.node);
    },

    die: function () {
        this.state = STATE.DEAD;
        this.node.color = cc.Color.RED;
        this.life--;
        this.game.lifeLabel.string = this.life;
        if(this.life == 0){
            this.game.stopGame();
        }else{
            this.recover();
        }
    },

    recover: function () {
        this.state = STATE.NORMAL;
        this.node.color = cc.Color.WHITE;
        this.node.x = this.oBallX;
        this.node.y = this.oBallY;
    },

    update (dt) {
        if(this.node.x <= -290){
            this.node.x = -290;
        }
        if(this.node.x >= 285){
            this.node.x = 285;
        }
        if(this.state != STATE.NONE && this.state != STATE.DEAD){
            if(!this.moveLeft && !this.moveRight){
                this.speedX = 0;
            }else if(this.moveLeft && this.moveRight){
                this.speedX = 0;
            }else if(this.moveLeft && !this.moveRight){
                this.speedX = -this.movespeed;
            }else if(!this.moveLeft && this.moveRight){
                this.speedX = this.movespeed;
            }

            this.node.x += this.speedX * dt;

            if(this.state == STATE.NORMAL){
                this.speedY += this.gravity * dt;
                this.node.y -= this.speedY * dt;
                this.game.cameramanager.moveBg(this.speedY * dt);
            }else if(this.state == STATE.THUMP && this.onStair == true){
                this.node.y += this.game.cameramanager.layerSpeed * dt;
            }
        }
    },
});
