var sketchProc=function(processingInstance){ with (processingInstance){
    size(400, 400); 
    frameRate(60);

    // subdivision - split + average
    // beginShape + endShape to enclose the entire shape
    // EXPERIMENT with coloring and number of iterations

    angleMode = "radians"

    var snake_points = [];
    var p2 = [];
    var numPoints = 0;

    var tail = function(x, y) {
        this.x = x; 
        this.y = y;
    };

     //x1 = 62
     var x1 = 62;
     var y1 = 120;
     var cx1 = 262;
     var cy1 = 138;
     var cx2 = 92;
     var cy2 = 287;
     var x2 = 206;
     var y2 = 220;
     
     var cx1Dir = 1;
     var cx2Dir = -1;
     var x2Dir = -40;

   

    
    var anti_gravity_snake = function(x, y) {

        this.x = x;
        this.y = y;

        this.direction = 0 // initially set to left

        this.points = [

            // this.x = 118
            // this.y = 62
            new PVector(58, 23),
            new PVector(89, 47),
            new PVector(115, 94),
            new PVector(117, 133),
            new PVector(50, 173),
            new PVector(55, 193),
            new PVector(138, 125),
            new PVector(133,64),
            new PVector(86, 22),
            new PVector(65, -19),
            new PVector(20, -20),
            new PVector(0, 0),
            new PVector(2, 32),
            new PVector(16, 40),
            new PVector(25, 25),
            new PVector(34, 6),
            new PVector(57, 21),
        ];

    };

    var SNAKE = new anti_gravity_snake(118, 82);
    var TAIL = new tail(0, 0);

    tail.prototype.draw = function() {

        noFill();
        stroke(0, 0, 0);
        bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2);
        bezier(x1, y1 + 2, cx1, cy1, cx2, cy2, x2, y2);
        bezier(x1, y1 + 4, cx1, cy1, cx2, cy2, x2, y2);
        bezier(x1, y1 + 6, cx1, cy1, cx2, cy2, x2, y2);
        bezier(x1, y1 + 8, cx1, cy1, cx2, cy2, x2, y2);
        bezier(x1, y1 + 10, cx1, cy1, cx2, cy2, x2, y2);
        bezier(x1, y1 + 12, cx1, cy1, cx2, cy2, x2, y2);
        bezier(x1, y1 + 14, cx1, cy1, cx2, cy2, x2, y2);
        bezier(x1, y1 + 16, cx1, cy1, cx2, cy2, x2, y2);
        bezier(x1, y1 + 18, cx1, cy1, cx2, cy2, x2, y2);
        bezier(x1, y1 + 20, cx1, cy1, cx2, cy2, x2, y2);
        bezier(x1, y1 + 22, cx1, cy1, cx2, cy2, x2, y2);
        bezier(x1, y1 + 24, cx1, cy1, cx2, cy2, x2, y2);
        bezier(x1, y1 + 26, cx1, cy1, cx2, cy2, x2, y2);
        bezier(x1, y1 + 28, cx1, cy1, cx2, cy2, x2, y2);
        bezier(x1, y1 + 30, cx1, cy1, cx2, cy2, x2, y2);
        bezier(x1, y1 + 32, cx1, cy1, cx2, cy2, x2, y2);
        bezier(x1, y1 + 34, cx1, cy1, cx2, cy2, x2, y2);
        bezier(x1, y1 + 36, cx1, cy1, cx2, cy2, x2, y2);
        bezier(x1, y1 + 38, cx1, cy1, cx2, cy2, x2, y2);
        bezier(x1, y1 + 40, cx1, cy1, cx2, cy2, x2, y2);
        bezier(x1, y1 + 42, cx1, cy1, cx2, cy2, x2, y2);
        cx1 += cx1Dir;
        if ((cx1 > x2) || (cx1 < x1)) {cx1Dir = -cx1Dir;}
        cx2 += cx2Dir;
        if ((cx2 < x1) || (cx2 > x2)) {cx2Dir = -cx2Dir;}
        x2 += x2Dir;
        if ((abs(x1 - x2) > 200) || (x2 < x1)) {x2Dir = -x2Dir;}
        
        

    };

    anti_gravity_snake.prototype.draw = function() {

        for(var i = 0; i < this.points.length; i++) {
            if(!pointDist(this.points[i].x, this.points[i].y)) {
                snake_points.push(new PVector(this.points[i].x, this.points[i].y));
            }
        }

        pushMatrix();
            translate(this.x, this.y);
            scale(0.5);

            fill(0,0,0);
            beginShape();
                
                for (var i = 0; i < snake_points.length; i++) {
                    vertex(snake_points[i].x, snake_points[i].y);       
                }    
                
                vertex(snake_points[0].x, snake_points[0].y);

                
            
                
            endShape();
            // TAIL.x = this.x;
            // TAIL.y = this.y;
        
        popMatrix();
        
        fill(255, 0, 0);
        ellipse(this.x + 5, this.y + 10, 5, 5);  // Eye
        
        pushMatrix();
            
            translate(this.x, this.y);
            
            scale(0.5);
          
            TAIL.draw();

        popMatrix();
        
        
    };

    anti_gravity_snake.prototype.wander = function() {

        switch(this.direction) {

            case 0: //left
                    this.x-=0.5;
            break;

            case 1: //right 
                    this.x+=0.5;
            break;

        }
        if (this.x === 20) {
            this.direction = 1;
        }

        if (this.x === 310){
            this.direction = 0;
        }

        if(frameCount % 2 === 0) {
            this.y-=2;
        }
        else {
            this.y+=2;
        }
    };


    var pointDist = function(x, y) {

        var result = false;
        for (var i = 0; i < snake_points.length; i++) {
            if (dist(x, y, snake_points[i].x, snake_points[i].y) < 10) {
                result = true;  
            }    
        }    
        return result;
    };
    
    var draw_fence = function() {

        fill(218,165,32);
        noStroke();

        rect(0, 0, 400, 20);    // top
        rect(0, 380, 400, 20);  // bottom
        rect(0, 20, 20, 360);   // left
        rect(380, 20, 20, 360);   // right
    };


    var iterations = 0;

    var splitPoints = function() {

        p2.splice(0, p2.length);

        for (var i = 0; i < snake_points.length - 1; i++) {
            p2.push(new PVector(snake_points[i].x, snake_points[i].y));
            p2.push(new PVector((snake_points[i].x + snake_points[i+1].x)/2, (snake_points[i].y + snake_points[i+1].y)/2));
        }  
        
        p2.push(new PVector(snake_points[i].x, snake_points[i].y));
        p2.push(new PVector((snake_points[0].x + snake_points[i].x)/2, (snake_points[0].y + snake_points[i].y)/2));
    
    };  

    var average = function() {

        for (var i = 0; i < p2.length - 1; i++) {
            var x = (p2[i].x + p2[i+1].x)/2;
            var y = (p2[i].y + p2[i+1].y)/2;
            p2[i].set(x, y);
        } 
        var x = (p2[i].x + snake_points[0].x)/2;
        var y = (p2[i].y + snake_points[0].y)/2;
        snake_points.splice(0, snake_points.length);
        for (i = 0; i < p2.length; i++) {
            snake_points.push(new PVector(p2[i].x, p2[i].y));   
        }    
    };    

    var subdivide = function() {

        splitPoints();
        average();
    };    

   
    
    var draw = function() {

        background(24,252,0);
        draw_fence();
        
       
        SNAKE.wander();
        SNAKE.draw();
        
        

        // DO NOT change iterations limit (makes web page unresponsive)
        if (iterations < 5) {
            subdivide();
            iterations++;
        }    

    };

   

}};

