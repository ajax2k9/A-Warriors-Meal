class MillPage extends Page{
    constructor(){
        super("Mill");

        let flour = new food("flour",5,3);
        flour.AddIngredient("grain",1,true);
        this.AddElement(flour);
        
        let wheat2 = new food("grain",10,this,2);
        wheat2.AddIngredient("wheat",1,true);
        this.AddElement(wheat2);

        let wheat3 = new food("Wheat_Seeds",10,this,2);
        wheat3.name = "Wheat Seeds";
        wheat3.AddIngredient("wheat",1,true);
        wheat3.quant = 10;
        this.AddElement(wheat3);

        
    }
}