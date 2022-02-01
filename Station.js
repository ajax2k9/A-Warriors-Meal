

class Station{
    constructor(_names,_parent,_x,_y){
        this.time = new Timer(50);
        this.unlocked = true;
        this.unlocks = {};
        this.names = _names;
        this.box = createElement("box");
        this.box.parent(_parent);
        this.box.class("box");
        let x2 = _x + 2;
        let y2 = _y + 1;
        this.level = 1;
        this.maxlevel = 1;

        this.box.style("grid-row",_y + " / "+ y2);
        this.box.style("grid-column",_x+ " / " + x2);

        this.box.mousePressed(()=>{
            if(!this.unlocked){
                if(this.reqDisplay.Purchase()){
                    this.unlocked = true;
                    this.content.show();
                }
            }

            if(selected != undefined){
                selected.Ui.removeClass("selected");
            }
            selected = this;
            selected.Ui=this.box;
            selected.Ui.addClass("selected");
        });

        this.inputs = [];

        //content box
        this.content = createElement("content");
        this.content.parent(this.box);
        this.content.class("content");

        this.stacks =[];
                
        this.SetTitle(this.names[0]);
        
        this.recipes = [];
        this.recipe = {};

        //inputs 
        let input1 = new EmptyStackElement(this.content);
        input1.bkgd.addClass("bot_left");
        this.inputs.push(input1);
        
        for (let i = 1; i < 9; i++) {
            let input = new EmptyStackElement(input1.bkgd,44*i,0);
            input.hide();
            this.inputs.push(input);
        }

    
        //prog bar
        this.progBar = new ProgBar(this.processTime,this.content);
        this.progBar.bkgd.addClass("stationProg");


        this.UpdateSlots(1);

        //output
        this.output = new EmptyStackElement(this.content);
        this.output.bkgd.addClass("bot_right");
        this.output_n1 = undefined;
        this.upgradeButt = new UpgradeButton(this.content,this);

        this.leftArrow = createImg("images/left.png","left");
        this.leftArrow.parent(this.content);
        this.leftArrow.position(190,14);
        this.leftArrow.size(10,15);
        this.leftArrow.hide();

        this.rightArrow = createImg("images/right.png","right");
        this.rightArrow.parent(this.content);
        this.rightArrow.position(360,14);
        this.rightArrow.size(10,15);
        this.rightArrow.hide();

        
        this.leftArrow.mousePressed(()=>{
            this.level--;
            this.level = max(1,this.level);
            if(this.level <=this.maxlevel ){
                this.rightArrow.show();
            }
            if(this.level <= 1){
                this.leftArrow.hide();
            }

            this.UpdateStation(this.level);
        });

        this.rightArrow.mousePressed(()=>{
            this.level++;
            this.level = min(this.maxlevel,this.level);
            
            if(this.level >= this.maxlevel){
                this.rightArrow.hide();
            }
            if(this.level > 1){
                this.leftArrow.show();
            }

            this.UpdateStation(this.level);
        });

        this.UpdateStation(1);
        
    }

    DisplayUnlocks(_unlocks){
        this.reqDisplay = new ReqDisplay(this.box,4,4);
        this.reqDisplay.DisplayUnlocks(_unlocks);
        this.unlocked = false;
        this.content.hide();
    }

    Upgrade(){
        this.maxlevel++;
        this.rightArrow.show();
        if(this.maxlevel >3){
            this.upgradeButt.box.hide();
        }
    }

    UpdateSlots(_slots){
        for(let i=0;i<_slots; i++){
            this.inputs[i].show();
        }
        for(let i=_slots; i<9; i++){
            this.inputs[i].hide();
        }

        this.progBar.bkgd.style("left",14+ 44 * _slots + "px");
        this.progBar.SetSize(484 - 44 * _slots - 1,4);

    }

    UpdateRecipe(_recipe){
        
        let slots = _recipe.ingredients.length;
        this.UpdateSlots(slots);
        
        for(let i=0;i<slots; i++){
            this.inputs[i].ChangeItemstack(pantry[_recipe.ingredients[i][0]]);
        }

        this.recipe = _recipe;
    }

    UpdateStation(_lvl){
        if(this.names.length > 0){
            this.SetTitle(this.names[_lvl-1]);
        
            this.recipes = recipes[this.names[_lvl-1]];    
            this.stacks = [];
        
            const keys = Object.keys(this.recipes);
            for(const key of keys){
             this.stacks.push(pantry[key]);   
            }
            this.output.AddStackList(this.stacks);
        }
    }

    SetTitle(_title){
        if(this.title == undefined){
            this.title = createP(_title);
            this.title.parent(this.content);
            this.title.class("title");
        } else {
            this.title.html(_title);
        }
    }

    CheckRecipe(){
        let reqsMet = true;
        this.recipe.ingredients.forEach(e=>{
           
            if(pantry[e[0]].quant == undefined || pantry[e[0]].quant < e[1]){
                reqsMet = false;
            }
        });
       
        return reqsMet;
    }

    ConsumeInputs(){
        this.recipe.ingredients.forEach(e=>{
            pantry[e[0]].quant -= e[1];
        });

        pantry[this.recipe.name].quant += 1
    }
    

    Draw(_heat){
        if(this.unlocked == false){   
            this.reqDisplay.CheckReqs(); 
            return;
        }

        if(this.output.changed){
            this.UpdateRecipe(this.recipes[this.output.itemStack.name]);
            this.output.changed = false;
        }
        
        this.progBar.Draw(this.time.currTime,this.time.maxTime);
        this.inputs.forEach(e=>{e.Draw();});
        this.output.Draw();

       // if(selected != this)return;

        if(this.recipe.ingredients == undefined || _heat < this.recipe.heat){
            this.time.currTime = 0;
        } else if(this.CheckRecipe() == true) {
           if(this.time.Update()) {
                this.ConsumeInputs();
            }
        }
    }
}