var data = {};

function random(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

function Seed() {
    
    this.draw = function (/*Point*/ p, /*int*/ angle) {
        var height = random(10, 50);
        p.y += height;
        
        var group = new Group();
        
        /*
         * Draw the small oval at the bottom of the seed
         */
        var size = new Size(4, -height);
        var rectangle = new Rectangle(p, size);
        var bottom = new Path.Oval(rectangle);
        bottom.fillColor = 'green';
        group.addChild(bottom);
        
        p.y -= height;
        
        /*
         * Draw the stem of the seed
         */
        var stem = new Path();
        stem.strokeColor = 'green';
        stem.strokeWidth = 1;
        
        stem.add(new Point(p.x + 2, p.y));
        
        // The point through which we will create the arc:
        var throughPoint = new Point(p.x + 4, p.y - height / 2);
        
        // The point at which the arc will end:
        var toPoint = new Point(p.x + 3, p.y - height);
        
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
                throughPoint = new Point(p1.x + random(1, 5), 
                                         p1.y - random(1, 5));
            
                // The point at which the arc will end:
                toPoint = new Point(p1.x + random(5, 25), 
                                    p1.y - 20 - random(1, 5));
            } else {
                // The point through which we will create the arc:
                throughPoint = new Point(p1.x - random(1, 5), 
                                         p1.y - random(1, 5));
                
                // The point at which the arc will end:
                toPoint = new Point(p1.x - random(5, 25), 
                                    p1.y - 20 - random(1, 5));
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
        
        this.position = new Point(this.group.position.x, this.group.position.y + 15);
        
    }
    
    this.move = function(/*Point*/ point) {
        this.group.translate(point);
    }
    
    this.rotate = function(/*int*/ angle) {
        this.group.rotate(angle, this.position);//, view.center);//new Point(this.group.position - 15, this.group.position.y));
    }
    
    this.scale = function(/*double*/ scale) {
        this.group.scale(scale);
    }
}

var seed = null;
var seeds = [];
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
    
    //var topLeft = new Point(130, 465);
    //data.seed = new Seed()
    //data.seed.draw(topLeft);
    //return;
    //seed.move(new Point(-100, -100));
    //seed.rotate(90);
    
    //group.translate(new Point(200, -200));
    
    var angle = 360 / bulb.length;
    
    for (var i = 0; i < bulb.length; i+= 2) {
        var seed = new Seed()
        seed.draw(bulb.getPointAt(i));
        seed.rotate(i * angle);
        seeds.push(seed);
        
        //if (bulb.getPointAt(i)) {
        //    var c = new Path.Circle(bulb.getPointAt(i), 2);
        //    c.fillColor = 'purple';
        //}
    }
});

function onMouseUp(event) {
    started = !started;
}

function onFrame(event) {
    if (started) {
        data.seed.rotate(3);
    }
}
