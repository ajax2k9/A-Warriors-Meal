class Stat{
    constructor(_val){
     this.min = 0;
     this.max = _val;
     this.value = _val;
     } 
    
    Add(_delta){
     this.value += _delta;
     this.Limit();
    }
 
    Sub(_delta){
     this.value -= _delta;
     this.Limit();
    }

    Copy(_data){
        this.min = _data.min;
        this.max = _data.max;
        this.value = _data.value;
    }
 
    Limit(){
        this.value = Math.max(this.min,Math.min(this.max,this.value));
    }
 }

 class Unit {
     constructor(_name,_health,_def,_attack,_dmg){
        this.h = new Stat(_health);
        this.def = _def;
        this.atk = _attack;
        this.dmg = _dmg;
        this.name = _name;
        this.alive = true;
     }

     Attack(_p2Unit){
         let attackChance = Math.min(1,this.atk/_p2Unit.def);

         if(Math.random() < attackChance){
             let dmg = this.dmg* Math.max(0.5,Math.random())
            _p2Unit.TakeDamage(dmg);

            return dmg;
         }

         return 0;
     }

     TakeDamage(_dmg){
         this.h.Sub(_dmg);
         this.alive = this.h.value > 0;
     }
 }

class Party{
    constructor(_maxSize = 4){
        this.units = [];
        this.health =new Stat(100);
        this.maxSize = _maxSize;
        this.count = 0;
    }

    AddUnit(_unit){
        this.units.push(new Unit(_unit.name,_unit.h.value,_unit.def,_unit.atk,_unit.dmg));
        this.UpdateStats();
        partyInfo.LoadTable();
    }

    DeleteUnit(_index){
        this.units.splice(_index,1);
        this.UpdateStats();
        partyInfo.LoadTable();
    }

    UpdateStats(){
        this.health.value = 0;
        
        if(this.units.length > 0) {
            for(let i = this.units.length-1; i>=0; i--){
                if(this.units[i].alive == false){
                    this.units.splice(i,1);
                }
            }
        }
        this.count = this.units.length;
        
        this.units.forEach(e=>{
            this.health.value += e.h.value;
            if(this.health.value > this.health.max){
                this.health.max = this.health.value;
            }
        });
    }
}

function PickNumber(_number){
    return Math.floor(Math.random()* _number);
}

class Timer{
    constructor(_maxTime){
        this.currTime = 0;
        this.maxTime = _maxTime;
    }

    Update(_delta = 0.1,_reset = true){
        if(this.currTime > this.maxTime){
            
            if(_reset){this.currTime = 0;}
            return true
        } else {
            this.currTime += _delta;
        }
    }

    Reset(){
        this.currTime = 0;
    }

    Set(_time){
        this.currTime = _time;
    }
}

