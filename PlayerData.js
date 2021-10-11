let pantry = {};
let inventory = {};
let pages = [];
let menu = [];

let selector;
let selected;
let stall;
let customers = [];
let msgBoard; 
let mainInfo;
let storage;

class Exp extends Stat{
    constructor(_val){
        super(_val);
        this.level = 0;
        this.value = 0;
    } 
    
    Add(_delta){
     this.value += _delta;
     if(this.value > this.max){
        this.level ++;
        this.value = 0;
        this.max*=1.15;   
        this.leveledUp = true; 
     }
    }
 }

class Player{
    constructor(){
        this.health = new Stat(100);
        this.stamina = new Stat(10);
        this.hunger = new Stat(50);
        this.resting = false;
        this.exp = new Exp(50);
        this.popularity = 12;
 
        this.time =0;
        this.processTime = 10;

        this.defence = 0;
        this.campfireEffect = false;

        this.party = new Party(0);
        this.party.AddUnit(new Unit("knight",200,4,2,30));
        this.party.AddUnit(new Unit("Orc",100,200,200,400));
        this.party.AddUnit(new Unit("Monkey",500,4,2,20));

    }

    Update(){
        if(this.exp.leveledUp){
            this.exp.leveledUp = false;
            
            this.health.max*=1.5;
            this.stamina.max*=1.5;
            
            this.health.value = this.health.max;
            this.stamina.value = this.stamina.max;
        }

        if(!UpdateTime(this)) return;

        if(this.resting){
            if(this.stamina.value < this.stamina.max){
                if(this.hunger.value > 0){
                    if(this.campfireEffect){
                        this.stamina.Add(5);
                    } else {
                        this.stamina.Add(1);
                    }

                    this.hunger.Sub(1); 
                } else {
                    this.stamina.Add(0.5);
                }
            }
        
            if(this.hunger.value > 0 && this.health.value < this.health.max){
                this.health.Add(10);
                this.hunger.Sub(1);
            }
        }

        if(this.hunger.value<=0 && this.health.value > 10){
            this.health.Sub(2);    
        }
    }
}