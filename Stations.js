class CookingRack extends Station{
    constructor(_parent,_x,_y){
        super("Cooking Rack",_parent,_x,_y,1);
        
        pantry["steak"].SetInput1(pantry["raw_beef"]);
        pantry["chicken_cooked"].SetInput1(pantry["chicken_raw"]);
        pantry["cooked_fish"].SetInput1(pantry["raw_fish"]);
        
        let stacks = [];
        stacks.push(pantry["steak"]);
        stacks.push(pantry["chicken_cooked"]);
        stacks.push(pantry["cooked_fish"]);

        this.output.AddStackList(stacks);

        this.upgradeReqs = [];

        this.upgradeReqs[0] = [["stone",10],["sand",10]];
        this.upgradeReqs[1] = [["stone",20],["sand",20],["sticks",20]];
        this.upgradeReqs[2] = [["coal",10],["stone",30]];

        this.upgradeButt.SetUnlocks(this.upgradeReqs[0]);
    }

    Upgrade(){
        this.level++;
        
        let input = new EmptyStackElement(this.input1.bkgd,44*this.level,0);
            this.inputs.push(input);

            this.progBar.bkgd.addClass("stationProg");
            this.progBar.bkgd.style("left",14+44 * this.inputs.length + "px");
            this.progBar.bkgd.style("bottom","24px");
            this.progBar.SetSize(484 - 44 * this.inputs.length,4);

            this.upgradeButt.SetUnlocks(this.upgradeReqs[this.level]);

    }
}

class CookingPot extends Station{
    constructor(_parent,_x,_y){
        super("Cooking Pot",_parent,_x,_y);

        let stacks = [];

        pantry["stew"].SetInput1(pantry["carrot"]);
        pantry["stew"].SetInput2(pantry["potato"]);
        
        stacks.push(pantry["stew"]);
        this.output.AddStackList(stacks);

        this.AddUnlock(inventory["sticks"],20);
        this.AddUnlock(inventory["stone"],10);

        this.reqDisplay.DisplayUnlocks(this.unlocks);
    }
}

class Quern extends Station{
    constructor(_parent,_x,_y){
        super("Quern",_parent,_x,_y);

        let stacks = [];

        pantry["seeds"].SetInput1(pantry["wheat"]);
        
        stacks.push(pantry["seeds"]);
        this.output.AddStackList(stacks);

        this.AddUnlock(inventory["wood"],20);
        this.AddUnlock(inventory["stone"],10);

        this.reqDisplay.DisplayUnlocks(this.unlocks);
    }
}

class Oven extends Station{
    constructor(_parent,_x,_y){
        super("Oven",_parent,_x,_y);

        let stacks = [];

        pantry["seeds"].SetInput1(pantry["wheat"]);
        
        stacks.push(pantry["seeds"]);
        this.output.AddStackList(stacks);

        this.AddUnlock(inventory["sand"],20);
        this.AddUnlock(inventory["stone"],10);

        this.reqDisplay.DisplayUnlocks(this.unlocks);
    }
}
