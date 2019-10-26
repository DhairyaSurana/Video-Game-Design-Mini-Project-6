var sketchProc=function(processingInstance){ with (processingInstance){
    size(400, 400); 
    frameRate(60);

    // subdivision - split + average
    // beginShape + endShape to enclose the entire shape
    // EXPERIMENT with coloring and number of iterations

    angleMode = "radians"

    var snake_points = [];
    var blob_points = [];

    var snake_p2 = [];
    var blob_p2 = [];

  

    var snake_tail = function(x, y) {
        this.x = x; 
        this.y = y;
    };

    var blob_tail = function(x, y) {
        this.x = x;
        this.y = y;
    }

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


     var b_x1 = 62;
     var b_y1 = 120;
     var b_cx1 = 262;
     var b_cy1 = 138;
     var b_cx2 = 92;
     var b_cy2 = 287;
     var b_x2 = 206;
     var b_y2 = 220;
     
     var b_cx1Dir = 1;
     var b_cx2Dir = -1;
     var b_x2Dir = -40;



    var splitPoints_for_snake = function(p) {

        snake_p2.splice(0, snake_p2.length);

        for (var i = 0; i < snake_points.length - 1; i++) {
            snake_p2.push(new PVector(snake_points[i].x, snake_points[i].y));
            snake_p2.push(new PVector((snake_points[i].x + snake_points[i+1].x)/2, (snake_points[i].y + snake_points[i+1].y)/2));
        }  
        
        snake_p2.push(new PVector(snake_points[i].x, snake_points[i].y));
        snake_p2.push(new PVector((snake_points[0].x + snake_points[i].x)/2, (snake_points[0].y + snake_points[i].y)/2));
    
    };  

    var splitPoints_for_blob = function() {

        blob_p2.splice(0, blob_p2.length);

        for (var i = 0; i < blob_points.length - 1; i++) {
            blob_p2.push(new PVector(blob_points[i].x, blob_points[i].y));
            blob_p2.push(new PVector((blob_points[i].x + blob_points[i+1].x)/2, (blob_points[i].y + blob_points[i+1].y)/2));
        }  
        
        blob_p2.push(new PVector(blob_points[i].x, blob_points[i].y));
        blob_p2.push(new PVector((blob_points[0].x + blob_points[i].x)/2, (blob_points[0].y + blob_points[i].y)/2));
    
    };  

    var average_for_snake = function() {

        for (var i = 0; i < snake_p2.length - 1; i++) {
            var x = (snake_p2[i].x + snake_p2[i+1].x)/2;
            var y = (snake_p2[i].y + snake_p2[i+1].y)/2;
            snake_p2[i].set(x, y);
        } 
        var x = (snake_p2[i].x + snake_points[0].x)/2;
        var y = (snake_p2[i].y + snake_points[0].y)/2;
        snake_points.splice(0, snake_points.length);
        for (i = 0; i < snake_p2.length; i++) {
            snake_points.push(new PVector(snake_p2[i].x, snake_p2[i].y));   
        }    
    };    

    var average_for_blob = function() {

        for (var i = 0; i < blob_p2.length - 1; i++) {
            var x = (blob_p2[i].x + blob_p2[i+1].x)/2;
            var y = (blob_p2[i].y + blob_p2[i+1].y)/2;
            blob_p2[i].set(x, y);
        } 
        var x = (blob_p2[i].x + blob_points[0].x)/2;
        var y = (blob_p2[i].y + blob_points[0].y)/2;
        blob_points.splice(0, blob_points.length);
        for (i = 0; i < blob_p2.length; i++) {
            blob_points.push(new PVector(blob_p2[i].x, blob_p2[i].y));   
        }    
    };    

    var subdivide_for_snake = function() {

        splitPoints_for_snake();
        average_for_snake();
    };    

    var subdivide_for_blob = function() {

        splitPoints_for_blob();
        average_for_blob();
    };    

    var pointDist_for_snake = function(x, y) {

        var result = false;
        for (var i = 0; i < snake_points.length; i++) {
            if (dist(x, y, snake_points[i].x, snake_points[i].y) < 10) {
                result = true;  
            }    
        }    
        return result;
    };

    var pointDist_for_blob = function(x, y) {

        var result = false;
        for (var i = 0; i < blob_points.length; i++) {
            if (dist(x, y, blob_points[i].x, blob_points[i].y) < 10) {
                result = true;  
            }    
        }    
        return result;
    };


   
    var play_dough_blob = function(x, y) {

        this.x = x;
        this.y = y;

        this.iterations = 0;
        this.direction = 1;

        this.points = [

            new PVector(132, 111),
            new PVector(188, 110),
            new PVector(227, 142),
            new PVector(282, 162),
            new PVector(301, 198),
            new PVector(45, 199),
            new PVector(64, 163),
            new PVector(117, 139),
            new PVector(132, 112),

        ]
    };

    var BLOB_TAIL = new blob_tail(0, 0);

    blob_tail.prototype.draw = function() {

        noFill();
        stroke(0, 0, 0);
        bezier(b_x1, b_y1, b_cx1, b_cy1, b_cx2, b_cy2, b_x2, b_y2);
        bezier(b_x1, b_y1 + 2, b_cx1, b_cy1, b_cx2, b_cy2, b_x2, b_y2);
        bezier(b_x1, b_y1 + 4, b_cx1, b_cy1, b_cx2, b_cy2, b_x2, b_y2);
        bezier(b_x1, b_y1 + 6, b_cx1, b_cy1, b_cx2, b_cy2, b_x2, b_y2);
        bezier(b_x1, b_y1 + 8, b_cx1, b_cy1, b_cx2, b_cy2, b_x2, b_y2);
        bezier(b_x1, b_y1 + 10, b_cx1, b_cy1, b_cx2, b_cy2, b_x2, b_y2);
        bezier(b_x1, b_y1 + 12, b_cx1, b_cy1, b_cx2, b_cy2, b_x2, b_y2);
        bezier(b_x1, b_y1 + 14, b_cx1, b_cy1, b_cx2, b_cy2, b_x2, b_y2);
        bezier(b_x1, b_y1 + 16, b_cx1, b_cy1, b_cx2, b_cy2, b_x2, b_y2);
        bezier(b_x1, b_y1 + 18, b_cx1, b_cy1, b_cx2, b_cy2, b_x2, b_y2);
        bezier(b_x1, b_y1 + 20, b_cx1, b_cy1, b_cx2, b_cy2, b_x2, b_y2);
        bezier(b_x1, b_y1 + 22, b_cx1, b_cy1, b_cx2, b_cy2, b_x2, b_y2);
        bezier(b_x1, b_y1 + 24, b_cx1, b_cy1, b_cx2, b_cy2, b_x2, b_y2);
        bezier(b_x1, b_y1 + 26, b_cx1, b_cy1, b_cx2, b_cy2, b_x2, b_y2);
        bezier(b_x1, b_y1 + 28, b_cx1, b_cy1, b_cx2, b_cy2, b_x2, b_y2);
        bezier(b_x1, b_y1 + 30, b_cx1, b_cy1, b_cx2, b_cy2, b_x2, b_y2);
        bezier(b_x1, b_y1 + 32, b_cx1, b_cy1, b_cx2, b_cy2, b_x2, b_y2);
        bezier(b_x1, b_y1 + 34, b_cx1, b_cy1, b_cx2, b_cy2, b_x2, b_y2);
        bezier(b_x1, b_y1 + 36, b_cx1, b_cy1, b_cx2, b_cy2, b_x2, b_y2);
        bezier(b_x1, b_y1 + 38, b_cx1, b_cy1, b_cx2, b_cy2, b_x2, b_y2);
        bezier(b_x1, b_y1 + 40, b_cx1, b_cy1, b_cx2, b_cy2, b_x2, b_y2);
        bezier(b_x1, b_y1 + 42, b_cx1, b_cy1, b_cx2, b_cy2, b_x2, b_y2);
        b_cx1 += b_cx1Dir;
        if ((b_cx1 > b_x2) || (b_cx1 < b_x1)) {b_cx1Dir = -b_cx1Dir;}
        cx2 += cx2Dir;
        if ((b_cx2 < b_x1) || (b_cx2 > b_x2)) {b_cx2Dir = -b_cx2Dir;}
        b_x2 += b_x2Dir;
        if ((abs(b_x1 - b_x2) > 200) || (b_x2 < b_x1)) {b_x2Dir = -b_x2Dir;}
        
        

    };

    play_dough_blob.prototype.draw = function() {

        for(var i = 0; i < this.points.length; i++) {
            if(!pointDist_for_blob(this.points[i].x, this.points[i].y)) {
                blob_points.push(new PVector(this.points[i].x, this.points[i].y));
            }
        }

        pushMatrix();

            translate(this.x, this.y);
            scale(0.5);

            fill(255,0,0);
            beginShape();
                
                for (var i = 0; i < blob_points.length; i++) {
                    vertex(blob_points[i].x, blob_points[i].y);       
                }    
                
                vertex(blob_points[0].x, blob_points[0].y);

                
            
                
            endShape();
           
    
        popMatrix();

        fill(0, 0, 0);
        ellipse(this.x + 70, this.y + 65, 10, 10);
        ellipse(this.x + 90, this.y + 65, 10, 10);

        

          
        pushMatrix();
            
            translate(this.x, this.y);
            scale(0.5);
          
            BLOB_TAIL.draw();

        popMatrix();


        if (this.iterations < 5) {
            subdivide_for_blob();
            this.iterations++;
        }    

        

    };

  

    play_dough_blob.prototype.wander = function() {

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

        if (this.x === 250){
            this.direction = 0;
        }

        if(frameCount % 2 === 0) {
            this.y-=2;
        }
        else {
            this.y+=2;
        }
    };
    
    var anti_gravity_snake = function(x, y) {

        this.x = x;
        this.y = y;

        this.direction = 0; // initially set to left
        this.iterations = 0;

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

    var SNAKE = new anti_gravity_snake(118, 62);
    var SNAKE_TAIL = new snake_tail(0, 0);

    var BLOB = new play_dough_blob(118, 250);
   

    snake_tail.prototype.draw = function() {

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
            if(!pointDist_for_snake(this.points[i].x, this.points[i].y)) {
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
          
            SNAKE_TAIL.draw();

        popMatrix();

        if (this.iterations < 5) {
            subdivide_for_snake();
            this.iterations++;
        }    

        
        
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


   
    
    var draw_fence = function() {

        fill(218,165,32);
        noStroke();

        rect(0, 0, 400, 20);    // top
        rect(0, 380, 400, 20);  // bottom
        rect(0, 20, 20, 360);   // left
        rect(380, 20, 20, 360);   // right
    };


    

   
    
    var draw = function() {

        background(24,252,0);
        draw_fence();
        
        BLOB.wander();
        BLOB.draw();
       
        SNAKE.wander();
        SNAKE.draw();

    };

   

}};

