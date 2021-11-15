class ReqDisplay{
    constructor(_parent,_x,_y){
        this.box = createElement("unlock");
        this.box.parent(_parent);
        this.box.position(_x,_y);
      //  this.box.class("unlocks");

        this.button = createButton("Locked");
        this.button.style("background-color","red");
        this.button.parent(this.box);
        this.button.position(260,70);
        this.box.hide();
    }

    DisplayUnlocks(_unlockList){
        let posY,posX= 15;
        const keys = Object.keys(_unlockList);

        for (const key of keys) {
            let e = createP(_unlockList[key]+"x" + GetImage(key));
            e.parent(this.box);
            e.class("infotext");
            e.style("padding-right","10px");
        }
    }
}


class Station{
    constructor(_name,_parent,_x,_y){
        this.time = new Timer(100);
        this.unlocked = true;
         
        this.box = createElement("box");
        this.box.parent(_parent);
        this.box.class("box");
        let x2 = _x + 2;
        let y2 = _y + 1;

        this.box.style("grid-row",_y + " / "+ y2);
        this.box.style("grid-column",_x+ " / " + x2);

        this.box.mousePressed(()=>{
            if(!this.unlocked){
                this.Purchase();
                return;
            }

            if(selected != undefined){
                selected.Ui.removeClass("selected");
            }
            selected = this;
            selected.Ui=this.box;
            selected.Ui.addClass("selected");
        });


        //content box
        this.content = createElement("content");
        this.content.parent(this.box);
        this.content.class("content");
                
        this.SetTitle(_name);
      

        //input1
        this.input1 = new EmptyStackElement(this.content);
        this.input1.bkgd.addClass("bot_left");

        this.stacks =[];
        
        this.progBar = new ProgBar(this.processTime,this.content);
        this.progBar.bkgd.addClass("stationProg");

        //input2
        this.input2 = new EmptyStackElement(this.input1.bkgd,44,0);
        
        //output
        this.output = new EmptyStackElement(this.content);
        this.output.bkgd.addClass("bot_right");
        this.output_n1 = undefined;
      
        this.unlocks = {};
        this.reqDisplay = new ReqDisplay(this.box,20,0,this);
    }

    SetTitle(_title){
        this.title = createP(_title);
        this.title.parent(this.content);
        this.title.class("title")
    }
       
    AddUnlock(_is,_quant){
        this.unlocks[_is.name] = _quant;
        this.unlocked = false;
        this.content.hide();
        this.reqDisplay.box.show();
        this.reqDisplay.box.style("display","flex");
    }


    CheckReqs(){
        const keys = Object.keys(this.unlocks);
        for (const key of keys) {
            if(inventory[key] == undefined || this.unlocks[key] > inventory[key].quant){
                this.reqDisplay.button.style("background-color","red");
                this.reqDisplay.button.html("Locked");
                return false;
            }
        }
        this.reqDisplay.button.style("background-color","green");
        this.reqDisplay.button.html("Unlock");
        return true;
    }

    Purchase(){
        if(!this.CheckReqs()) return;    

        const keys = Object.keys(this.unlocks);
        for (const key of keys) {
            inventory[key].quant -= this.unlocks[key];
        }
        this.unlocked = true;
        this.reqDisplay.box.hide();
        this.content.show();

    }
    

    UpdateInputs(){
        let is = this.output.itemStack;
            
        if(is.input1.quant != undefined){
            this.input1.ChangeItemstack(is.input1);
        }

        if(is.input2.quant != undefined){
            this.input2.ChangeItemstack(is.input2);
        }
    }

    Draw(_heat){
        if(this.unlocked == false){
            this.CheckReqs();    
            return;
        }

        if(this.output.changed){
            this.UpdateInputs();
            this.output.changed = false;
        }
        
        this.progBar.Draw(this.time.currTime,this.time.maxTime);
        this.input1.Draw();
        this.input2.Draw();
        this.output.Draw();

        if(selected != this)return;

        if(this.output.itemStack.name == "null" || _heat < this.output.itemStack.Heat || player.stamina.value <= 0){
            this.time.currTime = 0;
        } else if(this.output.itemStack.CheckRecipe()) {
           if(this.time.Update()) {
                this.output.itemStack.ConsumeInputs();
                player.stamina.Sub(0.1);
                player.exp.Add(1);
            }
        }
    }
}