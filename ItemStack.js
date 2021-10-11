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
    constructor(_name,_heat,_points = 0){
        super(_name)
        this.input1={};
        this.input2={};
        this.quant_1 = -1;
        this.quant_2 = -1;
        this.Heat = _heat;
        this.hungerPoints = _points;
    }

    SetInput1(_itemStack,_consumed=true,_quant=1){
        this.input1=_itemStack;
        this.consumed_1 = _consumed;
        this.quant_1 = _quant;
    }

    SetInput2(_itemStack,_consumed=true,_quant=1){
        this.input2=_itemStack;
        this.consumed_2 = _consumed;
        this.quant_2 = _quant;
    }

    CheckRecipe(){ 
        if(this.quant_1 == -1 || this.input1.quant < this.quant_1) return false;
        if(this.quant_2 != -1 && this.input2.quant < this.quant_2) return false;
        return true;
    }

    ConsumeInputs(){
        if(this.consumed_1)this.input1.quant-=this.quant_1;
        if(this.quant_2 != -1 && this.consumed_2)this.input2.quant -=this.quant_2;

        this.quant++;
    }
}