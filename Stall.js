let partyInfo = {};
class Bench{
    constructor(_parent,_name,_x,_y){
        this.box = createElement("Basket");
        this.box.class("box");
        this.box.parent(_parent);
        this.box.style("grid-row",_y + " / " + (_y+1));
        this.box.style("grid-column",_x + " / " + (_x+1));

        this.label = createP(_name);
        this.label.parent(this.box);
        this.label.class("title");

        this.slot1 = new EmptyStackElement(this.box);
        this.slot1.bkgd.addClass("bot_left");
        this.slot2 = new EmptyStackElement(this.box);
        this.slot2.bkgd.addClass("bot_right");
        this.slot3 = new EmptyStackElement(this.box);
        this.slot3.bkgd.addClass("top_right");
        this.slot4 = new EmptyStackElement(this.box);
        this.slot4.bkgd.addClass("top_left");
        
        this.stacks = [];
        this.slots = [];

        this.slots.push(this.slot1);
        this.slots.push(this.slot2);
        this.slots.push(this.slot3);
        this.slots.push(this.slot4);
    }

    DisplayPage(_hideZeros = false){
        this.stacks = [];
        
        const keys = Object.keys(pantry);
        for (const key of keys) {
            if(pantry[key] instanceof Food){
                this.stacks.push(pantry[key]);
            }
        }

        this.slot1.AddStackList(this.stacks,_hideZeros);
        this.slot2.AddStackList(this.stacks,_hideZeros);
        this.slot3.AddStackList(this.stacks,_hideZeros);
        this.slot4.AddStackList(this.stacks,_hideZeros);
    }

    Draw(){
        this.slot1.Draw();
        this.slot2.Draw();
        this.slot3.Draw();
        this.slot4.Draw();
    }
}

class Basket extends Bench{
    constructor(_parent,_x,_y){
        super(_parent,"Offering Basket",_x,_y);

        this.partyLabel = createP("1/4");
        this.partyLabel.parent(this.box);
        this.partyLabel.class("title");
        this.partyLabel.position(0,40);
    }

    Draw(){
        super.Draw();

        this.partyLabel.html(player.party.count + "/" + player.party.maxSize);

        this.slots.forEach(element => {
            element.ShowQuant(false);
        });

    }
}


class Stall extends Page{
    constructor(){
        super("Bench");
        
        this.menuItems = [];
        this.unlocked = true;
        this.trade_msg ="";
        let _y = 40;
        let _x = 30;
        
        this.box2 = createElement("info");
        this.box2.class("box");
        this.box2.parent(this.page);
        this.box2.style("grid-row","2 / 4");
        this.box2.style("grid-column","1 / 3");
        
        this.label2 = createP("Customer");
        this.label2.parent(this.box2);
        this.label2.class("title");
        
        this.box3 = createElement("info");
        this.box3.class("info");
        this.box3.parent(this.box2);
    
        this.reel = createP("");
        this.reel.parent(this.box3);
        this.reel.position(0,0);
        this.reel.class("infotext");

        this.displayTime = new Timer(10);
        this.offerTime = new Timer(30);
        this.customerTime = new Timer(30);
        this.offerTime.Set(15);
        this.basket = new Basket(this.page,2,1);
        this.bench = new Bench(this.page,"Oak Bench",1,1);
   }

    DisplayPage(){
        super.DisplayPage();
        this.basket.DisplayPage(true);
        this.bench.DisplayPage();
        
    }

    
 PerformTrades(){
    if(customers.length > 0 && this.bench.slots != undefined){
        
        if(this.customerTime.Update()) {        
            let tries = 10;
            while(this.trade_msg == "" && tries > 0){
                let custIndx = Math.floor(Math.random() * customers.length);  
                this.trade_msg = customers[custIndx].PerformTrade(this.bench.slots);    
                tries--;
            }

            if(this.trade_msg != ""){
                this.reel.html(this.trade_msg);
                this.displayTime.Reset();
            }

        } else {
           
            this.trade_msg = "";
        }
      }
}

 PerformOffers(){
    if(customers.length > 0 && this.basket.slots != undefined){

    if(this.offerTime.Update() && player.party.count < player.party.maxSize) {
            let tries = 10;
            while(this.trade_msg == "" && tries > 0){
                let custIndx = Math.floor(Math.random() * customers.length);
                this.trade_msg = customers[custIndx].PerformOffer(this.basket.slots)
                tries--;
            }

            if(this.trade_msg != ""){
                this.reel.html(this.trade_msg);
                this.displayTime.Reset();
            }

        } else {
            this.trade_msg = "";
        }
    }
}

    Draw(){
        this.basket.Draw();
        this.bench.Draw();
        this.PerformTrades(this.bench,this.reel);
        
        this.PerformOffers(this.basket,this.reel);

        if(this.displayTime.Update()){
            this.reel.html("");
        }
    }
}