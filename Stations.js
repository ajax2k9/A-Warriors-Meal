class CookingRack extends Station{
    constructor(_parent,_x,_y){
        super(["cooking rack","pot","pan","wok"],_parent,_x,_y,1);
        
        this.upgradeReqs = [];
        this.upgradeReqs[0] = [["stone",10],["sand",10]];
        this.upgradeReqs[1] = [["stone",20],["sand",20],["sticks",20]];
        this.upgradeReqs[2] = [["coal",10],["stone",30]];

        this.upgradeButt.SetUnlocks(this.upgradeReqs[0]);

        let r = recipes[this.names[0]];    
        this.stacks = [];
            const keys = Object.keys(r);

            for(const key of keys){
             this.stacks.push(pantry[key]);   
            }

            this.output.AddStackList(this.stacks);
    }

    Upgrade(){
        this.upgradeButt.SetUnlocks(this.upgradeReqs[this.level]);
        super.Upgrade();
    }
}

class Quern extends Station{
    constructor(_parent,_x,_y){
        super("Quern",_parent,_x,_y);

        let stacks = [];

        pantry["seeds"].SetInput1(pantry["wheat"]);
        
        stacks.push(pantry["seeds"]);
        this.output.AddStackList(stacks);
        this.DisplayUnlocks([["wood",20],["stone",10]]);
    }
}

