var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE

        function createSawBlade(x, y){
            var hitZoneSize = 25; //sets the size of your hitzone
            var damageFromObstacle = 10; //sets the damage of the obstslce
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //creeates the hitzone and stores it in thes variable

            sawBladeHitZone.x = x; //x position of hitzone
            sawBladeHitZone.y = y; //y position of hitzone
            game.addGameItem(sawBladeHitZone); //adds hitzone to game
            
            var obstacleImage = draw.bitmap('img/sawblade.png'); //drawing the image and storing it in the variable
            sawBladeHitZone.addChild(obstacleImage); //add the image to the hitzone so we can see it
            obstacleImage.x = -25; //tweaks the image 25 pixels to the left
            obstacleImage.y = -25;//tweaks the image 25 pixels up

        }

        createSawBlade(400, 370);
        createSawBlade(600, 500);
        createSawBlade(800, 345);


        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
