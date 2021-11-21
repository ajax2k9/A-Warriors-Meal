class Campfire extends Panel{
    constructor(_name,_parent,_x,_y){
        super(_x,_y,2,3,_parent,_name);
        
        this.name = _name;
        this.loadTime = new Timer(10);
        this.maxTemp=100;
        this.temp= 0;
        this.quant = 0;
    
        const keys = Object.keys(inventory);
        for (const key of keys) {
            if(inventory[key] instanceof Fuel){
                this.stacks.push(inventory[key]);
            }
        }
        this.input1.AddStackList(this.stacks);
        this.tempBar = new TempBar(100,this.box);
        this.buffer = new EmptyStackElement(this.box);
        this.buffer.bkgd.addClass("bot_right");

        this.loadBar = new ProgBar(this.loadingTime,this.box);
        this.loadBar.pbar.style("background-color","green");
        this.loadBar.Position(60,170);
        this.loadBar.SetSize(155,4);
    }

    UpdateBuffer(){
        let is = this.input1.itemStack;
            
        if(is.quant != undefined){
            this.buffer.ChangeItemstack(is);
        }
    }

    Draw(){
        super.Draw();
        this.tempBar.Draw(this.temp);
        this.buffer.DrawCustomQuant(this.quant);
        this.loadBar.Draw(this.loadTime.currTime,this.loadTime.maxTime);

    
        if(selected == this){
            if(this.quant < 10 && inventory[this.input1.itemStack.name].quant > 0 && player.stamina.value > 0){
                if(this.loadTime.Update()){
                    inventory[this.input1.itemStack.name].quant--;
                    this.time.maxTime = this.input1.itemStack.burnTime/(Math.min(Math.max(this.temp/10,1),2));
                    this.quant ++;
                    player.stamina.Sub(1);
                    player.exp.Add(2);
                    this.UpdateBuffer();
                }    
            }
        }

        


        if(this.quant > 0){
            if(!this.time.Update()){
                this.temp += this.input1.itemStack.heat * Math.min(Math.max(this.temp/200,0.001),0.1);
                this.temp = Math.min(this.temp,this.maxTemp);
            } else {
                this.quant--;
            }
        } else {
            this.temp*= 0.999;
            this.temp = Math.max(this.temp,0);
        }

        player.campfireEffect = this.temp > 5;
    }

}