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
                { "type": "sawblade", "x": 400, "y": groundY -50 },
                { "type": "sawblade", "x": 600, "y": groundY -50 },
                { "type": "sawblade", "x": 900, "y": groundY -50 },

                { "type": "enemy", "x": 300, "y": groundY -50 },
                { "type": "enemy", "x": 500, "y": groundY -50 },
                { "type": "enemy", "x": 700, "y": groundY -50 },

                { "type": "reward", "x": 200, "y": groundY -50 },
                { "type": "reward", "x": 400, "y": groundY -50 },
                { "type": "reward", "x": 800, "y": groundY -50 },
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

    

        function createEnemy (x, y){
            var enemy = game.createGameItem('enemy',25);
            var redSquare = draw.rect(50,50,'red');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);

            enemy.x = x;
            enemy.y = y;

            game.addGameItem(enemy);

            enemy.velocityX = -1;

            enemy.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-10);
            };
            
            enemy.onProjectileCollision = function() {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(10);
                game.increaseScore(10);
                enemy.fadeOut();
            };
        }
        
        function createReward (x, y){
            var reward = game.createGameItem('reward',25);
            var blueSquare = draw.rect(50,50,'blue');
            blueSquare.x = -25; n
            blueSquare.y = -25;
            reward.addChild(blueSquare);

            enemy.x = x;
            enemy.y = y;

            game.addGameItem(reward);

            reward.velocityX = -1;

            reward.onPlayerCollision = function() {
                console.log('Hallie has collected a reward');
                game.changeIntegrity(10);
                game.increaseScore(100);
            };
            
        }
        

        for (var i = 0; i < levelData.gameItems.length; i++){
           var gameItem = levelData.gameItems[i];

            if (gameItem.type === "sawblade"){
                createSawBlade(gameItem.x, gameItem.y);
            }

            if (gameItem.type === "enemy"){
                createEnemy(gameItem.x, gameItem.y);
            }

            if (gameItem.type === "reward"){
                createReward(gameItem.x, gameItem.y);
            }
        }



        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
