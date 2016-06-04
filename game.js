// device detection
var isMobile = false;
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

if(isMobile) window.location = "http://www.rafaelteran.com/game1/oops.html";

// A cross-browser requestAnimationFrame
// See https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
          };
})();


document.getElementById("game-wrapper").style.width = "800px";
document.getElementById("game-wrapper").style.height = "auto";


// start - CREATE the canvas
var canvas = document.createElement("canvas");
canvas.id = "game1";
var ctx = canvas.getContext("2d");

//full screen
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
//custome size
canvas.width = 800;
canvas.height = 454;
document.getElementById('game-wrapper').appendChild(canvas);



 // resize the canvas to fill browser window dynamically
 // window.addEventListener('resize', resizeCanvas, false);


var requestId = null;

//music
var paused = false;
var bgAudio = null;
var audioScreenInitAndGameOver = new Audio('mp3/bg-music-intro.mp3');
var audioScreenPlayGame = new Audio('mp3/bg-music-playgame.mp3');
var gameState = 'screenInit';//screenInit, screenPlayGame, screenGameOver

/** Click event -> start **/
var mouseX;
var mouseY;
function clickAction(mouseEvent) {
    mouseX = mouseEvent.pageX - canvas.offsetLeft;
    mouseY = mouseEvent.pageY - canvas.offsetTop;
    switch(gameState){
        case 'screenInit':
            var buttonPlay = {x: ((canvas.width-268)/2), y: ((canvas.height-76)/2), w: 268, h: 76};
            var left = buttonPlay.x, right = buttonPlay.x+buttonPlay.w;
            var top = buttonPlay.y, bottom = buttonPlay.y+buttonPlay.h;
            if (right >= mouseX && left <= mouseX  && bottom >= mouseY && top <= mouseY) screenPlayGame();
            break
        case 'screenGameOver':
            var buttonPlay = {x: ((canvas.width-222)/2), y: 304, w: 222, h: 52};
            var left = buttonPlay.x, right = buttonPlay.x+buttonPlay.w;
            var top = buttonPlay.y, bottom = buttonPlay.y+buttonPlay.h;
            if (right >= mouseX && left <= mouseX  && bottom >= mouseY && top <= mouseY) screenPlayGame();
            break;
        default: //none
    }
}
canvas.addEventListener("click", clickAction);
document.getElementById("sound-control").addEventListener("click", function(e){
		if(paused == true) {paused = false;bgAudio.play();}
		else {paused = true;bgAudio.pause();}
});
/** Click event -> end **/


