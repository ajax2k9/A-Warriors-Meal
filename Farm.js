class Coop extends Panel{
    constructor(_x,_y,_parent){
        super(_x,_y,2,3,_parent,"coop");
        this.feedTime = new Timer(10);
        this.time = new Timer(30);

        this.stacks.push(pantry["sword"]);
        this.stacks.push(pantry["basket"]);
        this.stacks.push(pantry["wheat_seeds"]);

        this.input1.AddStackList(this.stacks);
        this.buffer = new ItemStackElement(pantry["chicken"],this.content);
        this.buffer.bkgd.addClass("bot_right");

        this.feedBar = new ProgBar(this.feedTime,this.content);
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
                    player.exp.Add(0.5);

                    if(is.quant <= 0 || this.seeds == chicken.quant){
                        this.operation = "gestation";
                    }
                }

                if(is.name == "sword" && player.stamina.value > 0 && chicken.quant > 2 && this.feedTime.Update()){
                    player.stamina.Sub(2);
                    chicken.quant--;
                    player.exp.Add(3);
                    let resQuant = Math.floor(Math.random() * 4) + 1;
                    pantry["chicken_raw"].quant += resQuant;
                    this.particleSystem = new ParticleSystem(true,"chicken_raw",this.box,resQuant,130,100);
                }
            }
        } 
        
        if(this.operation == "gestation" && this.time.Update()){
            chicken.quant += Math.floor(this.seeds / 2);
            this.seeds = 0;
            this.operation = "none";
            this.time.Reset();
            
        }
    }
}

class Ranch extends Panel{
    constructor(_x,_y,_parent){
        super(_x,_y,2,3,_parent,"Ranch");
        this.feedTime = new Timer(10);

        this.stacks.push(pantry["sword"]);
        this.stacks.push(pantry["bucket"]);
        this.stacks.push(pantry["wheat"]);

        this.input1.AddStackList(this.stacks);
        this.buffer = new ItemStackElement(pantry["cow"],this.content);
        this.buffer.bkgd.addClass("bot_right");

        this.feedBar = new ProgBar(this.feedTime,this.content);
        this.feedBar.pbar.style("background-color","green");
        this.feedBar.Position(60,170);
        this.feedBar.SetSize(155,4);

        this.operation = "none";
        this.wheat = 0;
    }

    Draw(){
  super.Draw();
        this.feedBar.Draw(this.feedTime.currTime,this.feedTime.maxTime);
        this.buffer.Draw();

        let cow = this.buffer.itemStack;

        if(selected == this){
            let is = this.input1.itemStack;

            if(this.operation == "none" && player.stamina.value > 0){
                if(is.name == "wheat" && is.quant > 0 && cow.quant >= 2 && this.feedTime.Update()){
                    is.quant--;
                    this.wheat++;
                    player.stamina.Sub(0.5);
                    player.exp.Add(2);

                    if(is.quant <= 0 || this.wheat == cow.quant){
                        this.operation = "gestation";
                    }
                }

                if(is.name == "sword" && player.stamina.value > 0 && cow.quant > 2 && this.feedTime.Update()){
                    player.stamina.Sub(2);
                    player.exp.Add(3);
                    cow.quant--;

                    let resQuant = Math.floor(Math.random() * 4) + 1;
                    pantry["raw_beef"].quant += resQuant;
                    this.particleSystem = new ParticleSystem(true,"raw_beef",this.box,resQuant,130,100);
                }
            }
        } 
        
        if(this.operation == "gestation" && this.time.Update()){
            cow.quant+= Math.floor(this.wheat / 2);
            this.wheat = 0;
            this.operation = "none";
            this.time.Reset();
        }
    }
}

class Field extends Panel{
    constructor(_x,_y,_type,_parent){
        super(_x,_y,2,3,_parent,_type);
        this.sowTime = new Timer(10);
        this.unlocked = true;
        this.stacks.push(pantry[_type + "_seeds"]);
        this.stacks.push(pantry["scythe"]);

        this.input1.AddStackList(this.stacks);
        this.buffer = new ItemStackElement(pantry[_type],this.content);
        this.buffer.bkgd.addClass("bot_right");

        this.feedBar = new ProgBar(this.feedTime,this.content);
        this.feedBar.pbar.style("background-color","green");
        this.feedBar.Position(60,170);
        this.feedBar.SetSize(155,4);

        this.operation = "none";
        this.seeds = 0;
        this.plants = 0;
        this.phase_n1 = 0;
        this.type = _type;
        this.ChangeGrowthStage(0);
        this.DisplayUnlocks([["wood",30],["dirt",25],[_type+"_seeds",2]]);
    }

    ChangeStage(_stage){
        this.icon.attribute("src","images/field - "+ _stage +".png");
    }

    ChangeGrowthStage(_stage){
        this.icon.attribute("src","images/field-grow-"+ _stage +".png");
    }

    Draw(){
  super.Draw();
        this.feedBar.Draw(this.sowTime.currTime,this.sowTime.maxTime);
        this.buffer.Draw();

        if(selected == this){
            if(this.operation == "none"){
                let input = this.input1.itemStack;
                    if( input.name == (this.type +"_seeds") && input.quant > 0){
                        if(this.sowTime.Update()){
                        this.seeds++;
                        input.quant--;

                        player.stamina.Sub(0.5);
                        player.exp.Add(2);

                        let phase = Math.floor(this.seeds / 25 * 3);

                        if(phase != this.phase_n1){
                            this.ChangeGrowthStage(phase);
                            this.phase_n1 = phase;
                        }

                        if(input.quant <= 0 || this.seeds >= 25){
                            this.operation = "growing";
                        }
                    }
                } else {
                    this.sowTime.Reset();
                }
            }

            if(this.operation == "reaping"){
                let input = this.input1.itemStack;
                if(input.name == "scythe"){
                    if(this.time.Update()){
                        this.buffer.itemStack.quant +=this.plants;
                        this.plants = 0;
                        this.operation = "none";
                        this.ChangeGrowthStage(0);
                        this.phase_n1 = 0;
                    }
                }
            }

        } else if(this.seeds > 0){
            this.operation = "growing";
        }

        if(this.operation == "growing"){

            let phase = Math.floor(this.time.currTime / this.time.maxTime * 3);

            if(phase != this.phase_n1){
                this.ChangeStage(phase);
                this.phase_n1 = phase;
            }

            if(this.time.Update()){
                this.plants = this.seeds;
                this.seeds = 0;
                this.operation = "reaping";
            }
        }
    }
}


class Farm extends Page{
    constructor(){
        super("Farm");
        this.unlocked = false;
        this.coop = new Coop(1,1,this.page);
        this.coop.DisplayUnlocks([["bricks",10],["wood",20],["chicken",2]]);
        this.ranch = new Ranch(2,1,this.page);
        this.ranch.DisplayUnlocks([["wheat",10],["wood",20],["cow",2]]);
        this.reqPop = 0;

        let x = 3;
        let y = 1;
        this.fields = [];
        pantry.crops.forEach(e => {
         this.fields.push(new Field(x,y,e,this.page));
         x++;
         if(x>4){
             x = 1;
             y+=2;
         }   
        });
    }

    Draw(){
        this.coop.Draw();
        this.ranch.Draw();
        this.fields.forEach(e=>{e.Draw()});
    }
}