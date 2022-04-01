var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        var sun;
        var buildings = []
        var clouds;
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {

            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var ctx = canvas.getContext("2d"); 
            var grd = ctx.createLinearGradient(0,canvasHeight,0,0);
            grd.addColorStop(0.26, "#ffffff");
            grd.addColorStop(0.3,"#1190EE");
            grd.addColorStop(1,"#244DF0"); 
            grd.addColorStop(0.1,"#000000");
            var backgroundFill = draw.rect(canvasWidth, groundY, grd);
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            //everytime the loop runs it creates a circle with a random x and y respective to the canvas and is added to the background
            for (var i = 0; i < 100; i++){
                var circle = draw.circle(10,'white','LightGray',2); //creates a variable called circle that holds each circle
                circle.x = canvasWidth*Math.random(); //gives a random decimal which places the stars randomly
                circle.y = groundY*Math.random(); //Does the same thing as the one above
                background.addChild(circle); //adds circles in background
            }

            var moon = draw.bitmap('img/moon.png'); //Created a variable called moon. Draw.bitmap draws the image and stores it in the image variable
            moon.x = canvasWidth - 300; //Moves the moon along the X axis 
            moon.y = groundY - 450; //Moves the moon along the Y axis
            moon.scaleX = 0.5; //Changes the size of the moon
            moon.scaleY = 0.5; //Also changes the size of the moon
            background.addChild(moon); //adds moon in background

            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for(var i=0;i<5;i++) {
                var buildingHeight = 300; //creates a variable called building height that holds the height of the building in pixels
                var building = draw.rect(75,buildingHeight,'LightGray','Black',1); //creates a variable caled building that holds the data for the drawn building
                building.x = 200*i; //positions the x of each building 200 pixels from the next building on each loop
                building.y = groundY-buildingHeight; //sets the Y of the building off of groundY - buildingHeight
                background.addChild(building); //adds building to background so it can be seen
                buildings.push(building); //pushes each individual building to the buildings array
            }
            
            // TODO 4: Part 1 - Add a tree
            sun = draw.bitmap('img/SunflowerArt.jpg');
            sun.x = 300;
            sun.y = groundY - 300;
            background.addChild(sun);
            
            clouds = draw.bitmap('img/Clouds.png');
            clouds.x = 400;
            clouds.y = groundY - 400;
            background.addChild(clouds);

        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            sun.x = sun.x - 1;

            if(sun.x < -200) {
                sun.x = canvasWidth;
            }
            
            clouds.x = clouds.x - 1;

            if(clouds.x < -200) {
                clouds.x = canvasWidth;
            }

            // TODO 5: Part 2 - Parallax

            // loops the buildings and moves them to the left by 0.5 pixels
        for (var i = 0; i < buildings.length; i++){ 
            buildings[i].x = buildings[i].x - 0.5; //moves the buildings x position by .5 pixels
            if(buildings[i].x < 0) { //checks to see if the buildings x position is off the left side, and if it is, it resets the x position to the right
                buildings[i].x = canvasWidth;
            }
        }

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
