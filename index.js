const canvas = document.getElementById("target")
const c = canvas.getContext("2d")

canvas.width = 700
canvas.height = window.innerHeight
    //Objects 
const gameObjectStorage = [];
const carStorage = [];
const logStorage = [];
var list_frog = [];

const frog_size_x = 50
const frog_size_y = canvas.height / 14

var range_color = ['rgb(2, 71, 181)',
    'rgb(193, 253, 111)',
    'rgb(172, 127, 203)',
    'rgb(203, 53, 175)',
    'rgb(226, 45, 44)'
]

var temp= -1
var direction= -1

// for (let i = 0; i < 5; i++) {
      
//     carStorage.push(
//         new Car(
//             (Math.random() > 0.5 ? -100 : canvas.width), // x coord  
//             canvas.height - (i + 2) * frog_size_y, // y coord
//             1 + Math.random() * 3,
//             frog_size_x * (1 + Math.random() * 3), //size x
//             frog_size_y
           
//         ) // size y
//     );
// }
var speed=0.3
carStorage.push(
    new Car(canvas.width-frog_size_x ,canvas.height -2 * frog_size_y, -speed*2,frog_size_x,frog_size_y),
    new Car(canvas.width+2*frog_size_x ,canvas.height -2 * frog_size_y, -speed*2,frog_size_x,frog_size_y),
    new Car(canvas.width+7*frog_size_x ,canvas.height -2 * frog_size_y, -speed*2,frog_size_x,frog_size_y),

    new Car(canvas.width/2 ,canvas.height -3 * frog_size_y, speed*2,frog_size_x*2,frog_size_y),
    new Car(2*frog_size_x ,canvas.height -3 * frog_size_y, speed*2,frog_size_x*2,frog_size_y),
    new Car(-4*frog_size_x ,canvas.height -3 * frog_size_y,speed*2,frog_size_x*2,frog_size_y),


    new Car(canvas.width-3*frog_size_x ,canvas.height -4 * frog_size_y, -speed*4,frog_size_x,frog_size_y),
    new Car(canvas.width ,canvas.height -4 * frog_size_y, -speed*4,frog_size_x,frog_size_y),
    new Car(canvas.width+4*frog_size_x ,canvas.height -4 * frog_size_y, -speed*4,frog_size_x,frog_size_y),

    new Car(canvas.width/2 ,canvas.height -5 * frog_size_y, speed*5,frog_size_x,frog_size_y),
    new Car(frog_size_x*2 ,canvas.height -5 * frog_size_y, speed*5,frog_size_x,frog_size_y),
    new Car(-2*frog_size_x ,canvas.height -5 * frog_size_y,speed*5,frog_size_x,frog_size_y),

    new Car(canvas.width/2 - frog_size_x ,canvas.height -6 * frog_size_y, -speed*6,frog_size_x*3,frog_size_y),
    new Car(-2*frog_size_x ,canvas.height -6 * frog_size_y, -speed*6,frog_size_x*3,frog_size_y),
   
)

// for (let i = 0; i < 5; i++) {
//     logStorage.push(
//         new Log((Math.random() > 0.5 ? -100 : canvas.width), // x coord
//             canvas.height/2 - (i + 1) * frog_size_y, // y coord
//             // (Math.random() * 10) * (Math.random() > 0.5 ? 1 : -1), // x speed
//             1 + Math.random() * 3,
//             frog_size_x *3, //size x
//             frog_size_y
//         ) // size y
//     );
// }
logStorage.push(
    new Log(canvas.width-6*frog_size_x , canvas.height/2 - frog_size_y , -speed*2,frog_size_x*5,frog_size_y),
    // new Log(canvas.width , canvas.height/2 - frog_size_y, -speed*2,frog_size_x*3,frog_size_y),

  
    // new Log(canvas.width , canvas.height/2 - frog_size_y, -speed*2,frog_size_x*3,frog_size_y),

    new Log(canvas.width-0*frog_size_x , canvas.height/2 - 2*frog_size_y , speed*2,frog_size_x*5,frog_size_y),
    // new Log(canvas.width , canvas.height/2 - 2*frog_size_y, -speed*2,frog_size_x*3,frog_size_y),

    new Log(canvas.width-3*frog_size_x , canvas.height/2 - 3*frog_size_y , -speed*2,frog_size_x*5,frog_size_y),
    // new Log(canvas.width , canvas.height/2 - 3*frog_size_y, -speed*2,frog_size_x*3,frog_size_y),

    new Log(frog_size_x*2 , canvas.height/2 - 4*frog_size_y , speed*2,frog_size_x*5,frog_size_y),
    // new Log(canvas.width , canvas.height/2 - 4*frog_size_y, -speed*2,frog_size_x*3,frog_size_y),
   
    new Log(-2*frog_size_x , canvas.height/2 - 5*frog_size_y, -speed*6,frog_size_x*5,frog_size_y),
    // new Log(canvas.width , canvas.height/2 - 5*frog_size_y, -speed*2,frog_size_x*3,frog_size_y),
   

   
   
)



