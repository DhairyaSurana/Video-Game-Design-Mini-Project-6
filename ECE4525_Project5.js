var sketchProc=function(processingInstance){ with (processingInstance){
    size(400, 400); 
    frameRate(60);

    var FIRE_1 = loadImage("images/Fogo_1.png");
    var FIRE_2 = loadImage("images/Fogo_2.png");
    var FIRE_3 = loadImage("images/Fogo_3.png");
    var FIRE_4 = loadImage("images/Fogo_4.png");

    var FIREBALL = loadImage("images/fireball.png");

    var TARGET = new PVector(0, 0);

    angleMode = "radians";

    var haltState = function() {
        this.angle = 0;
    };

    haltState.prototype.update = function(me) {
        if (dist(me.position.x, me.position.y, TARGET.x, TARGET.y) > 5) {
            me.currState = 1;
        }
    };
    
    var turnState = function() {
        this.angle = 0;
        this.angleDir = 0;
        this.vec = new PVector(0,0);
    };

    turnState.prototype.update = function(me) {

        this.vec.set(TARGET.x - me.position.x, TARGET.y - me.position.y);
        this.angle = this.vec.heading();
        var angleDiff = abs(this.angle - me.angle);

        if (angleDiff > 2) {
            if (this.angle > me.angle) {
                this.angleDir = 1;
            }
            else {
                this.angleDir = -1;
            }
            if (angleDiff > 180) {
                this.angleDir = -this.angleDir;
            }
            
            me.angle += this.angleDir;
            if (me.angle > 180) {
                me.angle = -179;
            }
            else if (me.angle < -180) {
                me.angle = 179;
            }
        }
    };
    

    var playerObj = function(x, y) {

        this.position = new PVector(x, y);
        this.state = [new haltState(), new turnState()];
        this.currState = 0;
        this.angle = 0;

    };

    playerObj.prototype.draw = function() {

        pushMatrix();
        translate(this.position.x, this.position.y);
        rotate(this.angle);

        fill(200, 180, 140);
        rect(-10, -10, 20, 20);
        rect(0, -2, 20, 4);     
        
        popMatrix();
        
    };

    
    //======================================================================================
    // Skulls

    var skullObj = function(x, y) {

        this.x = x;
        this.y = y;

        this.lives = 3;
        this.dead = false;

        this.type = "skull";
    };

    

    skullObj.prototype.draw = function() {

        fill(255, 255, 255);
        ellipse(this.x, this.y, 15, 15);
        
        noStroke();
        rect(this.x - 5, this.y + 5, 10, 5); // Jaw

        fill(0, 0, 0);
        ellipse(this.x - 3, this.y + 1, 4, 4);
        ellipse(this.x + 3, this.y + 1, 4, 4);
    };

    //======================================================================================
    // Fireballs

    var fireballObj = function(x, y, target_x, target_y) {

        this.x = x;
        this.y = y;

        this.target_x = target_x;
        this.target_y = target_y;
    
    };

    fireballObj.prototype.draw = function() {

        image(FIREBALL, this.x, this.y, 20, 20);
    };


    var fireObj = function(x, y) {

        this.x = x;
        this.y = y;

        this.type = "fire";
        this.state = floor(random(0, 3));
    };
    
    fireObj.prototype.draw = function() {

        switch(this.state) {

            case 0: image(FIRE_1, this.x, this.y, 20, 20);

            break; 

            case 1: image(FIRE_2, this.x, this.y, 20, 20);

            break; 

            case 2: image(FIRE_3, this.x, this.y, 20, 20);
            
            break;

            case 3: image(FIRE_4, this.x, this.y, 20, 20);

            break;
        }
        
        if(frameCount % 8 === 0) {

            if(this.state === 3) {
                this.state = 0;
            }
            else {
                this.state++;
            }
        }


    };

    var gameObj = function() {

        this.player = new playerObj(200, 375);

        this.game_won = false;
        this.game_over = false;

        this.score = 0;

        this.tilemap_objects = [];

        this.tilemap = [

                        "ffffffffffffffffffff",
                        "                    ",
                        "                    ",
                        "  s                 ",
                        "                    ",
                        "                    ",
                        "                    ",
                        "   s                ",
                        "                    ",
                        "                    ",
                        "                    ",
                        "                    ",
                        "                    ",
                        "     s              ",
                        "                    ",
                        "                    ",
                        "                    ",
                        "                    ",
                        "                    ",
                        "fffffffff  fffffffff",

        ];
        
        
        
    };

    var SKULLS = [];

    gameObj.prototype.initialize = function() {

        for (var i = 0; i< this.tilemap.length; i++) {
            
            for (var j = 0; j < this.tilemap[i].length; j++) {
                
                switch (this.tilemap[i][j]) {
                    
                    case 'f': 
                            this.tilemap_objects.push(new fireObj(j*20, i*20));
                    break;

                    case 's': 
                            SKULLS.push(new skullObj(j*20, i*20));
                    break;

                }
            }
        }

    };

    gameObj.prototype.drawBackground = function() {

        background(0, 0, 0);

        for (var i = 0; i < this.tilemap_objects.length; i++) {

            if(this.tilemap_objects[i].type === "skull") {
                this.tilemap_objects[i].update();
            }

            this.tilemap_objects[i].draw();
        }
    };

    gameObj.prototype.reset = function() {

        this.game_won = false;
        this.game_over = false;
        this.score = 0;

        this.tilemap_objects.length = 0;
        FIREBALLS.length = 0;
        SKULLS.length = 0;

        this.player.position.x = 200;
        this.player.position.y = 375;
        this.player.angle = 0;
        this.player.currState = 0;

        for (var i = 0; i< this.tilemap.length; i++) {
            
            for (var j = 0; j < this.tilemap[i].length; j++) {
                
                switch (this.tilemap[i][j]) {

                    case 'f':
                        
                        this.tilemap_objects.push(new fireObj(j*20, i*20));
                    break;

                    case 's': 
                        SKULLS.push(new skullObj(j*20, i*20));
                    break;

                }
            }
        }

    
    };



    var GAME = new gameObj();

    fireballObj.prototype.update = function() {


        if(this.x > this.target_x) {
           this.x--;
        }

        if(this.x < this.target_x) {
           this.x++;
        }

        
        this.y--;

        for(var i = 0; i < GAME.tilemap_objects.length; i++) {

            if(dist(this.x, this.y, GAME.tilemap_objects[i].x, GAME.tilemap_objects[i].y) < 20) {
                if(GAME.tilemap_objects[i].type === "fire") {
                   this.x = -100;
                }
            }
        }

        for(var i = 0; i < SKULLS.length; i++) {

            if(dist(this.x, this.y, SKULLS[i].x, SKULLS[i].y) < 20) {
               
                SKULLS[i].lives--; 
                this.y++;
            }
        }
        
        
    };
   
    var mouseMoved = function() {

        if(CURRENT_STATE === "game") {
            TARGET.x = mouseX;
            TARGET.y = mouseY;

            if (GAME.player.currState !== 1) {
                GAME.player.currState = 1;
            }
        }

    };

    
    var CURRENT_STATE = "menu";
    var PAUSE_STATE = "play";
    mouseClicked = function() {

        if(CURRENT_STATE === "menu") {

            if(mouseX >= 180 && mouseX <= 250 &&
               mouseY >= 330 && mouseY <= 350) {

                CURRENT_STATE = "game";
                GAME.reset();
            }
        }

        if((CURRENT_STATE === "game" && PAUSE_STATE === "pause") || GAME.game_over || GAME.game_won) {

            if(mouseX >= 120 && mouseX <= 250 &&
               mouseY >= 230 && mouseY <= 250) {

                CURRENT_STATE = "menu";
                PAUSE_STATE = "play";
                loop();    
            }
        }
    };
    
    var FIREBALLS = [];
    keyPressed = function() {

        if(key.toString() === "p" && CURRENT_STATE === "game") {

            if(PAUSE_STATE === "pause") {
                PAUSE_STATE = "play";
                loop();
            }
            else {
                PAUSE_STATE = "pause";

                fill(255, 255, 255);
                textSize(20);
                text("RETURN", 150, 250);

                noLoop();
            }
        }

        if(key.toString() === "f" && CURRENT_STATE === "game" && PAUSE_STATE === "play") {
            FIREBALLS.push(new fireballObj(GAME.player.position.x, GAME.player.position.y, mouseX, mouseY));
        }

    };

    // Menu
    var display_menu = function() {

        background(68, 197, 83);

        fill(0, 0, 0);

        textSize(30);
        text("HELL TANK", 100, 100);

        textSize(20);
        text("Instructions:", 115, 150);

        textSize(15);
        text("- Goal: Destroy the demons before the escape!", 50, 170);
        text("- Click the mouse to fire!", 50, 190);
        text("- Press up arrow key to jump", 50, 210);
        text("- Press p to pause the game", 50, 250);

        textSize(25);
        text("START", 175, 350);
    };

    var DEATH_COUNT = 0;
    skullObj.prototype.update = function() {
        
        this.x+=0.5;

        if(dist(this.x, 0, 400, 0) < 20) {  // Skull reaches right edge
            GAME.game_over = true;
        }

        if(this.lives === 0) {
            this.x = -100;
            DEATH_COUNT++;
        }

    };

    GAME.initialize();

    // Main game goes here
    var run_game = function() {

        if(!GAME.game_won && !GAME.game_over) {

            background(0, 0, 0);

            GAME.drawBackground();
           
            GAME.player.draw();
            GAME.player.state[GAME.player.currState].update(GAME.player);
            

            for(var i = 0; i < FIREBALLS.length; i++) {

                FIREBALLS[i].update();
                FIREBALLS[i].draw();
            }

            for(var i = 0; i < SKULLS.length; i++) {

                SKULLS[i].update();
                SKULLS[i].draw();

                if(DEATH_COUNT === SKULLS.length) {
                    GAME.game_won = true;
                }
            }
        }

        else {

            if(GAME.game_over) {

                noLoop();
                fill(255, 0, 0);
                textSize(50);
                text("GAME OVER", 50, 200);
            }

            else {

                noLoop();
                fill(0, 255, 0);
                textSize(50);
                text("GAME WON", 50, 200);

            }

            fill(255, 255, 255);
            textSize(20);
            text("RETURN", 150, 250);
        }
    };

    var draw = function() {

        switch(CURRENT_STATE) {
  
            case "menu":
  
                display_menu();
  
            break;
  
            case "game":
  
                run_game();
  
            break;
        }
  
    };  

}};

