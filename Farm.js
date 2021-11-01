class Coop extends Panel{
    constructor(_x,_y,_parent){
        super(_x,_y,2,3,_parent,"coop");
        this.feedTime = new Timer(10);

        this.stacks.push(pantry["sword"]);
        this.stacks.push(pantry["basket"]);
        this.stacks.push(pantry["seeds"]);

        this.input1.AddStackList(this.stacks);
        this.buffer = new ItemStackElement(pantry["chicken"],this.box);
        this.buffer.bkgd.addClass("bot_right");

        this.feedBar = new ProgBar(this.feedTime,this.box);
        this.feedBar.pbar.style("background-color","green");
        this.feedBar.Position(60,170);
        this.feedBar.SetSize(155,4);

        this.operation = "none";
        this.seeds = 0;

    }

    Draw(){
        super.Draw();
        this.feedBar.Draw(this.feedTime.currTime,this.feedTime.maxTime);
        this.buffer.Draw();

        let chicken = this.buffer.itemStack;

        if(selected == this){
            let is = this.input1.itemStack;

            if(this.operation == "none" && player.stamina.value > 0){
                if(is.name == "seeds" && is.quant > 0 && chicken.quant >= 2 && this.feedTime.Update()){
                    is.quant--;
                    this.seeds++;
                    player.stamina.Sub(0.5);

                    if(is.quant <= 0 || this.seeds == chicken.quant){
                        this.operation = "gestation";
                    }
                }
            }
        } 
        
        if(this.operation == "gestation" && UpdateTime(this)){
            chicken.quant+= Math.floor(this.seeds / 2);
            this.seeds = 0;
            this.operation = "none";
            
        }
    }
}


class Farm extends Page{
    constructor(){
        super("Farm");
        this.unlocked = false;
        this.coop = new Coop(1,1,this.page);
    }

    Draw(){
        this.coop.Draw();
    }
}