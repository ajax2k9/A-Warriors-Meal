let successfulTrades = 0;
class Customer{
    constructor(name){
        this.likes = [];
        this.trade = {};
        this.name = name;
        this.level = 1;
    }

    AddTrade(_give,_quantExchange,_take,_quant){
 
        this.trade  = {"take":_take,"quant":_quant,"give":_give,"giveQuant":_quantExchange};
    }

    TakeItems(_slots,_emptyStack = false){
        if(this.trade.take == undefined){return;}
    
        let found = false;
        
        _slots.forEach(e=>{
            if(!found && e.itemStack.name == this.trade.take && e.itemStack.quant >= this.trade.quant){
                found = true;
                if(_emptyStack){
                    e.EmptyItemstack();
                }
            }
        });

        if(!found) return false;

        this.level = pantry[this.trade.take].level + 1;
        pantry[this.trade.take].quant-=this.trade.quant;
        
         player.popularity++;
         return true;
    }

    
    PerformTrade(_slots){

       if(!this.TakeItems(_slots)) return "";

        successfulTrades++;
         if(successfulTrades >=5 && !msgBoard.unlocked){
            selector.UnlockPage(3);
         } 
         
        storage.UpdateInventory(this.trade.give, this.level * this.trade.giveQuant);

        return "A "+this.name + " traded " + (this.trade.giveQuant * this.level) +"x"+ GetImage(this.trade.give) + "for"+this.trade.quant +"x"+GetImage(this.trade.take); 
    }

    PerformOffer(_slots){

        if(!this.TakeItems(_slots,true)) return "";

        player.party.AddUnit(units[this.name]);
        return "A "+this.name + " has joined your party for"+this.trade.quant +"x"+GetImage(this.trade.take);
    }
}

function AddCustomers(_cust){
    customers.push(_cust);
}

