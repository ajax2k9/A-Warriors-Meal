class Storage extends Page{
    constructor(){
        super("Storage");
        
        this.box = createElement("info");
        this.box.class("box");
        this.box.parent(this.page);
        this.box.position(10,0);
        this.box.size(940,265);

        this.label = createP("Storage");
        this.label.parent(this.box);
        this.label.position(0,-10);
        this.label.style("text-align","center");
        this.label.size(940,20);

        this.info = createElement("Storage_info");
        this.info.parent(this.box);
        this.info.position(0,30);
        this.info.size(200,200);
        this.unlocked =true;

        this.CreateStacks();
        this.DisplayInventory();
    }

    CreateStacks(){
        this.stacks = [];
        let _x = 0;
        let _y = 0;
        let _xOffs = 10;
        let _yOffs = 40;
        let spacing = 44;
        let max_stacks = 100;

        for(let i = 0; i<max_stacks; i++){
           this.stacks.push (new EmptyStackElement(this.box,_x*spacing + _xOffs,_y *spacing + _yOffs));
            _x++;
            if(_x > 20){
                _y++;
                _x=0;
            }
        }
    }

    Draw(){
        this.stacks.forEach(e=>{
            e.Draw();
        })
        
    }

    UpdateInventory(_is,_quant){
        if(inventory[_is.name] == undefined){
            inventory[_is.name] = _is;
            inventory[_is.name].quant =_quant;
            this.DisplayInventory();
        } else {
            inventory[_is.name].quant += _quant;
        }
    }

    DisplayInventory(){
        const keys = Object.keys(inventory);
        let index = 0;
        for (const key of keys) {
            if(key != "null"){
                this.stacks[index].ChangeItemstack(inventory[key]);
                index++;
            }
        }
    }
}