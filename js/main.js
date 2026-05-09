var gGame;
(function () {
    var cvs = document.getElementById('cvs');
    var ctx = cvs.getContext('2d');

    var CV_W = cvs.width;
    var CV_H = cvs.height;
    var PADDLE_W = 100;
    var PADDLE_H = 100;
    var PADDLE_TOP = 550;
    var BALL_SIZE = 20;
    var BALL_R = BALL_SIZE / 2;

    function img(src) {
        var i = new Image();
        i.src = src;
        return i;
    }

    function Game() {
        var _this = this;

        this.screenMode = 'menu';
        this.gameState = 'playing';

        this.canvasImgCXKLeft = 0;
        this.canvasImgCXKTop = PADDLE_TOP;
        this.imgCXKLeft = 123.75;
        this.imgCXKTop = 0;

        this.imgBasketballLeft = 20;
        this.imgBasketballTop = 510;

        this.startTrigger = 1;
        this.startBallStatue = 1;

        this.speedBall = 5;
        this.speedBallLeft = 5;

        this.diamondeWidth = 50;
        this.diamondeHeight = 30;

        this.grade = 0;
        this.imgdanceCaiNum = 1;
        this.nextbuttonImg = 'nextup';

        this.startButtonImgTop = 550;
        this.startButtonImg = 'imgStartGame';
        this.redioBtnImg = 'redbtn';
        this.redioBtnStatus = 1;
        this.redioBtnTimerClock = 0;
        this.startbtnupstatus = 1;
        this.walkImg = 623;
        this.startScreenTimer = 1;
        this.txtHint = '请先匹配模式！';
        this.heroOnclickStatue = 1;

        this.startBtnPressed = false;

        var arr01 = [100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350];
        var arr02 = [100, 130, 160, 190, 220];
        var arrDiamonds = [];
        var winScore = arr01.length * arr02.length;

        for (var ii = 0; ii < arr01.length; ii++) {
            for (var jj = 0; jj < arr02.length; jj++) {
                arrDiamonds.push([arr01[ii], arr02[jj], _this.diamondeWidth, _this.diamondeHeight]);
            }
        }

        var assets = {
            jntmBg: img('./images/jntmBG.png'),
            basketball: img('./images/basketball.png'),
            trainee01: img('./images/HERO/sing.png'),
            trainee02: img('./images/HERO/rap.png'),
            trainee03: img('./images/HERO/CXK.png'),
            trainee04: img('./images/HERO/LYL.png'),
            btnStart: img('./images/imgStartGame.png'),
            btnStartDown: img('./images/imgStartGame02.png'),
            btnRed: img('./images/redbtn.png'),
            btnYellow: img('./images/yellowbtn.png')
        };

        var walkSheet = new Image();
        var winDanceImg = new Image();
        var winBtnImg = new Image();

        function paddleRight() {
            return _this.canvasImgCXKLeft + PADDLE_W;
        }

        function ballCx() {
            return _this.imgBasketballLeft + BALL_R;
        }

        function ballCy() {
            return _this.imgBasketballTop + BALL_R;
        }

        function clampPaddle() {
            var maxLeft = CV_W - PADDLE_W;
            if (_this.canvasImgCXKLeft < 0) {
                _this.canvasImgCXKLeft = 0;
            }
            if (_this.canvasImgCXKLeft > maxLeft) {
                _this.canvasImgCXKLeft = maxLeft;
            }
        }

        function syncBallToPaddle() {
            _this.imgBasketballLeft = _this.canvasImgCXKLeft + (PADDLE_W - BALL_SIZE) / 2;
        }

        function canvasXY(ev) {
            return {
                x: ev.pageX - cvs.offsetLeft,
                y: ev.pageY - cvs.offsetTop
            };
        }

        function resetShadow() {
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowColor = 'rgba(0,0,0,0)';
        }

        this.startBGOne = function () {
            ctx.clearRect(0, 0, CV_W, CV_H);
            ctx.fillStyle = '#312a2a';
            ctx.fillRect(0, 0, CV_W, CV_H);
        };

        function drawTrainee(imgEl, baseX) {
            if (!imgEl.complete) {
                return;
            }
            resetShadow();
            ctx.drawImage(imgEl, 0, 0, 336, 336, baseX, 100, 200, 200);
        }

        this.drawTrainee01 = function () {
            drawTrainee(assets.trainee01, 200);
        };
        this.drawTrainee02 = function () {
            drawTrainee(assets.trainee02, 500);
        };
        this.drawTrainee03 = function () {
            drawTrainee(assets.trainee03, 800);
        };
        this.drawTrainee04 = function () {
            drawTrainee(assets.trainee04, 1100);
        };

        this.startButton = function () {
            resetShadow();
            var src = _this.startButtonImg === 'imgStartGame02' ? assets.btnStartDown : assets.btnStart;
            if (src.complete) {
                ctx.drawImage(src, 0, 0, 283, 79, 610, _this.startButtonImgTop, 283, 79);
            }
        };

        this.drawRedioBtn = function () {
            resetShadow();
            var rib = _this.redioBtnImg === 'yellowbtn' ? assets.btnYellow : assets.btnRed;
            if (rib.complete) {
                ctx.drawImage(rib, 0, 0, 169, 166, 700, 350, 100, 100);
            }
        };

        this.txtDrawRedio = function () {
            resetShadow();
            ctx.font = '20px Arial';
            ctx.fillStyle = '#fff';
            ctx.fillText(_this.txtHint, 850, 430);
        };

        this.txtCloseCXK = function () {
            resetShadow();
            ctx.font = '20px Arial';
            ctx.fillStyle = '#fff';
            ctx.fillText('你选择了蔡徐坤！！！', 850, 430);
        };

        this.txtOnclickThisBtn = function () {
            resetShadow();
            ctx.font = '20px Arial';
            ctx.fillStyle = '#fff';
            ctx.fillText('请点击此按钮===>', 490, 400);
        };

        this.otherTxtInStartScreen = function () {
            resetShadow();
            ctx.font = '50px 华文琥珀';
            ctx.fillStyle = '#7efe00';
            ctx.fillText('请选择一个练习生', 550, 50);
            ctx.font = '20px Arial';
            ctx.fillStyle = '#fff';
            ctx.fillText('温馨提醒：爱坤人士请勿玩此游戏，本游戏不存在商业用途，纯属个人娱乐。(^_^)', 400, 695);
        };

        this.startScreen = function () {
            if (_this.screenMode !== 'menu') {
                return;
            }
            _this.startBGOne();
            _this.drawTrainee01();
            _this.drawTrainee02();
            _this.drawTrainee03();
            _this.drawTrainee04();
            _this.startButton();
            _this.drawRedioBtn();
            _this.otherTxtInStartScreen();
            _this.startScreenTimer++;

            if (_this.heroOnclickStatue === 2) {
                _this.txtOnclickThisBtn();
            }
            if (_this.redioBtnStatus === 2) {
                _this.redioBtnTimerClock++;
            }
            if (_this.redioBtnTimerClock >= 490) {
                _this.txtHint = '你选择了蔡徐坤！！！';
                _this.txtCloseCXK();
            }
            if (_this.startbtnupstatus === 3) {
                _this.txtDrawRedio();
            }

            window.requestAnimationFrame(_this.startScreen);
        };

        this.drawJntmBg = function () {
            resetShadow();
            if (assets.jntmBg.complete) {
                ctx.drawImage(assets.jntmBg, 0, 0, 480, 264, 0, 0, CV_W, CV_H);
            }
        };

        this.drawCXK = function () {
            if (_this.walkImg === 665) {
                _this.walkImg = 623;
            }
            walkSheet.src = './images/walk/' + _this.walkImg + '.png';
            if (walkSheet.complete) {
                resetShadow();
                ctx.drawImage(walkSheet, _this.imgCXKLeft, _this.imgCXKTop, 744, 720, _this.canvasImgCXKLeft, _this.canvasImgCXKTop, PADDLE_W, PADDLE_H);
            }
        };

        this.drawBasketball = function () {
            if (assets.basketball.complete) {
                resetShadow();
                ctx.drawImage(assets.basketball, 0, 0, 450, 449, _this.imgBasketballLeft, _this.imgBasketballTop, BALL_SIZE, BALL_SIZE);
            }
        };

        this.drawGrade = function () {
            resetShadow();
            ctx.font = 'bolder 30px Arial';
            ctx.fillStyle = '#673ab7';
            ctx.textBaseline = 'top';
            ctx.fillText('得分：', CV_W / 2 - 20, 10);
            ctx.fillText(String(_this.grade), CV_W / 2 - 10 + 70, 10);
        };

        this.drawDiamonds = function () {
            resetShadow();
            ctx.fillStyle = '#35d7c8';
            for (var u = 0; u < arrDiamonds.length; u++) {
                if (arrDiamonds[u][0] < 0) {
                    continue;
                }
                ctx.fillRect(arrDiamonds[u][0], arrDiamonds[u][1], arrDiamonds[u][2], arrDiamonds[u][3]);
            }
        };

        setInterval(function () {
            if (_this.gameState === 'won') {
                _this.imgdanceCaiNum++;
                if (_this.imgdanceCaiNum > 199) {
                    _this.imgdanceCaiNum = 1;
                }
                winDanceImg.src = './images/danceCai/' + _this.imgdanceCaiNum + '.png';
            }
        }, 80);

        this.goThough = function () {
            if (_this.gameState !== 'won') {
                return;
            }
            ctx.clearRect(0, 0, CV_W, CV_H);
            _this.drawJntmBg();
            winBtnImg.src = './images/' + _this.nextbuttonImg + '.png';
            resetShadow();
            if (winDanceImg.complete) {
                ctx.drawImage(winDanceImg, 0, 0, 180, 320, 570, 30, 360, 640);
            }
            if (winBtnImg.complete) {
                ctx.drawImage(winBtnImg, 0, 0, 156, 50, 1000, 500, 300, 100);
            }
        };

        function tryBrickCollision() {
            var cx = ballCx();
            var cy = ballCy();
            for (var k = 0; k < arrDiamonds.length; k++) {
                var b = arrDiamonds[k];
                if (b[0] < 0) {
                    continue;
                }
                var bx = b[0];
                var by = b[1];
                var bw = b[2];
                var bh = b[3];

                var closestX = Math.max(bx, Math.min(cx, bx + bw));
                var closestY = Math.max(by, Math.min(cy, by + bh));
                var dx = cx - closestX;
                var dy = cy - closestY;
                if (dx * dx + dy * dy >= BALL_R * BALL_R) {
                    continue;
                }

                var overlapL = cx + BALL_R - bx;
                var overlapR = bx + bw - (cx - BALL_R);
                var overlapT = cy + BALL_R - by;
                var overlapB = by + bh - (cy - BALL_R);
                var overlaps = [
                    { v: overlapL, horiz: true },
                    { v: overlapR, horiz: true },
                    { v: overlapT, horiz: false },
                    { v: overlapB, horiz: false }
                ];
                var minV = overlaps[0].v;
                var minHoriz = overlaps[0].horiz;
                for (var oi = 1; oi < overlaps.length; oi++) {
                    if (overlaps[oi].v < minV) {
                        minV = overlaps[oi].v;
                        minHoriz = overlaps[oi].horiz;
                    }
                }
                if (minHoriz) {
                    _this.speedBallLeft *= -1;
                } else {
                    _this.speedBall *= -1;
                }

                b[0] = -100;
                b[1] = -100;
                _this.grade++;
                return;
            }
        }

        function physicsStep() {
            if (_this.gameState !== 'playing') {
                return;
            }

            if (_this.startTrigger === 2) {
                _this.imgBasketballTop -= _this.speedBall;
                _this.imgBasketballLeft += (Math.sqrt(3) * _this.speedBallLeft) / 3;
            }

            if (_this.imgBasketballTop <= 0) {
                _this.speedBall *= -1;
            }

            if (_this.imgBasketballLeft <= 0 || _this.imgBasketballLeft >= CV_W - BALL_SIZE) {
                _this.speedBallLeft *= -1;
            }

            var paddleHit =
                ballCx() >= _this.canvasImgCXKLeft - BALL_R &&
                ballCx() <= paddleRight() + BALL_R &&
                ballCy() + BALL_R >= PADDLE_TOP &&
                ballCy() + BALL_R <= PADDLE_TOP + PADDLE_H &&
                _this.speedBall < 0;

            if (paddleHit) {
                _this.speedBall *= -1;
                _this.imgBasketballTop = Math.min(_this.imgBasketballTop, PADDLE_TOP - BALL_SIZE);
            }

            var sideHit =
                (_this.imgBasketballLeft >= _this.canvasImgCXKLeft &&
                    _this.imgBasketballLeft <= paddleRight() &&
                    _this.imgBasketballTop >= PADDLE_TOP &&
                    _this.imgBasketballTop <= PADDLE_TOP + PADDLE_H) ||
                (_this.imgBasketballLeft + BALL_SIZE >= _this.canvasImgCXKLeft &&
                    _this.imgBasketballLeft + BALL_SIZE <= paddleRight() &&
                    _this.imgBasketballTop >= PADDLE_TOP &&
                    _this.imgBasketballTop <= PADDLE_TOP + PADDLE_H);

            if (sideHit && !paddleHit && _this.startTrigger === 2) {
                _this.speedBallLeft *= -1;
            }

            tryBrickCollision();

            if (_this.grade >= winScore) {
                _this.gameState = 'won';
                winDanceImg.src = './images/danceCai/' + _this.imgdanceCaiNum + '.png';
                winBtnImg.src = './images/' + _this.nextbuttonImg + '.png';
            }

            if (_this.imgBasketballTop >= CV_H - BALL_R) {
                _this.gameState = 'lost';
            }
        }

        function drawLost() {
            ctx.clearRect(0, 0, CV_W, CV_H);
            _this.drawJntmBg();
            resetShadow();
            ctx.font = '80px Arial';
            ctx.fillStyle = '#35d7c8';
            ctx.fillText('蔡徐坤，你的球掉了', CV_W / 4, CV_H / 4);
        }

        this.update = function () {
            if (_this.screenMode !== 'playing') {
                return;
            }

            if (_this.gameState === 'lost') {
                drawLost();
                window.requestAnimationFrame(_this.update);
                return;
            }

            if (_this.gameState === 'won') {
                _this.goThough();
                window.requestAnimationFrame(_this.update);
                return;
            }

            physicsStep();

            if (_this.gameState === 'lost') {
                drawLost();
                window.requestAnimationFrame(_this.update);
                return;
            }
            if (_this.gameState === 'won') {
                _this.goThough();
                window.requestAnimationFrame(_this.update);
                return;
            }

            _this.drawJntmBg();
            _this.drawDiamonds();
            _this.drawBasketball();
            _this.drawGrade();
            _this.drawCXK();
            _this.walkImg++;

            window.requestAnimationFrame(_this.update);
        };

        this.tryStartGameFromMenu = function () {
            if (_this.redioBtnStatus === 2 && _this.startbtnupstatus === 2) {
                if (_this.redioBtnTimerClock >= 490) {
                    _this.screenMode = 'playing';
                    syncBallToPaddle();
                    window.requestAnimationFrame(_this.update);
                } else {
                    _this.txtHint = '请等待匹配完成！';
                    _this.startbtnupstatus = 3;
                }
            } else {
                _this.startbtnupstatus = 3;
            }
        };

        cvs.addEventListener('mousemove', function (e) {
            if (_this.screenMode !== 'menu') {
                return;
            }
            var p = canvasXY(e);
            if (p.x >= 610 && p.x <= 893 && p.y >= 550 && p.y <= 629) {
                _this.startButtonImg = 'imgStartGame02';
                _this.startButtonImgTop = 555;
            } else if (!_this.startBtnPressed) {
                _this.startButtonImg = 'imgStartGame';
                _this.startButtonImgTop = 550;
            }
        });

        cvs.addEventListener('mousedown', function (e) {
            var p = canvasXY(e);
            if (_this.screenMode === 'menu') {
                if (p.x >= 610 && p.x <= 893 && p.y >= 550 && p.y <= 629) {
                    _this.startBtnPressed = true;
                    _this.startButtonImg = 'imgStartGame02';
                    _this.startButtonImgTop = 555;
                    if (_this.redioBtnStatus === 2) {
                        _this.startbtnupstatus = 2;
                    }
                    return;
                }
                if (p.x >= 700 && p.x <= 800 && p.y >= 350 && p.y <= 450) {
                    _this.redioBtnImg = 'yellowbtn';
                    _this.redioBtnStatus = 2;
                    _this.heroOnclickStatue = 3;
                    return;
                }
                if (p.x >= 200 && p.x <= 1100 && p.y >= 100 && p.y <= 300) {
                    if (_this.heroOnclickStatue === 1) {
                        _this.heroOnclickStatue = 2;
                    }
                }
                return;
            }

            if (_this.gameState === 'won') {
                if (p.x >= 1000 && p.x <= 1300 && p.y >= 500 && p.y <= 600) {
                    _this.nextbuttonImg = 'nextdown';
                }
            }
        });

        document.addEventListener('mouseup', function () {
            if (_this.screenMode === 'menu' && _this.startBtnPressed) {
                _this.startBtnPressed = false;
                _this.startButtonImg = 'imgStartGame';
                _this.startButtonImgTop = 550;
                _this.tryStartGameFromMenu();
            }
            if (_this.screenMode === 'playing' && _this.gameState === 'won') {
                _this.nextbuttonImg = 'nextup';
            }
        });

        document.addEventListener('keydown', function (ev) {
            if (_this.screenMode !== 'playing' || _this.gameState !== 'playing') {
                return;
            }
            var step = 20;

            if (ev.keyCode === 37 && _this.startBallStatue === 1) {
                _this.canvasImgCXKLeft -= step;
                clampPaddle();
                syncBallToPaddle();
                ev.preventDefault();
            }
            if (ev.keyCode === 39 && _this.startBallStatue === 1) {
                _this.canvasImgCXKLeft += step;
                clampPaddle();
                syncBallToPaddle();
                ev.preventDefault();
            }
            if (ev.keyCode === 32 && _this.startTrigger === 1) {
                _this.startTrigger = 2;
                _this.startBallStatue = 2;
                ev.preventDefault();
            }
            if (ev.keyCode === 37 && _this.startBallStatue === 2) {
                _this.canvasImgCXKLeft -= step;
                clampPaddle();
                ev.preventDefault();
            }
            if (ev.keyCode === 39 && _this.startBallStatue === 2) {
                _this.canvasImgCXKLeft += step;
                clampPaddle();
                ev.preventDefault();
            }
        });

        syncBallToPaddle();
    }

    gGame = new Game();
    window.gGame = gGame;
    gGame.startScreen();
})();
