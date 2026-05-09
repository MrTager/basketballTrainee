var cvs = document.getElementById('cvs');
var ctx = cvs.getContext('2d');
var gGame = null;

function Game() {
    var _this = this;

    var PADDLE_W = 100;
    var PADDLE_H = 100;
    var PADDLE_TOP = 550;
    var BALL_SIZE = 20;
    var BALL_R = BALL_SIZE / 2;
    var CXK_FRAME_W = 123.75;
    var CXK_SHEET_MAX_LEFT = 1732.5;

    this.canvasImgCXKLeft = 0;
    this.canvasImgCXKTop = PADDLE_TOP;
    this.imgCXKLeft = CXK_FRAME_W;
    this.imgCXKTop = 0;

    this.imgBasketballLeft = 20;
    this.imgBasketballTop = 510;

    this.startTrigger = 1;
    this.startBallStatue = 1;

    this.speedBall = 3;
    this.speedBallLeft = 3;

    this.diamondeWidth = 50;
    this.diamondeHeight = 30;

    this.grade = 0;
    this.imgdanceCaiNum = 1;
    this.nextbuttonImg = 'nextup';

    /** @type {'playing'|'lost'|'won'} */
    this.gameState = 'playing';

    var arr01 = [100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350];
    var arr02 = [100, 130, 160, 190, 220];
    var arrDiamonds = [];
    var winScore = arr01.length * arr02.length;

    var imgBG = new Image();
    imgBG.src = './images/jntmBG.png';
    var imgCXK = new Image();
    imgCXK.src = './images/playball.png';
    var imgBasketball = new Image();
    imgBasketball.src = './images/basketball.png';

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
        var maxLeft = cvs.width - PADDLE_W;
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

    this.drawJntmBg = function () {
        if (imgBG.complete) {
            ctx.drawImage(imgBG, 0, 0, 480, 264, 0, 0, cvs.width, cvs.height);
        }
    };

    this.drawCXK = function () {
        if (!imgCXK.complete) {
            return;
        }
        var drawW = (100 / 249) * CXK_FRAME_W;
        ctx.drawImage(
            imgCXK,
            _this.imgCXKLeft,
            _this.imgCXKTop,
            CXK_FRAME_W,
            249,
            _this.canvasImgCXKLeft,
            _this.canvasImgCXKTop,
            drawW,
            PADDLE_H
        );
    };

    this.drawBasketball = function () {
        if (!imgBasketball.complete) {
            return;
        }
        ctx.drawImage(imgBasketball, 0, 0, 450, 449, _this.imgBasketballLeft, _this.imgBasketballTop, BALL_SIZE, BALL_SIZE);
    };

    this.drawGrade = function () {
        ctx.font = '20px Arial';
        ctx.fillStyle = '#44c700';
        ctx.textBaseline = 'top';
        ctx.fillText('得分：', cvs.width / 2 - 10, 10);
        ctx.fillText(String(_this.grade), cvs.width / 2 - 10 + 70, 10);
    };

    this.drawDiamondsArr = function () {
        for (var i = 0; i < arr01.length; i++) {
            for (var j = 0; j < arr02.length; j++) {
                arrDiamonds.push([arr01[i], arr02[j], _this.diamondeWidth, _this.diamondeHeight]);
            }
        }
    };
    this.drawDiamondsArr();

    this.drawDiamonds = function () {
        ctx.strokeStyle = '#2196f3';
        ctx.fillStyle = '#35d7c8';
        for (var u = 0; u < arrDiamonds.length; u++) {
            if (arrDiamonds[u][0] < 0) {
                continue;
            }
            ctx.fillRect(arrDiamonds[u][0], arrDiamonds[u][1], arrDiamonds[u][2], arrDiamonds[u][3]);
            ctx.strokeRect(arrDiamonds[u][0], arrDiamonds[u][1], arrDiamonds[u][2], arrDiamonds[u][3]);
        }
    };

    var winDanceImg = new Image();
    var winBtnImg = new Image();

    this.imgRefreshRate = function () {
        setInterval(function () {
            if (_this.gameState === 'won') {
                _this.imgdanceCaiNum++;
                if (_this.imgdanceCaiNum > 199) {
                    _this.imgdanceCaiNum = 1;
                }
                winDanceImg.src = './images/danceCai/' + _this.imgdanceCaiNum + '.png';
            }
        }, 100);
    };
    this.imgRefreshRate();

    this.goThough = function () {
        if (_this.gameState !== 'won') {
            return;
        }
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        _this.drawJntmBg();
        winBtnImg.src = './images/' + _this.nextbuttonImg + '.png';
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

        if (_this.imgBasketballLeft <= 0 || _this.imgBasketballLeft >= cvs.width - BALL_SIZE) {
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
            ((_this.imgBasketballLeft >= _this.canvasImgCXKLeft &&
                _this.imgBasketballLeft <= paddleRight() &&
                _this.imgBasketballTop >= PADDLE_TOP &&
                _this.imgBasketballTop <= PADDLE_TOP + PADDLE_H) ||
                (_this.imgBasketballLeft + BALL_SIZE >= _this.canvasImgCXKLeft &&
                    _this.imgBasketballLeft + BALL_SIZE <= paddleRight() &&
                    _this.imgBasketballTop >= PADDLE_TOP &&
                    _this.imgBasketballTop <= PADDLE_TOP + PADDLE_H));

        if (sideHit && !paddleHit && _this.startTrigger === 2) {
            _this.speedBallLeft *= -1;
        }

        tryBrickCollision();

        if (_this.grade >= winScore) {
            _this.gameState = 'won';
            winDanceImg.src = './images/danceCai/' + _this.imgdanceCaiNum + '.png';
            winBtnImg.src = './images/' + _this.nextbuttonImg + '.png';
        }

        if (_this.imgBasketballTop >= cvs.height - BALL_R) {
            _this.gameState = 'lost';
        }
    }

    function drawLost() {
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        _this.drawJntmBg();
        ctx.font = '80px Arial';
        ctx.fillStyle = '#35d7c8';
        ctx.fillText('蔡徐坤，你的球掉了', cvs.width / 4, cvs.height / 4);
    }

    this.update = function () {
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

        if (_this.imgCXKLeft > CXK_SHEET_MAX_LEFT) {
            _this.imgCXKLeft = CXK_FRAME_W;
        }
        _this.drawCXK();
        _this.imgCXKLeft += CXK_FRAME_W;

        window.requestAnimationFrame(_this.update);
    };

    document.addEventListener('keydown', function onKey(ev) {
        if (_this.gameState !== 'playing') {
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
        if (ev.keyCode === 32 && _this.startTrigger === 1) {
            _this.startTrigger = 2;
            _this.startBallStatue = 2;
            ev.preventDefault();
        }
    });

    document.addEventListener('mousedown', function (eve) {
        if (_this.gameState !== 'won') {
            return;
        }
        var nextbtnLeft = eve.pageX - cvs.offsetLeft;
        var nextbtnTop = eve.pageY - cvs.offsetTop;
        if (nextbtnLeft >= 1000 && nextbtnLeft <= 1300 && nextbtnTop >= 500 && nextbtnTop <= 600) {
            _this.nextbuttonImg = 'nextdown';
        }
    });

    document.addEventListener('mouseup', function () {
        if (_this.gameState === 'won') {
            _this.nextbuttonImg = 'nextup';
        }
    });

    syncBallToPaddle();
}

gGame = new Game();
gGame.update();
