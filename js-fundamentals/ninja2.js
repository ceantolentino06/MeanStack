function Ninja(name){
    this.name = name;
    this.health = 100;
    var speed = 3;
    var strength = 3;

    this.sayName = function(){
        return this.name;
    }

    this.showStats = function(){
        return `Name: ${ this.name }, Health: ${ this.health }, Speed: ${ speed }, Strength: ${ strength }`;
    }

    this.drinkSake = function(){
        this.health+=10;
        return this;
    }

    this.punch = function(enemy){
        if(enemy instanceof Ninja){
            console.log(`${ enemy.name } was punched by ${ this.name } and lost 5 Health!`);
            enemy.health-=5;
        }else{
            console.log(`${ enemy } is not a Ninja!`);
        }
       
    }

    this.kick = function(enemy){
        if(enemy instanceof Ninja){
            console.log(`${ enemy.name } was kicked by ${ this.name } and lost ${ strength*15 } Health!`);
            enemy.health-=(15*strength);
        }else{
            console.log(`${ enemy } is not a Ninja!`);
        }
    }
}

var ninja1 = new Ninja("Cean");
var ninja2 = new Ninja("Howard");
console.log(ninja1.sayName());
console.log(ninja2.sayName());
ninja2.kick(ninja1)
console.log(ninja1.showStats());
console.log(ninja2.showStats());
