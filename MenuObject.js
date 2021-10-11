class MenuObject{
    constructor(_food){
        this.food = _food; 
        this.label = createElement(this.food.name + "_menu");
        this.label.size(400,20);
        this.info = createElement("menu_info");
        this.info.parent(this.label);
        this.levelLabel = createElement("menu_level");
        this.levelLabel.parent(this.label);
        this.levelLabel.position(330,0);
        
        this.pbar = new ProgBar(this.food.levelReq,this.label);
        this.pbar.Position(0,20);
    }

    Display(){
        this.levelLabel.html("Level :" + this.food.level);
        this.info.html(this.food.name + " : " + this.food.quant);
        this.pbar.Draw(this.food.points,this.food.levelReq);
        
    }

}