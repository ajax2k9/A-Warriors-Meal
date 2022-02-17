phrases = [];
class NewsBox{
    constructor(_x,_y,_w,_h){
        this.box = createElement("box");
        this.box.class("box");
        this.box.position(_x,_y);
        this.box.size(_w,_h);

        this.innerBox = createElement("inner_box");
        this.innerBox.class("box");
        this.innerBox.style("background-color","black");
        this.innerBox.style("overflow","hidden");
        this.innerBox.style("white-space", "nowrap");
        this.innerBox.parent(this.box);
        this.innerBox.position(6,6);
        this.innerBox.size(_w-12,_h-12);
        
        this.text = createP("Welcome to A Warriors Meal!");
        this.text.parent(this.innerBox);
        this.text.position(0,-8);
        this.w = _w;
        this.x = 0;
    }

    Draw(){
        
        if(this.x > -1 * this.text.size().width){
            this.x-=0.5;
        } else {
            this.x= this.w + 10;
            this.ProcessPhrases(player.exp.level)
        }

        this.text.position(this.x,-8);
        
    }

    SetPhrase(_phrase){
        this.text.html(_phrase);
    }

    ProcessPhrases(_lvl){
        let n = Math.min(_lvl,phrases.length);
        let m = Math.floor(Math.random() * phrases[n].length);
        this.SetPhrase(phrases[n][m]); 
    }
}


class Panel{
    constructor(_x,_y,_w,_h,_parent,_name){
        this.box = createElement("box");
        this.box.parent(_parent);
        this.box.class("box");
        let x2 = _x + _w - 1;
        let y2 = _y + _h - 1;

        this.box.style("grid-row",_y + " / "+ y2);
        this.box.style("grid-column",_x+ " / " + x2);
        this.unlocked = true;

        this.content = createElement("content");
        this.content.parent(this.box);
        this.content.class("content");
        this.SetTitle(_name);

        //input1
        this.input1 = new EmptyStackElement(this.content);
        this.input1.bkgd.addClass("bot_left");

        this.stacks =[];
        
        this.progBar = new ProgBar(this.processTime,this.content);
        this.progBar.Position(60,180);
        this.progBar.SetSize(155,4);

        //main box
        this.box.mousePressed(()=>{
            if(selected != undefined){
                selected.Ui.removeClass("selected");
            }
            selected = this;
            selected.Ui=this.box;
            selected.Ui.addClass("selected");
        });

        this.box.mousePressed(()=>{
            if(!this.unlocked){
                if(this.reqDisplay.Purchase()){
                    this.unlocked = true;
                    this.content.show();
                }
            }

            if(selected != undefined){
                selected.Ui.removeClass("selected");
            }
            selected = this;
            selected.Ui=this.box;
            selected.Ui.addClass("selected");
        });
    


        this.icon = createImg("images/"+_name.toLowerCase()+".png","_name");
        this.icon.parent(this.content);
        this.icon.position(110,70);
        this.icon.size(70,60);

        this.time = new Timer(100);
    }

    SetTitle(_title){
        if(this.title == undefined){this.title = createP(_title);
            this.title.parent(this.content);
            this.title.class("title");
        } else {
            this.title.html(_title);
        }
    }

    SetGrid(_r,_c){
        this.elements.forEach(e=>{
            e.Grid(_r,_c);
        });
    }

    DisplayUnlocks(_unlocks){
        this.reqDisplay = new ReqDisplay(this.box,4,4);
        this.reqDisplay.DisplayUnlocks(_unlocks);
        this.unlocked = false;
        this.content.hide();
    }

    Draw(){

        if(this.unlocked == false){   
            this.reqDisplay.CheckReqs(); 
            return;
        }

       this.input1.Draw();
       this.progBar.Draw(this.time.currTime,this.time.maxTime);
       if(this.particleSystem != undefined){
            this.particleSystem.Draw();
        }

    }
}

class Page{
    constructor(_name){
        this.name = _name;
        this.page = createElement(_name);
        this.page.class("page");
        this.page.position(220,60);
        this.page.hide();
        this.selectedFood = undefined;
        this.unlocked = false;
        this.reqPop = 0;
    }

    CheckPop(){
        if(player.popularity >= this.reqPop){
            this.unlocked = true;
        }
    }

    DisplayPage(){
        this.page.show();
        this.page.style("display","grid");
        this.active = true;
      
    }

    HidePage(){
        this.page.hide();
        this.active = false;
    }

    Draw(){
        this.elements.forEach(element=>{element.Draw();});
       
    }

}