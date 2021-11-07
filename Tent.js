class Tent extends Panel{
    constructor(_name,_parent,_x,_y){
        super(_x,_y,2,3,_parent,_name);
        this.name = _name;
       
        this.capTime = 0;
        this.maxCapTime = 4;
        this.capY = 0;
        this.capX = 0;

        const keys = Object.keys(pantry);
        for (const key of keys) {
            if(pantry[key] instanceof Food && pantry[key].hungerPoints > 0){
                this.stacks.push(pantry[key]);   
            }
        }

       this.input1.AddStackList(this.stacks,true); 
    }

    Draw(){
        super.Draw();
        if(selected != this) {
            this.time = 0;
            
            if(player.resting == true){
                player.resting = false; 
                this.icon.attribute("src","images/tent.png");
            }
            return;
        }

        if(player.resting == false){
            player.resting = true;
            this.icon.attribute("src","images/tent_sleep.png");
        }    
        
        let food = this.input1.itemStack; 
            if(food instanceof Food && food.quant > 0){
                if(player.hunger.value < player.hunger.max - food.hungerPoints / 2){
                    if(UpdateTime(this)){
                    player.hunger.Add(food.hungerPoints);
                    food.quant--;
                }
            }
        }
    }   
}