function screenInit()
{
    gameState = 'screenInit';
    paused = false;
    if(bgAudio){bgAudio.pause();bgAudio.currentTime = 0;}
    bgAudio = audioScreenInitAndGameOver;
    bgAudio.addEventListener('ended', function() {this.currentTime = 0; this.play();}, false);
    bgAudio.play();
    //background
    terrainPattern = ctx.createPattern(resources.get('images/background-pattern.jpg'), 'repeat-x');
    ctx.fillStyle = terrainPattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //cowboy
    ctx.drawImage(resources.get('images/cowboy-left-sprite.png'),30,0,30,58,(canvas.width/2),(canvas.height-100),30,58);

    //Monsters going left
    ctx.drawImage(resources.get('images/monster1-left-sprite.png'),0,0,58,104,(canvas.width-130),(canvas.height-140),58,104);
    ctx.drawImage(resources.get('images/zombie1-left-sprite.png'),84,0,28,56,(canvas.width-28),(canvas.height-100),28,56);
    ctx.drawImage(resources.get('images/zombie1-left-sprite.png'),84,0,28,56,(canvas.width-50),(canvas.height-100),28,56);
    ctx.drawImage(resources.get('images/zombie1-left-sprite.png'),84,0,28,56,(canvas.width-80),(canvas.height-100),28,56);
    ctx.drawImage(resources.get('images/zombie1-left-sprite.png'),84,0,28,56,(canvas.width-95),(canvas.height-100),28,56);
    ctx.drawImage(resources.get('images/zombie1-left-sprite.png'),84,0,28,56,(canvas.width-130),(canvas.height-100),28,56);
    ctx.drawImage(resources.get('images/zombie1-left-sprite.png'),84,0,28,56,(canvas.width-160),(canvas.height-100),28,56);
    ctx.drawImage(resources.get('images/zombie1-left-sprite.png'),84,0,28,56,(canvas.width-190),(canvas.height-100),28,56);
    ctx.drawImage(resources.get('images/zombie1-left-sprite.png'),84,0,28,56,(canvas.width-220),(canvas.height-100),28,56);
    ctx.drawImage(resources.get('images/zombie1-left-sprite.png'),84,0,28,56,(canvas.width-260),(canvas.height-100),28,56);
    ctx.drawImage(resources.get('images/zombie1-left-sprite.png'),84,0,28,56,(canvas.width-290),(canvas.height-100),28,56);

    //Monsters going right
    ctx.drawImage(resources.get('images/monster2-right-sprite.png'),140,0,140,103,(50),(canvas.height-145),140,103);
    ctx.drawImage(resources.get('images/zombie1-right-sprite.png'),84,0,28,56,(10),(canvas.height-100),28,56);
    ctx.drawImage(resources.get('images/zombie1-right-sprite.png'),84,0,28,56,(50),(canvas.height-100),28,56);
    ctx.drawImage(resources.get('images/zombie1-right-sprite.png'),84,0,28,56,(80),(canvas.height-100),28,56);
    ctx.drawImage(resources.get('images/zombie1-right-sprite.png'),84,0,28,56,(130),(canvas.height-100),28,56);
    ctx.drawImage(resources.get('images/zombie1-right-sprite.png'),84,0,28,56,(160),(canvas.height-100),28,56);
    ctx.drawImage(resources.get('images/zombie1-right-sprite.png'),84,0,28,56,(190),(canvas.height-100),28,56);
    ctx.drawImage(resources.get('images/zombie1-right-sprite.png'),84,0,28,56,(220),(canvas.height-100),28,56);
    ctx.drawImage(resources.get('images/zombie1-right-sprite.png'),84,0,28,56,(260),(canvas.height-100),28,56);
    ctx.drawImage(resources.get('images/zombie1-right-sprite.png'),84,0,28,56,(290),(canvas.height-100),28,56);

    //live
    ctx.fillStyle = "#333333";
    roundRect(ctx, 10, 10, 200, 20, 10, true);
    ctx.fillStyle = "#c30000";
    roundRect(ctx, 10, 10, 50, 20, 10, true);

    //rectangle
    ctx.globalAlpha=0.5;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    //button
    ctx.globalAlpha=1;
    ctx.fillStyle = "#000000";
    ctx.fillRect(((canvas.width-268)/2),((canvas.height-76)/2),268,76);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth   = 2;
    ctx.strokeRect(((canvas.width-268)/2),((canvas.height-76)/2),268,76);
    ctx.font = '30pt Calibri';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('PLAY NOW', (canvas.width/2), (canvas.height/2)+14);

    //This first screen is not completed
    //the idea was that some bullet mark randomly appeared & disappear
}


function screenPlayGame()
{
    gameState = 'screenPlayGame'
    paused = false;
    if(bgAudio){bgAudio.pause();bgAudio.currentTime = 0;}
    bgAudio = audioScreenPlayGame;
	bgAudio.addEventListener('ended', function() {this.currentTime = 0; this.play();}, false);
	bgAudio.play();
	//load pattern
    terrainPattern = ctx.createPattern(resources.get('images/background-pattern.jpg'), 'repeat-x');
    //Reset game values
    reset();
    lastTime = Date.now();
    gameStartTime = Date.now();
    //Start Game Loop
    main();
}


function screenGameOver()
{
    gameState = 'screenGameOver';
    paused = false;
    if(bgAudio){bgAudio.pause();bgAudio.currentTime = 0;}
    bgAudio = audioScreenInitAndGameOver;
    bgAudio.addEventListener('ended', function() {this.currentTime = 0; this.play();}, false);
    bgAudio.play();

    ctx.save();

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //game over
    ctx.drawImage(resources.get('images/gameover.png'),0,0,565,59,((canvas.width-565)/2),115,565,59);
    //NOT BAD 8 ENEMIES IN 11 SECONDS
    ctx.font = '18pt Calibri';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('NOT BAD '+enemiesKilled+' ENEMIES IN '+Math.round(((gameEndTime - gameStartTime) / 1000))+' SECONDS', (canvas.width/2), 250);
    //play again
    ctx.drawImage(resources.get('images/playagain.png'),0,0,222,52,((canvas.width-222)/2),304,222,52);
}

