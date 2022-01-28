class Campfire extends Panel{
    constructor(_parent,_x,_y){
        super(_x,_y,2,3,_parent,"campfire");
        this.names=["campfire","hearth","oven","stove"];
        this.loadTime = new Timer(10);
        this.maxTemp=100;
        this.temp= 0;
        this.quant = 0;
        this.level = 0;
        this.name = this.names[0];
    
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

        this.upgradeButt = new UpgradeButton(this.box,this);
       
        this.upgradeReqs = [];
        this.upgradeReqs[0] = [["stone",10],["sand",10]];
        this.upgradeReqs[1] = [["stone",20],["sand",20],["sticks",20]];
        this.upgradeReqs[2] = [["coal",10],["stone",30]];

        this.upgradeButt.SetUnlocks(this.upgradeReqs[0]);
    }

    Upgrade(){
        if (this.level >= 3){
            return;
        } 

        this.upgradeButt.SetUnlocks(this.upgradeReqs[this.level]);

        this.level++;
        this.SetTitle(this.names[this.level]);
        if(this.level == 3) this.upgradeButt.box.hide();
        
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