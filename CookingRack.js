class CookingRack extends Station{
    constructor(_parent,_x,_y){
        super("Cooking Rack",_parent,_x,_y);
        
        pantry["steak"].SetInput1(pantry["raw_beef"]);
        pantry["chicken_cooked"].SetInput1(pantry["chicken_raw"]);
        pantry["cooked_fish"].SetInput1(pantry["raw_fish"]);
        
        let stacks = [];
        stacks.push(pantry["steak"]);
        stacks.push(pantry["chicken_cooked"]);
        stacks.push(pantry["cooked_fish"]);

        this.output.AddStackList(stacks);
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
