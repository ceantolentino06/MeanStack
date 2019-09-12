class Bike {
    price: number;
    max_speed: number;
    miles: number;
    constructor(price: number, max_speed: number) {
        this.price = price;
        this.max_speed = max_speed;
        this.miles = 0;
    }

    displayInfo(){
        return `Price: ${this.price}, Maximum speed: ${this.max_speed}, Total miles: ${this.miles}`;
    }

    ride(){
        console.log("Riding..");
        this.miles+=10;
        return this;
    }

    reverse(){
        if(this.miles>0){
            console.log("Reversing..");
            this.miles-=5;
            return this;
        }else{
            console.log("Cannot reverse..")
            return this;
        }
    }

}

const bike1 = new Bike(600, 80);
const bike2 = new Bike(800, 90);
const bike3 = new Bike(900, 100);

bike1.ride().ride().ride().reverse()
bike2.ride().ride().reverse().reverse()
bike3.reverse().reverse().reverse();
console.log(bike1.displayInfo())
console.log(bike2.displayInfo())
console.log(bike3.displayInfo())