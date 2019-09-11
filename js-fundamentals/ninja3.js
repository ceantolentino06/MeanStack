class Ninja{
    constructor(name){
        this.name = name;
        this.health = 100;
        this.speed = 3;
        this.strength = 3;
    }

    sayName(){
        console.log(this.name)
    }

    showStats(){
        return `Name: ${ this.name }, Health: ${ this.health }, Speed: ${ this.speed }, Strength: ${ this.strength }`;
    }

    drinkSake(){
        this.health+=10;
        return this
    }
}

class Sensei extends Ninja{
    constructor(name){
        super(name);
        this.health = 200;
        this.speed = 10;
        this.strength = 10;
    }

    speakWisdom(){
        console.log("What one programmer can do in one month, two programmers can do in two months.");
        super.drinkSake();
        return this;
    }
}

const ninja1 = new Ninja("Cean");
ninja1.drinkSake();
console.log(ninja1.showStats())

const sensei1 = new Sensei("Howard")
sensei1.speakWisdom().speakWisdom();
console.log(sensei1.showStats())