document.addEventListener('DOMContentLoaded' , () => {
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground-moving')

    //For starting the game we want to think where exactly does our bird start
    //It starts close to maximum left, semi-close to the bottom
    //We want a variable for gravity (pixels per second) also one for game over 
    //The last variable for game logic is the gap between obstacles
    let birdLeft = 220
    let birdBottom = 100
    let gravity = 3
    let isGameOver = false
    let gap = 430

    // Let's start making the function when starting the game
    function startGame() {
        //Everytime we invoke this function we change the birdBottom with the value of gravity
        birdBottom -= gravity

        //Now we add those variables as pixels to our bird position
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }
     
    //Now we can't just call the function once, that doesn't really work like that
    //We'll use a JS function setInterval, which we use to call our function each 20 miliseconds
    //We pass that to a variable since we can use that variable to stop this process
    let gameTimerId = setInterval(startGame, 20)
    //simple way to stop is say clearInterval(gameTimerId)
    

    //Now let's set up the keys needed for the game, in our case the spacebar
    //What this does, is if you the key, in the keyup event is space, it jumps
    function control(e) {
        if (e.keyCode === 32) {
            jump()
        }
    }
    
    //Let's make the only command in Flappy Bird, the jump command
    function jump() {
        //First we test if the bird is not above the skyline and if it is not
        //We add the amount of pixels for a jump,in our case 50 to the variable
        if (birdBottom < 500) birdBottom += 50

        //Now we add that variable to the bottom style of the bird
        bird.style.bottom = birdBottom + 'px'
        console.log(birdBottom)
    }
    //Let's add the functionality, when your finger leaves the key on the 
    //keyboard, it calls the control functiom
    document.addEventListener('keyup', control)

    // Let's add the main part of the game, the obstacles
    function generateObstacle() {

        //Let's use some variables for our obstacles, first off the starting left position
        let obstacleLeft = 500
        //Then the height generator
        let randomHeight = Math.random() * 60
        let obstacleBottom = randomHeight

        //We learn about a new Method, createElement which in our case
        //Makes a new div in the document, how cool is that
        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')

        //Now, testing that the game is not over yet, we add the CSS class
        //to our obstacles
        if (!isGameOver) {
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')
        }

        //Now we use another new function appendChild which puts the obstacles
        //elements in our game container gameDisplay
        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)

        //Since beforehand those obstacles were pretty much just stationary on the left
        //Let's start those boys more on the right side and with the gap between them
        obstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        topObstacle.style.bottom = obstacleBottom + gap + 'px'
        

        //Since i just said the pipes were stationary, let's move them to the left
        function moveObstacle() {
            //Each time the function is called, it moves our pipes with 2 pixels to the left
            obstacleLeft -=2
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'
 
            //Now let's stop the obstacle if it hits too far left
            if (obstacleLeft === -60) {
                //we clear the interval we talked about and we removeChild the obstacle
                clearInterval(timerId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
            }

            //for the last part of obstacles, let's add a game over if
            if (
                obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
                (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap -200)||
                birdBottom === 0 
                ) {
                    //Now that we cleared the collision, what it does?
                    //It calls the gameOver and clears of timerId interval, so our generation of pipes
                gameOver()
                clearInterval(timerId)
            }
        }

        //Let's make another interval for the moveObstacle with the same 20 miliseconds
        let timerId = setInterval(moveObstacle, 20) 

        // Now let's add another functionality for regenerating the pipes, this time 3000 miliseconds
        if (!isGameOver) setTimeout(generateObstacle, 3000)

    }
    generateObstacle()

    //finally the you died function
    function gameOver() {
        //first off it clears the interval for moving the bird
        clearInterval(gameTimerId)

        //it logs for our knowledge the game over
        console.log('game over')

        //it adds the true value to the variable to make sure nothing is executed
        isGameOver = true

        //it blocks the keyup command
        document.removeEventListener('keyup', control)

        //it stops the ground class from being animated
        ground.classList.add('ground')
        ground.classList.remove('ground-moving')
    }


})
