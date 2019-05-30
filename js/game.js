var cvs=document.getElementById('cvs');
var ctx=cvs.getContext('2d');
var gGame=null;
function Game() {
    var _this=this;
    this.imgCXKLeft=123.75;
    this.imgCXKTop=0;
    this.canvasImgCXKLeft=0;
    this.canvasImgCXKTop=550;
    this.canvasImgCXKTop2=500;
    this.imgBasketballLeft=20;
    this.imgBasketballTop=510;
    this.diamondsLeft=0;
    this.diamondsTop=0;
    this.startTrigger=1;//空格触发后值变成2
    this.startBallStatue=1;//开始时球跟随cxk的状态
    this.startBallStatue02=1;//开始时球移动的状态
    this.speedBall=3;
    this.speedBallLeft=3;
    this.ballAngle=0;//球和cxk中点角度
    this.diamondeWidth=50;//冰块宽度
    this.diamondeHeight=30;//冰块高度
    this.grade=128;//分数
    this.imgdanceCaiNum=1;//danceCai图片索引
    this.nextbuttonImg='nextup';

    var arr01=[100,150,200,250,300,350,400,450,500,550,600,650,700,750,800,850,900,950,1000,1050,1100,1150,1200,1250,1300,1350];
    var arr02=[100,130,160,190,220];
    var arrDiamonds=[];
    var count=0;
    var num=0;//让小方块信息只向数组推一遍

    this.startScreen=function () {

    };
    this.drawJntmBg=function () {
        var imgBG=new Image();
        imgBG.src='./images/jntmBG.png';
        ctx.beginPath();
        ctx.drawImage(imgBG,0,0,480,264,0,0,1500,700);
        ctx.stroke();
    };
    this.drawCXK=function () {
        var imgCXK=new Image();
        imgCXK.src='./images/playball.png';
        ctx.beginPath();
        ctx.drawImage(imgCXK,_this.imgCXKLeft,_this.imgCXKTop,123.75,249,_this.canvasImgCXKLeft,_this.canvasImgCXKTop,100/249*123.75,100);
        ctx.fillRect(_this.canvasImgCXKLeft,_this.canvasImgCXKTop,100/*/249*123.75*/,100);
        ctx.stroke();
    };
    this.drawBasketball=function () {
        var imgBasketball=new Image();
        imgBasketball.src='./images/basketball.png';
        ctx.beginPath();
        ctx.fillStyle='imgBasketball';
        ctx.drawImage(imgBasketball,0,0,450,449,_this.imgBasketballLeft,_this.imgBasketballTop,20,20);
        ctx.arc(_this.imgBasketballLeft+10,_this.imgBasketballTop+10,10,0,Math.PI/180*360);
        ctx.stroke();
    };


    this.drawGrade=function () {
        ctx.beginPath();
        ctx.font='20px Arial';
        ctx.fillStyle='#44c700';
        ctx.fillText('得分：',1/2*cvs.width-10,30);

        ctx.fillText(_this.grade,1/2*cvs.width-10+70,30);
        ctx.fill();
    };

    //画小方块
    this.drawDiamondsArr=function () {
        if(num==0){
            for(var i=0;i<arr01.length;i++){
                for(var j=0;j<arr02.length;j++){
                    arrDiamonds.push([arr01[i],arr02[j],_this.diamondeWidth,_this.diamondeHeight]);
                    /* for(var k=0;k<arrDiamonds.length;k++){
                         if(arrDiamonds[k][2]==190){
                             console.log('yes');
                         }
                     }*/
                }
            }
        };

        //console.log(_this.imgBasketballTop);
        //console.log(arrDiamonds);
        num++;



    };
    _this.drawDiamondsArr();
    this.drawDiamonds=function () {

        ctx.beginPath();
        ctx.strokeStyle='#2196f3';
        ctx.fillStyle='#35d7c8';
        for(var u=0;u<arrDiamonds.length;u++){
            ctx.rect(arrDiamonds[u][0],arrDiamonds[u][1],arrDiamonds[u][2],arrDiamonds[u][3]);
        }
        ctx.fill();
        ctx.stroke();
    };
    this.imgRefreshRate=function () {
        var timer=setInterval(function () {
            _this.imgdanceCaiNum++;
        },100);

    };
    _this.imgRefreshRate();
    //游戏通过
    this.goThough=function () {
        if(_this.imgdanceCaiNum==200){
            _this.imgdanceCaiNum=1;
        }

        if(_this.grade==130){
            ctx.clearRect(0,0,cvs.width,cvs.height);
            _this.drawJntmBg();
            var danceCXK=new Image();
            danceCXK.src='./images/danceCai/'+_this.imgdanceCaiNum+'.png';
            var buttonImg=new Image();
            buttonImg.src='./images/'+_this.nextbuttonImg+'.png';
            ctx.beginPath();
            ctx.drawImage(danceCXK,0,0,180,320,570,30,360,640);
            ctx.drawImage(buttonImg,0,0,156,50,1000,500,300,100);
            ctx.stroke();
        }

    };


    this.update=function () {
        _this.drawJntmBg();
        _this.drawDiamonds();
        _this.drawBasketball();
        _this.drawGrade();
        count++;
        if(_this.imgCXKLeft>1732.5){
            _this.imgCXKLeft=123.75;
        }
        _this.drawCXK();
        _this.imgCXKLeft+=123.75;
        window.requestAnimationFrame(_this.update);
        document.onkeydown=function (ev) {

            if(ev.keyCode==37&&_this.startBallStatue==1){
                if(_this.canvasImgCXKLeft>0){
                    _this.canvasImgCXKLeft-=20;
                    _this.imgBasketballLeft-=20;
                }else {
                    _this.canvasImgCXKLeft=0;
                    _this.imgBasketballLeft=20;
                }
            }
            if(ev.keyCode==39&&_this.startBallStatue==1){
                if(_this.canvasImgCXKLeft<1500-100/249*123.75){
                    _this.canvasImgCXKLeft+=20;
                    _this.imgBasketballLeft+=20;
                }else {
                    _this.canvasImgCXKLeft=1500-100/249*123.75;
                    _this.imgBasketballLeft=1500-100/249*123.75+22;
                }
            }

            if(ev.keyCode==37&&_this.startBallStatue==2){
                if(_this.canvasImgCXKLeft>0){
                    _this.canvasImgCXKLeft-=20;
                }else {
                    _this.canvasImgCXKLeft=0;
                }
            }
            if(ev.keyCode==39&&_this.startBallStatue==2){
                if(_this.canvasImgCXKLeft<1500-100/249*123.75){
                    _this.canvasImgCXKLeft+=20;
                }else {
                    _this.canvasImgCXKLeft=1500-100/249*123.75;
                }
            }


            if(ev.keyCode==32&&_this.startTrigger==1){
                _this.startTrigger=2;
                _this.startBallStatue=2;
            }

        };

        //球left和top之间的关系
        if(_this.startTrigger==2){
            _this.imgBasketballTop-=_this.speedBall; //高度减少
            _this.imgBasketballLeft+=(Math.sqrt(3)*_this.speedBallLeft/3);
        }
        //球在上边界
        if(_this.imgBasketballTop<=10){

            _this.speedBall=_this.speedBall*-1;
            _this.speedBallLeft=_this.speedBallLeft;
            // console.log(_this.speedBall);
            // console.log(_this.speedBallLeft);

        };
        //球在左右边界
        if(_this.imgBasketballLeft<=10||_this.imgBasketballLeft>=cvs.width-20){
            _this.speedBall=_this.speedBall;
            _this.speedBallLeft=_this.speedBallLeft*-1;
        }
        //球在cxk头上的时候,反弹
        if(_this.imgBasketballLeft>=_this.canvasImgCXKLeft&&_this.imgBasketballLeft<=_this.canvasImgCXKLeft+100/*/249*123.75*/-20){
            if(_this.imgBasketballTop+40<=550){
            }else {
                _this.speedBall=_this.speedBall*-1;

            }
        }
        //球在cxk左右边界的时候
        if(_this.imgBasketballLeft>=_this.canvasImgCXKLeft&&_this.imgBasketballTop>=_this.canvasImgCXKTop&&_this.imgBasketballTop<=_this.canvasImgCXKTop+100||_this.imgBasketballLeft<=_this.canvasImgCXKLeft+100&&_this.imgBasketballTop>=_this.canvasImgCXKTop&&_this.imgBasketballTop<=_this.canvasImgCXKTop+100){
            _this.speedBall=_this.speedBall;
            _this.speedBallLeft=_this.speedBallLeft*-1;
        }
        //没接住球
        if(_this.imgBasketballTop>=cvs.height-10){
            ctx.clearRect(0,0,cvs.width,cvs.height);
            _this.drawJntmBg();
            ctx.font='80px Arial';
            ctx.fillText('蔡徐坤，你的球掉了',cvs.width/4,cvs.height/4);
            ctx.fill();
        }


        //小球撞方块事件
        for(var k=0;k<arrDiamonds.length;k++){
            //方块上下判断
            if(_this.imgBasketballLeft>=arrDiamonds[k][0]&&_this.imgBasketballLeft<=arrDiamonds[k][0]+50-10){
                //小球撞方块底部的时候
                if(_this.imgBasketballTop<=(arrDiamonds[k][1]+30)&&_this.imgBasketballTop>=(arrDiamonds[k][1]+5)){
                    _this.speedBall=_this.speedBall*-1;
                    _this.speedBallLeft=_this.speedBallLeft;
                    /* arrDiamonds[k][2]=0;
                     arrDiamonds[k][3]=0;*/
                    arrDiamonds[k][0]=-100;
                    arrDiamonds[k][1]=-100;
                    _this.grade=_this.grade+1;
                }
                //小球撞方块顶部的时候
                if(_this.imgBasketballTop>=(arrDiamonds[k][1])&&_this.imgBasketballTop<=(arrDiamonds[k][1]+5)){
                    _this.speedBall=_this.speedBall*-1;
                    _this.speedBallLeft=_this.speedBallLeft;
                    arrDiamonds[k][0]=-100;
                    arrDiamonds[k][1]=-100;
                    _this.grade=_this.grade+1;
                }
            }
            //小球撞方块左右的时候
            if(_this.imgBasketballTop<=arrDiamonds[k][1]+30&&_this.imgBasketballTop>=arrDiamonds[k][1]){
                //左
                if(_this.imgBasketballLeft>=arrDiamonds[k][0]&&_this.imgBasketballLeft<=arrDiamonds[k][0]-5){
                    _this.speedBall=_this.speedBall;
                    _this.speedBallLeft=_this.speedBallLeft*-1;
                    arrDiamonds[k][0]=-100;
                    arrDiamonds[k][1]=-100;
                    _this.grade=_this.grade+1;
                }
                if(_this.imgBasketballLeft<=arrDiamonds[k][0]+50&&_this.imgBasketballLeft>=arrDiamonds[k][0]+45){
                    _this.speedBall=_this.speedBall;
                    _this.speedBallLeft=_this.speedBallLeft*-1;
                    arrDiamonds[k][0]=-100;
                    arrDiamonds[k][1]=-100;
                    _this.grade=_this.grade+1;
                }
            }
        }

        //游戏通关
        _this.goThough();


        //鼠标按下nextbutton图片改变
        document.onmousedown=function (eve) {
            console.log(eve.pageX);
            console.log(eve.pageY);
            if(eve.pageX>=1000&&eve.pageX<=1300&&eve.pageY>=500&&eve.pageY<=600){
                _this.nextbuttonImg='nextdown';
            }
            document.onmouseup=function () {
                _this.nextbuttonImg='nextup';
            }
        }


    };

}

gGame=new Game();

gGame.update();


//gGame.drawDiamonds();
//var gGame2=new IceDiamonds();
//gGame2.drawDiamonds();
