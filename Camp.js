class Camp extends Page{
    constructor(){
        super("Camp");
        this.unlocked = true;
        this.station2 = new CookingPot(this.page,1,4);
        this.station = new CookingRack(this.page,1,3);
        this.campfire = new Campfire("Campfire",this.page,1,1);
        this.forage = new Forage("Forage",this.page,2,1);
        this.tent = new Tent("Tent",this.page,3,1);
    
    }

    Draw(){
        this.station.Draw(this.campfire.temp);
        this.station2.Draw(this.campfire.temp);
        this.campfire.Draw();
        this.forage.Draw();
        this.tent.Draw();
    }
}