
class Quest{
    constructor(_name, _popReq,_parent,_party,_combat){
        this.name = _name;
        this.visible = true;
        this.active = false;
        this.complete = false;
        this.unlocked = false;
        this.popReq = _popReq;
        this.combat = _combat;
        this.party = _party;
        this.box = createElement("quest");

        this.box.parent(_parent);
        this.box.class("quest");
        this.box.size(220,250);
        this.questName = createP(_name);
        this.questName.parent(this.box);
        this.questName.style("width","100%");
        this.questName.style("text-align","center");

        this.icon = createImg("images/entities/"+_name +".png",_name);
        this.icon.parent(this.box);
        this.icon.size(100,100);

        this.questPop = new StatBar(this.box,"smiley","yellow");
        this.questPop.Position(20,180);
        this.questButton = createElement("quest_button");
        this.questButton.class("questButton");
        this.questButton.parent(this.box);
        this.questButton.html("Not Ready");
        this.questButton.addClass("nope");
    }

    Draw(){
        this.questPop.Draw(player.popularity,this.popReq);
        if(player.popularity >=this.popReq && this.unlocked == false){
            this.unlocked = true;
            this.questButton.removeClass("nope");
            this.questButton.html("Start Quest!");
            this.questButton.mousePressed(()=>{
                if(!this.active){
                    this.combat.p2 = this.party;
                    this.combat.bbar.p2 = this.combat.p2;
                    this.active = true;
                    this.combat.active = true;
                    this.questButton.html("Quest Began!");
                    this.combat.quest = this;
                }
            });
        }
    }
    SetUnlock(_func,_title){
        this.unlockFunc = _func;
        this.title = _title;
    }

    CompleteQuest(){
        this.unlockFunc();
    }
}


class CombatInfo{
    constructor(_parent){
        this.p1 =player.party;
        this.p2 =new Party();

        this.box = createElement("Combat");
        this.box.class("box");
        this.box.addClass("questInfo");
        this.box.parent(_parent);
    
        this.bbar = new DirtyDylansBattleBar(this.p1,this.p2, this.box);
        this.bbar.Position(40,30);

        this.pbar = new ProgBar(100,this.box);
        this.pbar.Position(12,80);
        this.pbar.SetSize(374,4);

        this.chat = createElement("chat");
        this.chat.class("chat");
        this.chat.parent(this.box);

        this.log = [];
        this.logDisplay = createP("");
        this.logDisplay.parent(this.chat);
        this.logDisplay.position(10,-2);
        this.logDisplay.size(300,500);
        this.active = false;
        this.quest = {};

        this.partyTurn = false;
        this.winner = 0;

        this.questTime = new Timer(20);
    }

    DrawLog(_newMsg){
        this.log.push(_newMsg);

        if(this.log.length>14){
            this.log.splice(0,1);
        }

        let msg = "";

        for(let i = this.log.length - 1; i>=0; i--){
            msg += this.log[i] + "\n\n";
        }

        this.logDisplay.html(msg);
    }

    DrawComplete(_msg,_item){
        this.logDisplay.html(_msg +" "+_item);
    }

    Draw(){
        this.bbar.Draw();
        this.pbar.Draw(this.questTime.currTime,this.questTime.maxTime);
        
        if(this.active && this.questTime.Update()){
                let choice1 = PickNumber(this.p1.count);
                let choice2 = PickNumber(this.p2.count);
                let u1 = this.p1.units[choice1];
                let u2 = this.p2.units[choice2];
            let msg = "";
            let dmg =  0;
            
            if(this.partyTurn){
             dmg =  u1.Attack(u2);
             msg = "<span style='color : blue'>"+ u1.name +"</span> does "+ dmg.toFixed(0) +" to " + "<span style='color : red'>"+ u2.name +"</span>";
            } else {
              dmg =  u2.Attack(u1);
              msg = "<span style='color : red'>"+ u2.name +"</span> does "+ dmg.toFixed(0) +" to " + "<span style='color : blue'>"+ u1.name +"</span>";
            }
            this.DrawLog(msg);
    
            this.p1.UpdateStats();
            this.p2.UpdateStats();

            if(this.p1.count<=0) this.winner = 2;
            if(this.p2.count<=0) this.winner = 1;
            if(this.p1.count + this.p2.count == 0)this.winner = 3;
            
            this.partyTurn = !this.partyTurn;

            if(this.winner > 0){
                this.active = false;
                if(this.winner==1){
                    this.DrawComplete("Congrats! You unlocked",this.quest.title);
                    this.quest.CompleteQuest();
                } else if(this.winner==2) {
                    this.DrawComplete("You Lost :(","");
                } else if(this.winner==3) {
                    this.DrawComplete("Its a Draw?!","");
                }
            }
        }

        
    }
}

class MessageBoard extends Page{
    constructor(){
        super("Quests");
        this.quests = [];
        this.unlocked = false;

        this.combat = new CombatInfo(this.page,250,0);
    }

    AddQuest(name,pop,party,unlockName,unlockFunc){
        let quest = new Quest(name,pop,this.page,party,this.combat);
        quest.SetUnlock(unlockFunc,unlockName);
        quest.box.position(this.posX,this.posY);

        this.posY+=50;
        this.quests.push(quest);
    }

    Draw(){
       this.quests.forEach(element=>{element.Draw();});
       this.combat.Draw();
    }
}