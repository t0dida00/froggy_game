var count =0 
var score = 0
class Background {
    constructor(x, y, width, height, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
    }
    draw() {
        c.beginPath()
        c.rect(this.x, this.y, this.width, this.height, this.color)
        c.fillStyle = this.color
        c.fill()
    }
    update() {
        // /gameObjectStorage[i].x + frog_size_x-20 , gameObjectStorage[i].y + frog_size_y*2
        // if(this.x + frog_size_x - 20, this.y + frog_size_y*2)
        // {

        // }


        if (((this.x + this.w) < frog.x) &&
            (this.x > (frog.x + frog_size_x)) &&
            ((this.y + this.h) < frog.y) &&
            (this.y > (frog.y + frog_size_y))) {
            console.log('Hit');
        }
    }
}

class Frog {
    constructor(x, y, w, h) {
     
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        
        this.color = 'red'
       
    }
    moveUp() {

        if (this.y > this.h * 2) {
            this.y = this.y - this.h;
          
        }
        score= score + 200
        
    }

    moveDown() {
        if (this.y + frog_size_y < canvas.height) {
            this.y = this.y + this.h;
          
        }

    }

    moveLeft() {
        if (this.x > 0) {
            this.x = this.x - this.w;
            
        }

    }

    moveRight() {
        if (this.x + frog_size_x < canvas.width) {
            this.x = this.x + this.w;
            
        }

    }
    draw() {
        c.beginPath()
        c.rect(this.x, this.y, this.w, this.h)
        c.fillStyle = this.color
        c.fill()
 
        
        // c.drawImage(froggerSheet, this.x, this.y,this.w,this.h);
    }
    update() {
     
            if(Math.round(this.y) ==  Math.round(this.h))
            {
                list_frog.push(
                    new Frog(this.x,this.y,frog_size_x,frog_size_y)
                )
                frog.x = canvas.width / 2
                frog.y = canvas.height - frog_size_y
            }
            
   
          
    }

}
class Rectangle {
    constructor(startX, startY, width, height) {
        this.x = startX;
        this.y = startY;
        this.width = width;
        this.height = height;

    }
    update() {
        // collision check, does this collide with frog

        if (((this.x + this.width) > frog.x) &&
            (this.x < (frog.x + frog.w)) &&
            ((this.y + this.height) > frog.y) &&
            (this.y < (frog.y + frog.h))) {

            frog.x = canvas.width / 2
            frog.y = canvas.height - frog_size_y

            live = live - 1

        }

        count = 0
    }

    draw() {
        c.beginPath();
        c.rect(this.x, this.y, this.width, this.height);
        c.fillStyle = 'green';
        c.fill();
        c.lineWidth = 1;
        c.strokeStyle = 'green';
        c.stroke();
    }
}


class Car {
    constructor(startX, startY, speedX, size_x, size_y) {
        this.x = startX;
        this.y = startY + 1;
       
        this.speedX = speedX;
        this.size_x = size_x;
        this.size_y = size_y - 15;
       
        this.color = {
            red: Math.random() * 255,
            green: Math.random() * 255,
            blue: Math.random() * 255
        };
    }

    update() {


        if (((this.x + this.size_x) > frog.x) &&
            (this.x < (frog.x + frog.w)) &&
            ((this.y + this.size_y) > frog.y) &&
            (this.y < (frog.y + frog.h))) {

            console.log("hit")
                // frog.x = frog.x
                // frog.y = frog.y
            frog.x = canvas.width / 2
            frog.y = canvas.height - frog_size_y


            live = live - 1

        }

        
        // if (this.x > canvas.width) {
        //     this.speedX = (Math.random() * 10) * -1;
        //     this.x = canvas.width

        // } else if (this.x < 0) {
        //     this.x = 0 - this.size_x
        // }
        // if (this.x > canvas.width || (this.x <= -100)) {
        //     this.speedX = (Math.random() *4*(1 + list_frog.length) + (1 + list_frog.length/2)) * ( Math.random() > 0.5 ? 1 : -1);
        //     this.size_x=frog_size_x * (Math.random()*3 +1)
           
        //     if (this.speedX < 0) {
        //         this.x = canvas.width
        //     } else {
        //         this.x = -99
        //     }


        // }
        
        // if (this.x > canvas.width || (this.x <= -20)) {
        //     this.x=canvas.width
        // }
       
            if(this.x  + this.speedX <= -100 && this.speedX <0)
            {
                this.x=canvas.width
            }
            if(this.x >canvas.width && this.speedX >0)
            {
                this.x=-100
            }


        this.x = this.x + this.speedX
        
    }

    draw() {


        c.beginPath();
        c.fillStyle = `rgb(${this.color.red}, ${this.color.green}, ${this.color.blue})`;
        c.rect(this.x, this.y, this.size_x, this.size_y);

        c.fill();
   
    }
}

class Log {
    constructor(startX, startY, speedX, size_x, size_y) {
        this.x = startX;
        this.y = startY +1 ;
       this.check=0;
        
        this.speedX = speedX;
        this.size_x = size_x;
        this.size_y = size_y -4 ;
       
        this.color = {
            red: Math.random() * 255,
            green: Math.random() * 255,
            blue: Math.random() * 255
        };
    }

    update() {
   // if (this.x > canvas.width || (this.x <= -100)) {
           
        //     //this.speedX = (Math.random() *4* (1 + list_frog.length) + 3* ( Math.random() > 0.5 ? 1 : -1));
        //     this.speedX= (Math.random() *4 +2) * ( Math.random() > 0.5 ? 1 : -1);
        //     this.size_x=frog_size_x * (Math.random()*2 +2)
           
        //     if (this.speedX < 0) {
        //         this.x = canvas.width
        //     } else {
        //         this.x = -99
        //     }

        // }
        if(this.x + this.speedX <= -300 && this.speedX <0)
        {
            this.x=canvas.width
        }
        if(this.x >canvas.width && this.speedX >0)
        {
            this.x=-100
        }

        this.x = this.x + this.speedX
      
        this.check =0
     
        if (((this.x + this.size_x) > frog.x) &&
        (this.x < (frog.x + frog.w)) &&
        ((this.y + this.size_y) > frog.y) &&
        (this.y < (frog.y + frog.h)))
       {
          
        console.log("carry")
           this.check = 1
            frog.x = frog.x + this.speedX
           count= 1
       
         }

         
       
         else if ((frog.y < canvas.height/2  && this.check==0 && 
            Math.round(frog.y) == Math.round(this.y -1))  ){
                
              
                frog.x = canvas.width / 2 
                frog.y = canvas.height - frog_size_y
               
                live = live - 1
               
          
        }

     
      
     
        

      
    }

    draw() {


        c.beginPath();
        c.fillStyle = `rgb(${this.color.red}, ${this.color.green}, ${this.color.blue})`;
        c.rect(this.x, this.y, this.size_x, this.size_y);

        c.fill();
    }
}


// 