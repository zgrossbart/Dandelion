function Seed() {
    
    this.draw = function (/*Point*/ p, /*int*/ angle) {
        var c = new Path.Circle(p, 2);
        c.fillColor = 'purple';
        
        p.y += 15;
        
        var group = new Group();
        
        /*
         * Draw the small oval at the bottom of the seed
         */
        var size = new Size(4, -15);
        var rectangle = new Rectangle(p, size);
        var bottom = new Path.Oval(rectangle);
        bottom.fillColor = 'green';
        group.addChild(bottom);
        
        p.y -= 15;
        
        /*
         * Draw the stem of the seed
         */
        var stem = new Path();
        stem.strokeColor = 'green';
        stem.strokeWidth = 1;
        
        stem.add(new Point(p.x + 2, p.y));
        
        // The point through which we will create the arc:
        var throughPoint = new Point(p.x + 4, p.y - 10);
        
        // The point at which the arc will end:
        var toPoint = new Point(p.x + 3, p.y - 15);
        
        // Draw an arc through 'throughPoint' to 'toPoint'
        stem.arcTo(throughPoint, toPoint);
        group.addChild(stem);
        
        /*
         * Draw the fluttery parts on the top
         */
        p = toPoint;
        
        for (var i = 0; i < 8; i++) {
            path = new Path();
            path.strokeColor = 'green';
            path.strokeWidth = 1;
            
            var p1 = new Point(p.x, p.y);
            
            var circle = new Path.Circle(p1, 2);
            circle.fillColor = 'green';
            group.addChild(circle);
            
            //p1.x = p1.x + Math.floor(Math.random() * 80);
            
            //p1.y = p1.y - Math.floor(Math.random() * 80);
            
            
            path.add(new Point(p1.x + 2, p1.y + 2));
            
            if (i % 2 == 0) {
                // The point through which we will create the arc:
                throughPoint = new Point(p1.x + Math.floor(Math.random() * 5), 
                                         p1.y - Math.floor(Math.random() * 5));
            
                // The point at which the arc will end:
                toPoint = new Point(p1.x + Math.floor(Math.random() * 25), 
                                    p1.y - 20 - Math.floor(Math.random() * 5));
            } else {
                // The point through which we will create the arc:
                throughPoint = new Point(p1.x - Math.floor(Math.random() * 5), 
                                         p1.y - Math.floor(Math.random() * 5));
                
                // The point at which the arc will end:
                toPoint = new Point(p1.x - Math.floor(Math.random() * 25), 
                                    p1.y - 20 - Math.floor(Math.random() * 5));
            }
            
            // Draw an arc through 'throughPoint' to 'toPoint'
            path.arcTo(throughPoint, toPoint);
            
            group.addChild(path);
            
            circle = new Path.Circle(toPoint, 2);
            circle.fillColor = 'green';
            
            group.addChild(circle);
        }
        
        this.group = group;
        group.scale(0.5);
    }
    
    this.move = function(/*Point*/ point) {
        this.group.translate(point);
    }
    
    this.rotate = function(/*int*/ angle) {
        this.group.rotate(angle, view.center);//new Point(this.group.position - 15, this.group.position.y));
    }
    
    this.scale = function(/*double*/ scale) {
        this.group.scale(scale);
    }
}

var seed;
var started = false;

jQuery(document).ready(function() {
    var group = new Group();
    
    var path = new Path();
    path.strokeColor = 'black';
    path.strokeWidth = 5;
    
    var firstPoint = new Point(30, 750);
    path.add(firstPoint);
    
    // The point through which we will create the arc:
    var throughPoint = new Point(85, 675);
    
    // The point at which the arc will end:
    var toPoint = new Point(125, 575);
    
    // Draw an arc through 'throughPoint' to 'toPoint'
    path.arcTo(throughPoint, toPoint);
    group.addChild(path);
    
    // Add a red circle shaped path at the position of 'throughPoint':
    var circle = new Path.Circle(throughPoint, 5);
    circle.fillColor = 'red';
    group.addChild(circle);
    
    var bulb = new Path.Circle(toPoint, 10);
    bulb.fillColor = 'black';
    group.addChild(bulb);
    
    var topLeft = new Point(130, 565);
    seed = new Seed()
    seed.draw(topLeft);
    //seed.move(new Point(-100, -100));
    //seed.rotate(90);
    
    //group.translate(new Point(200, -200));
});

function onMouseUp(event) {
    started = !started;
}

function onFrame(event) {
    if (started) {
        seed.rotate(3);
    }
}
