class Stall extends Page{
    constructor(){
        super("Bench");
        
        this.menuItems = [];
        this.unlocked = true;

        let _y = 40;
        let _x = 30;
        let _spacing = 100;
        
        this.box2 = createElement("info");
        this.box2.class("station");
        this.box2.parent(this.page);
        this.box2.position(10,110);
        this.box2.size(400,150);

        this.label2 = createP("Customer");
        this.label2.parent(this.box2);
        this.label2.position(0,-10);
        this.label2.style("text-align","center");
        this.label2.size(400,20);

        this.box3 = createElement("info");
        this.box3.class("info");
        this.box3.parent(this.box2);
    
        this.reel = createP("");
        this.reel.parent(this.box3);
        this.reel.position(0,0);
        this.reel.class("infotext");

        this.box = createElement("Bench");
        this.box.class("station");
        this.box.parent(this.page);
        this.box.position(10,5);
        this.box.size(400,100);

        this.label = createP("Log Table");
        this.label.parent(this.box);
        this.label.position(150,0);

        this.slot1 = new EmptyStackElement(this.box,_x,_y);
        this.slot2 = new EmptyStackElement(this.box,_x + _spacing * 1,_y);
        this.slot3 = new EmptyStackElement(this.box,_x + _spacing * 2,_y);
        this.slot4 = new EmptyStackElement(this.box,_x + _spacing * 3,_y);

        this.stacks = [];
        this.slots = [];

        this.slots.push(this.slot1);
        this.slots.push(this.slot2);
        this.slots.push(this.slot3);
        this.slots.push(this.slot4);
    }

    DisplayPage(){
        this.page.show();
        this.active = true;
        this.stacks = [];
        const keys = Object.keys(pantry);
        for (const key of keys) {
            if(pantry[key] instanceof Food){
                this.stacks.push(pantry[key]);
            }
        }

        this.stackList1 = new ItemListDisplay(this.stacks,this.slot1);
        this.stackList2 = new ItemListDisplay(this.stacks,this.slot2);
        this.stackList3 = new ItemListDisplay(this.stacks,this.slot3);
        this.stackList4 = new ItemListDisplay(this.stacks,this.slot4);
    }

    Draw(){
       if(!this.stackList1.visible){
        this.slot1.Draw();
       } else {
           this.stackList1.Draw();
       }

       if(!this.stackList2.visible){
        this.slot2.Draw();
       } else {
           this.stackList2.Draw();
       }

       if(!this.stackList3.visible){
        this.slot3.Draw();
       } else {
           this.stackList3.Draw();
       }

       if(!this.stackList4.visible){
        this.slot4.Draw();
       } else {
           this.stackList4.Draw();
       }
    }
}