const water = new Background(0, 0, canvas.width, canvas.height / 2, 'blue')
gameObjectStorage.push(water)

const grass = new Background(0, 0, canvas.width, frog_size_y - 20, 'green')
for (let i = 0; i < 6; i++) {
    const rectangle = new Rectangle(frog_size_x * 2.7 * i,
        0,
        (frog_size_x) - 20,
        frog_size_y * 2,
        'green')
    gameObjectStorage.push(rectangle)
}
const safe_zone = new Background(0, canvas.height / 2, canvas.width, frog_size_y, 'black')
const start_local = new Background(0, canvas.height - frog_size_y, canvas.width, frog_size_y, 'black')
var frog = new Frog(Math.floor(Math.random() * 14) * frog_size_x,
    canvas.height - frog_size_y,
    frog_size_x,
    frog_size_y,
    './img/frog.png')

gameObjectStorage.push(grass)
gameObjectStorage.push(start_local)
gameObjectStorage.push(safe_zone)

// gameObjectStorage.push(frog)

var live = 2

// function updateCar() {
//     // clear the canvas
//     console.log("update screen called");
//     c.clearRect(0, 0, canvas.width, canvas.height);



//     frog.draw();

//     window.requestAnimationFrame(updateCar);
// }


function updateScreen() {
    

    c.clearRect(0, 0, canvas.width, canvas.height);


   
    for (let i = 0; i < gameObjectStorage.length; i++) {
        setTimeout(gameObjectStorage[i].update(), 2000);
        gameObjectStorage[i].update()
        gameObjectStorage[i].draw();

    }
    
   
  
    for (let i = 0; i < logStorage.length; i++) {
        logStorage[i].update();
      
        logStorage[i].draw();
       
    }
    frog.update()
    frog.draw()
    for(let i = 0 ;i <list_frog.length;i++)
    {
        list_frog[i].draw()
    }
   
  
    for (let i = 0; i < carStorage.length; i++) {
        carStorage[i].update();
        carStorage[i].draw();
       
    }
    if(list_frog.length == 5 )
    {
        c.font = "50px Georgia"
        c.fillStyle="white"
        c.fillText("You win ! Your score:" + score, 20, canvas.height / 2 - 10)
        c.fillText("Press any button to continue", 20, canvas.height /2 +frog_size_y -10)
       
        window.cancelAnimationFrame(updateScreen)
        PressAnyKey()
       
    }
    
    if (live < 0 ) {
        c.font = "50px Georgia"
        c.fillStyle="white"
        c.fillText("You die !!!", canvas.width / 4, canvas.height / 2 - 10)
        c.fillText("Press any button to continue", 20, canvas.height /2 +frog_size_y -10)
        console.log("Live <0")
        window.cancelAnimationFrame(updateScreen)
        PressAnyKey()


    }
    

    if( live >= 0 && list_frog.length <5) {
        c.font = "50px Georgia red"
        c.fillStyle="white"
        c.fillText("Your live: " + live + "    Your score: " + score, 20, canvas.height / 2 - 10)

        window.requestAnimationFrame(updateScreen);
    }
    

}
// const list_image= ['./img/frog.png','/img/frog.png']


// const froggerSheet = new Image();
// froggerSheet.onload = () => {
//   updateScreen()
// }
// froggerSheet.src = './img/frog.png';

updateScreen()
function PressAnyKey() {
    window.addEventListener('keydown', function(e) {

        if (e) {
            location.reload()
                // frog.x = canvas.width / 2
                // frog.y = canvas.height - frog_size_y
                // window.requestAnimationFrame(updateScreen);
        }
    })
}
if (live > 0) {
    Move()
}

function Move() {
    window.addEventListener('keydown', function(event) {

        {
           
            switch (event.code) {
                case "ArrowLeft":
                    frog.moveLeft();

                    break;
                case "ArrowUp":
                    frog.moveUp();
                    break;
                case "ArrowRight":
                    frog.moveRight();
                    break;
                case "ArrowDown":
                    frog.moveDown();
                    break;

            }
        }
    });
}