/** LOAD ALL IMG **/
resources.load([
    'images/background-pattern.jpg',
    'images/cowboy.png',
    'images/cowboy-left-sprite.png',
    'images/cowboy-right-sprite.png',
    'images/bullet-right-sprite.png',
    'images/bullet-left-sprite.png',
    'images/monster1-right-sprite.png',
    'images/monster1-left-sprite.png',
    'images/zombie1-right-sprite.png',
    'images/zombie1-left-sprite.png',
    'images/monster2-right-sprite.png',
    'images/monster2-left-sprite.png',
    'images/gameover.png',
    'images/playagain.png'
]);
resources.onReady(screenInit);
/** LOAD ALL IMG **/


/** THE MAIN GAME LOOP -> CORE **/
var lastTime;
var main = function ()
{
    if(gameState == 'screenPlayGame'){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        var now = Date.now();
        var delta = ((now - lastTime) / 1000.0);
        update(delta);
        render(delta);
        lastTime = now;
        requestAnimFrame(main);
    }else {
        screenGameOver();
    }
};


// Game objects && Game state
var hero = {
    type: 'hero',
	speed: 150, // movement in pixels per second
    live: 200, // 100% percentage
	x: 0,
	y: 0,
	pos: [canvas.width/2,canvas.height-100],
    direction: 1, //1 = right / 2 = left
    spriteRight: new Sprite('images/cowboy-right-sprite.png',[00, 00], [30, 58],10,[0,1,2,3]),
    spriteLeft: new Sprite('images/cowboy-left-sprite.png',[00, 00], [30, 58],10,[0,1,2,3]),
};


var bullets = [];
var enemies = [];

var lastFire = Date.now();
var gameStartTime;
var gameEndTime;
var gameTime;
var isGameOver;
var terrainPattern;

// The score
var enemiesKilled = 0;

// Speed in pixels per second
var bulletSpeed = 500;

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

//Updating the Scene 
function update(dt)
{
    gameTime += dt;

    handleInput(dt);
    updateEntities(dt);

    // It gets harder over time by adding enemies using this
    // equation: 1-.993^gameTime
    var ran = Math.random(),
    	pow = 1 - Math.pow(.993, gameTime);

    //console.log('timeeee', (((Date.now() - lastTime) / 1000.0) > 0.02));
   if((((Date.now() - lastTime) / 1000.0) > 0.02) && ran < pow) {

       var randomLeftOrWrite = getRandomArbitrary(1,2);
       var monsterType = getRandomArbitrary(1,3);
       switch(monsterType) {
           case 1:
               enemies.push({ type: 'monster1',
                   speed: 100,
                   lives: 1,
                   attack: 10,
                   direction: (randomLeftOrWrite == 1)? 1 : 2, //1 = right / 2 = left,
                   pos: [(randomLeftOrWrite == 1)? 0 : canvas.width,(canvas.height-100)],
                   spriteRight: new Sprite('images/zombie1-right-sprite.png',[00, 00], [28, 56],10,[0,1,2,3]),
                   spriteLeft: new Sprite('images/zombie1-left-sprite.png',[00, 00], [28, 56],10,[0,1,2,3])
               });
               break;
           case 2:
               enemies.push({ type: 'monster2',
                   speed: 60,
                   lives: 2,
                   attack: 20,
                   direction: (randomLeftOrWrite == 1)? 1 : 2, //1 = right / 2 = left,
                   pos: [(randomLeftOrWrite == 1)? 0 : canvas.width, (canvas.height-140)],
                   spriteRight: new Sprite('images/monster1-right-sprite.png',[00, 00], [58,104],5,[0,1,2,3]),
                   spriteLeft: new Sprite('images/monster1-left-sprite.png',[00, 00], [58,104],5,[0,1,2,3])
               });
               break;
           case 3:
               enemies.push({ type: 'monster3',
                   speed: 40,
                   lives: 3,
                   attack: 30,
                   direction: (randomLeftOrWrite == 1)? 1 : 2, //1 = right / 2 = left,
                   pos: [(randomLeftOrWrite == 1)? 0 : canvas.width,(canvas.height-145)],
                   spriteRight: new Sprite('images/monster2-right-sprite.png',[00, 00], [140,103],5,[0,1,2,3]),
                   spriteLeft: new Sprite('images/monster2-left-sprite.png',[00, 00], [140,103],5,[0,1,2,3])
               });
               break;
       }



    }

    checkCollisions();

};


