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
        popMatrix();
        
        fill(255, 0, 0);
        ellipse(this.x + 5, this.y + 10, 5, 5);  // Eye
       
        
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

    var SNAKE = new anti_gravity_snake(118, 82);
    
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

