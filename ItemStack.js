class ItemStack{
    constructor(_name){
        this.name = _name;
        this.quant = 0;
        this.icon = "images/"+_name + ".png";
        this.consumed = true;
        this.level = 0;
        if(pantry[this.name] == undefined){
            pantry[this.name] = this;
        } 
    }
}

class Ingredient{
    constructor(_name,_quant,_consumed){
        this.name = _name;
        this.reqQuant = _quant;
        this.consumed = _consumed;
    }
}

class Fuel extends ItemStack{
    constructor(_name,_burnTime,_heat){
        super(_name);
        this.burnTime = _burnTime;
        this.heat = _heat;
    }
}

class Animal extends ItemStack{
    constructor(_name,_gestationTime){
        super(_name);
        this.gestationTime = _gestationTime;
    }
}

const ToolType = {
    FISHING_ROD : 0,
    SWORD : 1,
    AXE :2,
    FIST : 3
}

class Tool extends ItemStack{
    constructor(_name,_type,_swingTime,_damage){
        super(_name);
        this.type = _type;
        this.swingTime=_swingTime;
        this.damage = _damage;
    }
}
class Food extends ItemStack{
    constructor(_name,_points = 0){
        super(_name)
        this.hungerPoints = _points;
    }
}