function handleInput(dt)
{
    if(input.isDown('LEFT') || input.isDown('a')) {
        hero.pos[0] -= hero.speed * dt;
        hero.spriteLeft.update(dt);
        hero.direction = 2;
    }

    if(input.isDown('RIGHT') || input.isDown('d')) {
        hero.pos[0] += hero.speed * dt;
        hero.spriteRight.update(dt);
        hero.direction = 1;
    }

    if(input.isDown('SPACE') &&  !isGameOver &&  Date.now() - lastFire > 100) {
            //var x = hero.pos[0] + ((hero.direction == 1)? hero.spriteRight.size[0] : hero.spriteLeft.size[0] / 2);
            //var y = hero.pos[1] + ((hero.direction == 1)? hero.spriteRight.size[1] : hero.spriteLeft.size[1] / 2);
        var audioShoot = new Audio('mp3/shoot.mp3');
        audioShoot.play();
        var x = hero.pos[0] + 19;
        var y = hero.pos[1] + 18;
        if(hero.direction != 1){
            x = hero.pos[0] + 0;
            y = hero.pos[1] + 18;
        }

            bullets.push({ pos: [x, y],
                           type: 'bullet',
                           power: 50,
                           direction: hero.direction,
                           spriteRight: new Sprite('images/bullet-right-sprite.png', [00, 00], [10, 4]) ,
                           spriteLeft: new Sprite('images/bullet-left-sprite.png', [00, 00], [10, 4])});


            lastFire = Date.now();
    }

}


function updateEntities(dt)
{
    // Update all the bullets
    for (var i = 0; i < bullets.length; i++) {
        var bullet = bullets[i];
        if (bullet.direction == 1) bullet.pos[0] += bulletSpeed * dt;
        else bullet.pos[0] -= bulletSpeed * dt;
        // Remove the bullet if it goes offscreen
        if (bullet.pos[1] < 0 || bullet.pos[1] > canvas.height ||
            bullet.pos[0] > canvas.width) {
            bullets.splice(i, 1);
            i--;
        }
    }

    // Update all the enemies
    for(var i=0; i<enemies.length; i++) {
        //check if enemy collided with lucky luke
        if(!boxCollides(enemies[i].pos, enemies[i].spriteRight.size, hero.pos, hero.spriteRight.size)){
             //check where is lucky luke
            var dy = hero.pos[1] - enemies[i].pos[1];
            var dx = hero.pos[0] - enemies[i].pos[0];
            var degree = Math.atan2(dy,dx) * 180 / Math.PI;
            //console.log('monsterType',enemies[i].type);
            //console.log('degree',degree);
            //console.log('enemies[i].direction', enemies[i].direction);

            //this part of the game requires some fundamental geometrical concepts that I do not possess
            //so this is a hack
            //this is in case I wanna make lucky luke jump than the enemy will follow him around
            if((degree == 180 || degree > 90) && enemies[i].direction == 1){ enemies[i].direction = 2;}
            else if((degree == 0 || degree < 90) && enemies[i].direction == 2){ enemies[i].direction = 1;}

            var enemySpeed = enemies[i].speed;
            if(enemies[i].direction == 1) enemies[i].pos[0] += enemySpeed * dt;
            else enemies[i].pos[0] -= enemySpeed * dt;

            var sprite = enemies[i].spriteRight;
            if(enemies[i].direction == 1) enemies[i].spriteRight.update(dt);
            else enemies[i].spriteLeft.update(dt);

            // Remove if offscreen
            if(enemies[i].pos[0] + sprite.size[0] < 0) {
                enemies.splice(i, 1);
                i--;
            }
        }


    }

   
}


