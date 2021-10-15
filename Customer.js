let successfulTrades = 0;

class Customer{
    constructor(name){
        this.likes = [];
        this.trades = [];
        this.name = name;
    }

    AddLike(_ingredient){
        this.likes.push(_ingredient);
    }

    AddTrade(_item,_quant){
 
        this.trades.push({"item":_item,"quant":_quant});
    }

    AttachSlots(_slots){
        this.slots = _slots;
    }

    PerformTrade(){
        if(this.slots == undefined || this.slots.length <= 0) return "";
        let tradeMsg = "";

        let rand = Math.floor(Math.random() * this.likes.length);
        let choice = this.likes[rand];
        let found = false;
        this.slots.forEach(e=>{
            if(!found && e.itemStack.name == choice.name && e.itemStack.quant >choice.reqQuant){
                found = true;
            }
        });

        if(!found) return "";
    
        rand = Math.floor(Math.random() * this.trades.length);
        let trade = this.trades[rand] ;
        let level = pantry[choice.name].level + 1;
        
         storage.UpdateInventory(trade.item, level * trade.quant);
         pantry[choice.name].quant-=choice.reqQuant;
         successfulTrades++;
         player.popularity++;

         if(successfulTrades >5 && !msgBoard.unlocked){
            selector.UnlockPage(3);
         } 

        tradeMsg = "A "+this.name+ " traded " + (trade.quant * level) +"x"+ GetImage(trade.item.name) + "for"+choice.reqQuant +"x"+GetImage(choice.name);
        return tradeMsg;
    }
}



function AddCustomers(_cust){
    customers.push(_cust);
}

function UpdateCustomers(_slots){
    customers.forEach(Element=>{
        Element.AttachSlots(_slots);
    });
}


let maxCustomerTime = 20;
let customerTime = 0;
let displayTime = 0;
let maxDisplayTime = 40;

function PerformTrades(_stall){
    if(customerTime < maxCustomerTime){
        customerTime+=0.1;
      } else {
        
        if(customers.length > 0){
          let custIndx = Math.floor(Math.random() * customers.length);
          _stall.reel.html(customers[custIndx].PerformTrade());
        }
    
        customerTime = 0;
        displayTime = 0;
      }
    
    if(_stall.active){
      if(displayTime < maxDisplayTime){
        displayTime+=0.1;
      } else {
        _stall.reel.html("");
        displayTime = 0;
      }
    }
}