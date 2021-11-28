class Camp extends Page{
    constructor(){
        super("Camp");
        this.unlocked = true;
        this.station4 = new CookingRack(this.page,1,6);
        this.station3 = new CookingRack(this.page,1,5);
        this.station2 = new CookingRack(this.page,1,4);
        this.station = new CookingRack(this.page,1,3);
        this.campfire = new Campfire("Campfire",this.page,1,1);
        this.forage = new Forage("Forage",this.page,2,1);
        this.tent = new Tent("Tent",this.page,3,1);

        this.station2.DisplayUnlocks([["stone",10],["sticks",20]]);
        this.station3.DisplayUnlocks([["stone",10],["glass",20]]);
        this.station4.DisplayUnlocks([["bricks",10],["iron",20]]);
    
    }

    Draw(){
        this.station.Draw(this.campfire.temp);
        this.station2.Draw(this.campfire.temp);
        this.station3.Draw(this.campfire.temp);
        this.station4.Draw(this.campfire.temp);

        this.campfire.Draw();
        this.forage.Draw();
        this.tent.Draw();
    }
}