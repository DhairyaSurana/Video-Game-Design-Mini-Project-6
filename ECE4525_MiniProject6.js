var sketchProc=function(processingInstance){ with (processingInstance){
    size(400, 400); 
    frameRate(60);

    // subdivision - split + average
    // beginShape + endShape to enclose the entire shape
    // EXPERIMENT with coloring and number of iterations

    var worm_points = [];
    var p2 = [];
    var numPoints = 0;

    var anti_gravity_worm = function(x, y) {

        this.x = x;
        this.y = y;

        this.points = [

            // this.x = 118
            // this.y = 62
            new PVector(this.x + 58, this.y + 23),
            new PVector(this.x + 89, this.y + 47),
            new PVector(this.x + 115, this.y + 94),
            new PVector(this.x + 117, this.y + 133),
            new PVector(this.x + 50, this.y + 173),
            new PVector(this.x + 55, this.y + 193),
            new PVector(this.x + 138, this.y + 125),
            new PVector(this.x + 133, this.y + 64),
            new PVector(this.x + 86, this.y + 22),
            new PVector(this.x + 65, this.y - 19),
            new PVector(this.x + 20, this.y - 20),
            new PVector(this.x, this.y),
            new PVector(this.x + 2, this.y + 32),
            new PVector(this.x + 16, this.y + 40),
            new PVector(this.x + 25, this.y + 25),
            new PVector(this.x + 34, this.y + 6),
            new PVector(this.x + 57, this.y + 21),
        ];

    };

   

    anti_gravity_worm.prototype.draw = function() {

        for(var i = 0; i < this.points.length; i++) {
            if(!pointDist(this.points[i].x, this.points[i].y)) {
                worm_points.push(new PVector(this.points[i].x, this.points[i].y));
            }
        }

        
        translate(this.x, this.y);
        scale(0.5);
        fill(0,0,0);
        beginShape();
            
            for (var i = 0; i < worm_points.length; i++) {
                vertex(worm_points[i].x, worm_points[i].y);       
                
            }    
            
            vertex(worm_points[0].x, worm_points[0].y);
            
        endShape();
        
        fill(255, 0, 0);
        ellipse(this.x + 10, this.y + 10, 10, 10);  // Eye
    };

    var pointDist = function(x, y) {

        var result = false;
        for (var i = 0; i < worm_points.length; i++) {
            if (dist(x, y, worm_points[i].x, worm_points[i].y) < 10) {
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

        for (var i = 0; i < worm_points.length - 1; i++) {
            p2.push(new PVector(worm_points[i].x, worm_points[i].y));
            p2.push(new PVector((worm_points[i].x + worm_points[i+1].x)/2, (worm_points[i].y + worm_points[i+1].y)/2));
        }  
        
        p2.push(new PVector(worm_points[i].x, worm_points[i].y));
        p2.push(new PVector((worm_points[0].x + worm_points[i].x)/2, (worm_points[0].y + worm_points[i].y)/2));
    
    };  

    var average = function() {

        for (var i = 0; i < p2.length - 1; i++) {
            var x = (p2[i].x + p2[i+1].x)/2;
            var y = (p2[i].y + p2[i+1].y)/2;
            p2[i].set(x, y);
        } 
        var x = (p2[i].x + worm_points[0].x)/2;
        var y = (p2[i].y + worm_points[0].y)/2;
        worm_points.splice(0, worm_points.length);
        for (i = 0; i < p2.length; i++) {
            worm_points.push(new PVector(p2[i].x, p2[i].y));   
        }    
    };    

    var subdivide = function() {

        splitPoints();
        average();
    };    

    var WORM = new anti_gravity_worm(118, 82);
    
    var draw = function() {

        background(24,252,0);
        draw_fence();
    
        
        WORM.draw();

        // DO NOT change iterations limit (makes web page unresponsive)
        if (iterations < 5) {
            subdivide();
            iterations++;
        }    
     
    };

}};