// Draw everything
function render(delta)
{
	ctx.fillStyle = terrainPattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    renderPlayerInfo(delta);
    renderEntity(hero);
    renderEntities(bullets);
    renderEntities(enemies);
}


function renderPlayerInfo(dt)
{
    //draw cowboy live bar
    ctx.strokeStyle = "#000";
    ctx.fillStyle = "#333333";
    roundRect(ctx, 10, 10, 200, 20, 10, true);
    ctx.fillStyle = "#c30000";
    roundRect(ctx, 10, 10, hero.live, 20, 10, true);

    //draw timer
    var countTimeSeconds = Math.round(((Date.now() - gameStartTime) / 1000));
    ctx.font = '30pt Calibri';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#c30000';
    ctx.fillText(countTimeSeconds, (canvas.width/2), 30);
}

function renderEntities(list)
{
    for(var i=0; i<list.length; i++) {
        renderEntity(list[i]);
    }    
}

function renderEntity(entity) {

    switch(entity.type)
    {
        case 'hero':
            checkHeroBounds();
            break;
        default:
            //monster
            break;
    }

    ctx.save();
    ctx.translate(entity.pos[0], entity.pos[1]);

    if(entity.direction == 1) entity.spriteRight.render(ctx);
    else entity.spriteLeft.render(ctx);

    ctx.restore();
}



// Reset game to original state
function reset()
{
    isGameOver = false;
    gameStartTime;
    gameEndTime;
    gameTime = 0;
    enemiesKilled = 0;

    hero.live = 200;
    hero.x = 0;
   	hero.y = 0;
    hero.pos = [canvas.width/2,canvas.height-100];
    hero.direction = 1; //1 = right / 2 = left

    enemies = [];
    bullets = [];

}



// Collisions
function collides(x, y, r, b, x2, y2, r2, b2)
{
    return !(r <= x2 || x > r2 ||
             b <= y2 || y > b2);
}
function boxCollides(pos, size, pos2, size2)
{
    return collides(pos[0], pos[1],
                    pos[0] + size[0], pos[1] + size[1],
                    pos2[0], pos2[1],
                    pos2[0] + size2[0], pos2[1] + size2[1]);
}
function checkCollisions()
{
    checkHeroBounds();

    // Run collision detection for all enemies and bullets
    for(var i=0; i<enemies.length; i++) {
        var pos = enemies[i].pos;
        var size = enemies[i].spriteRight.size;

        for(var j=0; j<bullets.length; j++) {
            var pos2 = bullets[j].pos;
            var size2 = bullets[j].spriteRight.size;

            if(boxCollides(pos, size, pos2, size2)) {
                //remove lives of enemy
                enemies[i].lives--;
                if(enemies[i].lives == 0) {
                    // Remove the enemy
                    enemies.splice(i, 1);
                    i--;
                    // Add score
                    enemiesKilled++;
                }
                // Remove the bullet and stop this iteration
                bullets.splice(j, 1);
                break;
            }
        }

        if(boxCollides(pos, size, hero.pos, hero.spriteRight.size)) {
            if(hero.live > 0 && enemies[i] != undefined) hero.live -= enemies[i].attack;
            //update live element
            if(hero.live <= 0){
                gameEndTime = Date.now();
                console.log('screenGameOver');
                if (requestId) window.cancelAnimationFrame(requestId);
                //screenGameOver();
                gameState = 'screenGameOver';
            }

        }
    }
}



function checkHeroBounds()
{
    // Check bounds
    if(hero.pos[0] < 0) {
        hero.pos[0] = 0;
    }
    else if(hero.pos[0] > canvas.width - hero.spriteRight.size[0]) {
        hero.pos[0] = canvas.width - hero.spriteRight.size[0];
    }

    if(hero.pos[1] < 0) {
        hero.pos[1] = 0;
    }
    else if(hero.pos[1] > canvas.height - hero.spriteRight.size[1]) {
        hero.pos[1] = canvas.height - hero.spriteRight.size[1];
    }
}







