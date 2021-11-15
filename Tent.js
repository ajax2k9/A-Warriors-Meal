class Tent extends Panel{
    constructor(_name,_parent,_x,_y){
        super(_x,_y,2,3,_parent,_name);
        this.name = _name;

        this.capY = 0;
        this.capX = 0;

        const keys = Object.keys(pantry);
        for (const key of keys) {
            if(pantry[key] instanceof Food && pantry[key].hungerPoints > 0){
                this.stacks.push(pantry[key]);   
            }
        }
        this.time = new Timer(30);
       this.input1.AddStackList(this.stacks,true); 

       this.campIcon = createImg("images/campfire.png","campfire");
       this.campIcon.size(32,32);
       this.campIcon.parent(this.box);
       this.campIcon.position(90,110);
       this.campIcon.hide();

       this.fireVisible = false;
    }

    Draw(){
        super.Draw();

        if(player.campfireEffect && this.fireVisible == false){
            this.fireVisible = true;
            this.campIcon.show();
        }

        
        if(!player.campfireEffect && this.fireVisible == true){
            this.fireVisible == false;
            this.campIcon.hide();
        }

        if(selected != this) {
            this.time.currTime = 0;
            
            if(player.resting == true){
                player.resting = false; 
                this.icon.attribute("src","images/tent.png");
            }
            return;
        } 

        if(this.time.Update()){

            if(player.stamina.value < player.stamina.max){
                if(player.hunger.value > 0){
                    if(player.campfireEffect){
                        player.stamina.Add(5);
                    } else {
                        player.stamina.Add(1);
                    }
                    player.hunger.Sub(1); 
                } else {
                    player.stamina.Add(0.5);
                }
            }
        
            if(player.hunger.value > 0 && player.health.value < player.health.max){
                player.health.Add(10);
                player.hunger.Sub(1);
            }     
        
            let food = this.input1.itemStack; 
            if(food instanceof Food && food.quant > 0){
                if(player.hunger.value < player.hunger.max - food.hungerPoints / 2){
                    player.hunger.Add(food.hungerPoints);
                    food.quant--;
                
                }
            }
        }
    }      
}   