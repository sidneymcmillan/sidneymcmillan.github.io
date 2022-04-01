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
                { "type": "sawblade", "x": 500, "y": groundY -20 },
                { "type": "sawblade", "x": 900, "y": groundY -110 },
                { "type": "sawblade", "x": 1100, "y": groundY -20 },
                { "type": "sawblade", "x": 1600, "y": groundY -110 },
                { "type": "sawblade", "x": 1870, "y": groundY -110 },
                { "type": "sawblade", "x": 2100, "y": groundY -20 },
                { "type": "sawblade", "x": 2500, "y": groundY -110 },
                { "type": "sawblade", "x": 2900, "y": groundY -20 },
                { "type": "sawblade", "x": 2100, "y": groundY -20 },
                { "type": "sawblade", "x": 2900, "y": groundY -20 },
                { "type": "sawblade", "x": 2900, "y": groundY -20 },




                { "type": "enemy", "x": 400, "y": groundY -50 },
                { "type": "enemy2", "x": 400, "y": groundY -50 },
                { "type": "enemy2", "x": 1100, "y": groundY -50 },
                { "type": "enemy", "x": 1500, "y": groundY -50 },
                { "type": "enemy", "x": 1750, "y": groundY -50 },
                { "type": "enemy2", "x": 1900, "y": groundY -50 },
                { "type": "enemy2", "x": 2500, "y": groundY -50 },
                { "type": "enemy", "x": 2400, "y": groundY -50 },
                { "type": "enemy", "x": 2200, "y": groundY -50 },

                { "type": "reward", "x": 300, "y": groundY -80 },
                { "type": "reward", "x": 700, "y": groundY -80 },
                { "type": "reward", "x": 900, "y": groundY -80 },
                { "type": "reward", "x": 1250, "y": groundY -80 },
                { "type": "reward", "x": 1250, "y": groundY -80 },
                { "type": "reward", "x": 1550, "y": groundY -80 },
                { "type": "reward", "x": 1970, "y": groundY -80 },
                { "type": "reward", "x": 2200, "y": groundY -80 },
                { "type": "reward", "x": 2500, "y": groundY -80 },


            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE

        function createSawBlade(x, y){
            var hitZoneSize = 25; //sets the size of your hitzone
            var damageFromObstacle = 10; //sets the damage of the obstslce
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //creeates the hitzone and stores it in thes variable

            sawBladeHitZone.x = x; //x position of hitzone
            sawBladeHitZone.y = y; //y position of hitzone
            game.addGameItem(sawBladeHitZone); //adds hitzone to game
            
            var obstacleImage = draw.bitmap('img/orb.png'); //drawing the image and storing it in the variable
            sawBladeHitZone.addChild(obstacleImage); //add the image to the hitzone so we can see it
            obstacleImage.x = -25; //tweaks the image 25 pixels to the left
            obstacleImage.y = -25;//tweaks the image 25 pixels up

        }

    

        function createEnemy (x, y){
            var enemy = game.createGameItem('enemy',25); //creates game item and gives it a hitzone, which stores it to the variable enemy
            var redSquare = draw.bitmap('img/First_Enemy.png'); //draws image on the canvas and stores it in red square
            redSquare.x = -25; //x pos of the hitzone in refrence to image's X
            redSquare.y = -25; //y pos of the hitzone in refrence to image's Y
            enemy.addChild(redSquare); //adds the image to the hitzone

            enemy.x = x; //x coordinate of enemy
            enemy.y = y; //y coordinate of enemy

            game.addGameItem(enemy); //adds enemy to the game

            enemy.velocityX = -1; //moves enemy to the left

            enemy.onPlayerCollision = function() { //detects if the player has collided with the enemy
                console.log('The enemy has hit Halle'); 
                game.changeIntegrity(-10); //takes away health from the enemy
            };
            
            enemy.onProjectileCollision = function() { //detects if the projectile is colliding with the enemy
                console.log('The enemy has hit Halle');
                game.changeIntegrity(10); // adds health if the projectile collides with the enemy
                game.increaseScore(10); //increases score if the projectile collides with the enemy
                enemy.fadeOut(); //makes the enemy dissappear if hit
            };
        }

        function createEnemy2 (x, y){
            var enemy = game.createGameItem('enemy2',25); //creates game item and gives it a hitzone, which stores it to the variable enemy
            var redSquare = draw.bitmap('img/Second_Enemy.png'); //draws image on the canvas and stores it in red square
            redSquare.x = -25; //x pos of the hitzone in refrence to image's X
            redSquare.y = -25; //y pos of the hitzone in refrence to image's Y
            enemy.addChild(redSquare); //adds the image to the hitzone

            enemy.x = x; //x coordinate of enemy
            enemy.y = y; //y coordinate of enemy

            game.addGameItem(enemy); //adds enemy to the game

            enemy.velocityX = -1; //moves enemy to the left

            enemy.onPlayerCollision = function() { //detects if the player has collided with the enemy
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-10); //takes away health from the enemy
            };
            
            enemy.onProjectileCollision = function() { //detects if the projectile is colliding with the enemy
                console.log('The enemy has hit Halle');
                game.changeIntegrity(10); // adds health if the projectile collides with the enemy
                game.increaseScore(10); //increases score if the projectile collides with the enemy
                enemy.fadeOut(); //makes the enemy dissappear if hit
            };
        }
        
        function createReward (x, y){
            var reward = game.createGameItem('reward',25);
            var blueSquare = draw.bitmap('img/Sonic_Ring.png')
            blueSquare.x = -25;
            blueSquare.y = -25;
            blueSquare.scaleX = 0.08;
            blueSquare.scaleY = 0.08;
            reward.addChild(blueSquare);

            reward.x = x;
            reward.y = y;

            game.addGameItem(reward);

            reward.velocityX = -1;

            reward.onPlayerCollision = function() {
                console.log('Hallie has collected a reward');
                game.changeIntegrity(10);
                game.increaseScore(100);
                reward.fadeOut();
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

            if (gameItem.type === "enemy2"){
                createEnemy2(gameItem.x, gameItem.y);
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
