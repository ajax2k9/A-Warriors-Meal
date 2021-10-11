class Forage extends Panel{
    constructor(_name,_parent,_x,_y){
        super(_x,_y,2,3,_parent,_name);

        this.capTime = 0;
        this.maxCapTime = 6;
        this.capY = 0;
        this.capX = 0;
                
        this.stacks.push(pantry["axe"]);
        this.stacks.push(pantry["fishing_pole"]);
        this.stacks.push(pantry["sword"]);
        this.stacks.push(pantry["fist"]);
         
        this.input1.AddStackList(this.stacks);

    }

    GotAttacked(){
        let phrases = [];
        phrases.push("That wasnt a chicken, it was a goose");
        phrases.push("A wolf gave you a hug with it's claws");
        phrases.push("A bear mistaked you for bacon");

        return phrases[Math.floor(Math.random()* phrases.length)];  
    }

    Draw(){ 
        super.Draw();

        let tool = this.input1.itemStack;
        if ( tool instanceof Tool){
            if(this.input1.changed){
                this.time = 0;
                this.processTime = tool.swingTime;
                this.input1.changed = false;
            }

            if(selected == this && player.stamina.value > 0){

                    if(UpdateTime(this)){
                    this.time = 0;
                    let is = {};
                    player.stamina.Sub(1);
                    player.exp.Add(5);

                    let attackChance = Math.max(0,Math.min(25,25-player.defence));
                    attackChance /= 100;
                    
                    if(Math.random() < attackChance){
                        player.health.Sub(Math.random() * 20);
                        return;
                    }

                    switch (tool.type){
                        case ToolType.AXE:
                            is = pantry["wood"];
                            break;
                        case ToolType.FISHING_ROD:
                            is = pantry["raw_fish"];
                            break;
                        case ToolType.FIST:
                            let rand_array = [pantry["berries"],inventory["sticks"],pantry["carrot"],pantry["potato"]];
                            let choice = Math.floor(Math.random() * rand_array.length);
                            is = rand_array[choice];
                            break;
                        default:
                            let rand_array2 = [pantry["raw_beef"],pantry["chicken_raw"]];
                            let choice2 = Math.floor(Math.random() * rand_array2.length);
                            is = rand_array2[choice2];
                            break;
                    }

                    this.quant = Math.floor(Math.random() * 4) + 1;
                    is.quant += this.quant;
            
                }          
            }
        }   
    }
}