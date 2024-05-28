const gameBoard=document.getElementById('gameBoard');
const context=gameBoard.getContext('2d');
const scoreText= document.getElementById('scoreval');
const width=gameBoard.width;
const height=gameBoard.height;
const unit=25;

let foodX;
let foodY;
let xvel=25;
//snake moves in x direction initially left to right 
let yvel=0;
let score=0;
let active=true;
let started=false;
let paused=false;




//because we need more square for snake so we are using array
let snake = [
    // Each object representing a book with x and y coordinates
    {x:unit*3, y:0 },
    {x:unit*2, y:0 },
    {x:unit, y:0},
    {x:0 , y:0 }
    
    // Add more book objects as needed
];
window.addEventListener('keydown',keyPress);

startGame();

function startGame(){
    context.fillStyle='#212121';
    //fillRect(xstart,yStart,width,height)
    context.fillRect(0,0,width,height);
    createFood();
    displayFood();
    drawSnake();
    // movesnake();
    // clearBoard();
    // drawsnake();
    
}
function clearBoard(){
    context.fillStyle='#212121';
    //fillRect(xstart,yStart,width,height)
    context.fillRect(0,0,width,height);
}

    function createFood(){
foodX=Math.floor(Math.random()*width/unit)*unit;
foodY=Math.floor(Math.random()*height/unit)*unit;

    }

    function displayFood(){
        context.fillStyle='red';
        context.fillRect(foodX,foodY,unit,unit);
    }

   function drawSnake(){
    context.fillStyle='aqua';
    context.strokeStyle='#212121';
    //we get the small snake part
    snake.forEach((snakePart)=>{
        
        context.fillRect(snakePart.x,snakePart.y,unit,unit)
        //it will just  give the outline of snake in black color
        context.strokeRect(snakePart.x,snakePart.y,unit,unit)
    })

    }
    function moveSnake(){
        //snake array
        //if snake moves in left to right xvel=25 and y=0;
        //then if snake moves in top to bottom xvel=0 and yvel=0;
        const head={x:snake[0].x+xvel,
                     y:snake[0].y+yvel}
               snake.unshift(head) ;
               if(snake[0].x==foodX && snake[0].y==foodY){
               score+=1;
               scoreText.textContent=score;
                createFood();
               }else{
               snake.pop();  
               }   
        }
                function nextTick(){
                    if(active && !paused){
                    setTimeout(()=>{
                      clearBoard();
                      displayFood();
                      moveSnake();
                      drawSnake();
                      checkGameOver();
                      nextTick();
                    },200);
                }
                else if(!active){
                    clearBoard();
                    context.font = 'bold 50px serif';
                      context.fillStyle = "white";
                    context.textAlign = "center";
                   context.fillText("Game Over!!", width / 2, height / 2);
                }
            }


      function keyPress(event){
if(!started){
    started=true;
    nextTick();
}
if(event.keycode==32){
    if(paused){
        paused=false;
        nextTick();
    }
    else{
        paused=true;
    }
}
const LEFT=37;
const UP=38;
const RIGHT=39;
const DOWN=40;

switch(true){
    //already left pona right poga kudathu
    case(event.keyCode==LEFT && xvel!=unit):
     xvel=-unit;
     yvel=0;
     break;
     case(event.keyCode==RIGHT && xvel!=-unit):
     xvel=unit;
     yvel=0;
     break;
     case(event.keyCode==UP && yvel!=unit):
     xvel=0;
     yvel=-unit;
     break;
     case(event.keyCode==DOWN && yvel!=-unit):
     xvel=0
     yvel=unit;
     break;

}
      }   
      function checkGameOver(){
        switch(true){
            case(snake[0].x<0):
            case(snake[0].x>=width):
            case(snake[0].y<0):
            case(snake[0].y>=height):
            active=false;
            break;
        }
      }       

