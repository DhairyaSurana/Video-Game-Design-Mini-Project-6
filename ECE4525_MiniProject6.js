var sketchProc=function(processingInstance){ with (processingInstance){
    size(400, 400); 
    frameRate(60);


    // subdivision - split + average
    // beginShape + endShape to enclose the entire shape
    // EXPERIMENT with coloring and number of iterations

    var points = [];
    var p2 = [];
    var numPoints = 0;
    var done = 0;
    var start = 0;

    var pointDist = function(x, y) {

        var result = false;
        for (var i = 0; i < points.length; i++) {
            if (dist(x, y, points[i].x, points[i].y) < 10) {
                result = true;  
                done = 1;
            }    
        }    
        return result;
    };    

    var mouseClicked = function() {

        start = 1;
        if ((pointDist(mouseX, mouseY) === false) && (done === 0)) {
            points.push(new PVector(mouseX, mouseY));
            numPoints++;
        }    
        
        println(mouseX + " " + mouseY);
    };    

    var iterations = 0;

    var splitPoints = function() {
        p2.splice(0, p2.length);
        for (var i = 0; i < points.length - 1; i++) {
            p2.push(new PVector(points[i].x, points[i].y));
            p2.push(new PVector((points[i].x + points[i+1].x)/2, (points[i].y + points[i+1].y)/2));
        }  
        p2.push(new PVector(points[i].x, points[i].y));
        p2.push(new PVector((points[0].x + points[i].x)/2, (points[0].y +
    points[i].y)/2));
    };  

    var average = function() {
        for (var i = 0; i < p2.length - 1; i++) {
            var x = (p2[i].x + p2[i+1].x)/2;
            var y = (p2[i].y + p2[i+1].y)/2;
            p2[i].set(x, y);
        } 
        var x = (p2[i].x + points[0].x)/2;
        var y = (p2[i].y + points[0].y)/2;
        points.splice(0, points.length);
        for (i = 0; i < p2.length; i++) {
            points.push(new PVector(p2[i].x, p2[i].y));   
        }    
    };    

    var subdivide = function() {

        splitPoints();
        average();
    };    

    var draw = function() {
        
        background(255, 255, 255);
        fill(255, 0, 0);
        if (start === 0) {
            text("Click to set points. Click on first point to end shape.", 20, 20);   
        }    
        if (done === 0) {
            for (var i = 0; i < points.length; i++) {
                ellipse(points[i].x, points[i].y, 10, 10);   
            } 
            for (var i = 0; i < points.length-1; i++) {
                line(points[i].x, points[i].y, points[i+1].x, points[i+1].y);   
            } 
            if (points.length > 0) {
                line(points[i].x, points[i].y, mouseX, mouseY);
            }
        }    
        if (done === 1) {

            noFill();
            beginShape();
            
            for (var i = 0; i < points.length; i++) {
                vertex(points[i].x, points[i].y);   
            }    
            
            vertex(points[0].x, points[0].y);
            endShape();
            
            if (iterations < 5) {
                subdivide();
                iterations++;
            }    
        }    
        
        fill(255, 0, 0);
        text(numPoints + " points", 330, 380);
    };

}};

