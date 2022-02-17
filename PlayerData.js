let pantry = {};
let inventory = {};
let pages = [];
let menu = [];
let quests = {};
let selector;
let selected;
let stall;
let customers = [];
let recipes = {};
let units = {};
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
        this.defense = 0;
        this.resting = false;
        this.exp = new Exp(50);
        this.popularity = 0; 
        this.campfireEffect = false;
        this.party = new Party(4);

        this.timer = new Timer(100);
        this.unlocks = [];
    }

    LoadData(_data){
        this.health.Copy(_data.health);
        this.stamina.Copy(_data.stamina);
        this.hunger.Copy(_data.hunger);
        this.resting = _data.resting;
        this.exp.Copy(_data.exp);
        this.unlocks = _data.unlocks;

        for(let i = 0; i < this.unlocks.length; i++){
            pages[i].unlocked = this.unlocks[i];
        }
        selector.ShowButtons();
    }

    Update(){
        if(this.exp.leveledUp){
            this.exp.leveledUp = false;
            
            this.health.max*=1.5;
            this.stamina.max*=1.5;
            
            this.health.value = this.health.max;
            this.stamina.value = this.stamina.max;
        }

        if(this.timer.Update() && this.hunger.value<=0 && this.health.value > 10){
            this.health.Sub(2);    
        }
    }
}

function giveAll100(){
    const keys = Object.keys(pantry);

    for(const key of keys){
        if(key != "null"){
            pantry[key].quant = 100;
        }
    }
}

function give100(_name){
    if(pantry[_name].quant != undefined){
        pantry[_name].quant = 100;
    }
}