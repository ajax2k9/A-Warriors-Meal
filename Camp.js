class Camp extends Page{
    constructor(){
        super("Camp");
        this.unlocked = true;
        let station4 = new CookingRack(this.page,1,6);
        let station3 = new CookingRack(this.page,1,5);
        let station2 = new CookingRack(this.page,1,4);
        let station1 = new CookingRack(this.page,1,3);
        
        this.forage = new Forage("Forage",this.page,2,1);
        this.tent = new Tent("Tent",this.page,3,1);
        this.campfire = new Campfire(this.page,1,1);

        station2.DisplayUnlocks([["stone",10],["sticks",20]]);
        station3.DisplayUnlocks([["stone",10],["glass",20]]);
        station4.DisplayUnlocks([["bricks",10],["iron",20]]);
        
        this.level_n1 = -1;

        this.stations = [station1,station2,station3,station4];
        
        this.stations.forEach(s=>{s.box.hide();})
    
    }
    AddStation(_lvl){
        this.stations[_lvl].box.show();
    }

    Draw(){
        for (let i  = 0; i<= this.campfire.level;i++){
            this.stations[i].Draw(this.campfire.temp);
        }

        this.campfire.Draw();
        this.forage.Draw();
        this.tent.Draw();

        if(this.campfire.level != this.level_n1){
            this.AddStation(this.campfire.level);
            this.level_n1 = this.campfire.level;
        }


    }
}