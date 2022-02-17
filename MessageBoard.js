
class Quest{
    constructor(_quest,_parent,_icon){
        this.name = _quest.name;
        this.unlocked = false;
        this.box = createElement("quest");
        this.popReq = _quest.pop;
        this.box.parent(_parent);
        this.box.class("quest");
        this.box.size(220,250);
        this.questName = createP(this.name);
        this.questName.parent(this.box);
        this.questName.style("width","100%");
        this.questName.style("text-align","center");

        this.icon = createImg("images/"+_icon +".png",_icon);
        this.icon.parent(this.box);
        this.icon.class("questIcon");
        this.icon.size(100,100);

        this.questPop = new StatBar(this.box,"smiley","yellow");
        this.questPop.Position(20,180);

        this.questButton = createElement("quest_button");
        this.questButton.parent(this.box);
        this.questButton.class("questButton");
        
        this.questButton.html("Not Ready");
        this.questButton.addClass("nope");

        this.quest = _quest;
    }

    Draw(){
        this.questPop.Draw(player.popularity,this.popReq);
        if(player.popularity >=this.popReq && this.unlocked == false){
            this.unlocked = true;
            this.questButton.removeClass("nope");
            this.questButton.html("Start Quest!");
            this.questButton.mousePressed(()=>{
                stall.menu.ClearList();

                this.quest.reqs.forEach(r=>{
                    stall.menu.AddItem(r);
                });
            });
        }
    }
}


class MessageBoard extends Page{
    constructor(){
        super("Quests");
        this.quests = [];
        this.unlocked = false;
        this.reqPop = 0;
        this.page.style("grid-template-columns", "repeat(8,1fr)");
        
        const keys = Object.keys(quests);
        for(const key of keys){
            let q = quests[key];
            this.quests.push(new Quest(q,this.page,q.items[0][0]));
        }
    }

    Draw(){
       this.quests.forEach(element=>{element.Draw();});
    }
}