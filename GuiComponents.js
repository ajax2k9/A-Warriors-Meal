class ProgBar{
    constructor(_maxVal,_parent){
        this.maxVal = _maxVal;
        this.bkgd = createElement("pbar_bkgd");
        this.bkgd.class("pbar_bkgd");
        this.bkgd.parent(_parent);
        this.pbar = createElement("pbar");
        this.pbar.parent(this.bkgd);
        this.pbar.class("pbar");

    }

    SetSize(_length,_height){
        this.bkgd.size(_length,_height);
    }

    Position(_x,_y){
        this.bkgd.position(_x,_y);
    }

    Grid(_r,_c){
        this.bkgd.style("grid-column",_c);
        this.bkgd.style("grid-row",_r);
    }

    Draw(val,maxVal){
        let ratio = val / max(maxVal,1);
        this.pbar.style("width",ratio * 100 +"%");
    }
}

class VBar extends ProgBar{
    constructor(_maxVal,_parent){
        super(_maxVal,_parent);
        
        this.pbar.style("width","100%");
        this.pbar.style("height","50%");
    }

    Draw(val){
        let ratio = val / max(this.maxVal,1);
        this.pbar.style("width","100%");
        this.pbar.style("height",ratio * 100 +"%");
    }

    Draw(val,maxVal){
        let ratio = val / max(maxVal,1);
        this.pbar.style("width","100%");
        this.pbar.style("height",ratio * 100 +"%");
    }
}

class StatBar extends ProgBar{
    constructor(_parent,_name,_color){
        super(100,_parent);
        this.pbar.style("background-color",_color);
        this.icon = createImg("images/" + _name +".png",_name);
        this.icon.parent(this.pbar);
        this.icon.size(32,32);
        this.icon.position(-16,-16);

        this.valLabel = createP("100/100");
        this.valLabel.parent(this.pbar);
        this.valLabel.position(80,-10);
        this.valLabel.size(100,20);
        this.valLabel.style("text-align","right");

        this.SetSize(180,4);
    }

    Draw(_val,_maxVal){
        _val = Math.min(_val,_maxVal);
        super.Draw(_val,_maxVal);
        this.valLabel.html(_val.toFixed(0) + "/" + _maxVal.toFixed(0));
    }


}
class UpgradeHoverElement{
    constructor(_parent){
        this.ready = false;
        this.box = createElement("upgradeHover");
        this.box.parent(_parent);
        this.box.class("hover_window");
        this.box.position(30,0);
        this.box.size(128,128);
        this.Show(false);

        this.unlocks = {};
    }

    AddUnlock(_name,_quant){
        this.unlocks[_name] = _quant;
    }

    Update(){
        this.ready = true;

        this.box.html("");
        const keys = Object.keys(this.unlocks);
        let _x = 0;
        let _y = 0;
        for (const key of keys) {
            let quant = this.unlocks[key];
            let e = new SimpleStack(key,quant,this.box,_x*44,_y*44);
            if(quant > pantry[key].quant){
                this.ready = false;
            } else {
                e.text.style("color","rgb(100,255,100)");
            }

            _x++;
            if(_x > 2){
                _x = 0;
                _y++;
            }
        }
    }

    Show(_show){
        if(_show){
            
            this.Update();
            this.box.show();
        } else {
            this.box.hide();
        }
    }
}

class UpgradeButton{
    constructor(_parent,_obj){
        this.box = createElement("upgrade");
        this.box.html("+");
        this.box.parent(_parent);
        this.box.class("upgrade_butt");

        this.obj = _obj;
        this.upgradeHover = new UpgradeHoverElement(this.box);
        this.box.mouseOver(()=>{this.upgradeHover.Show(true)});
        this.box.mouseOut(()=>{this.upgradeHover.Show(false)});
        this.box.mousePressed(()=>{
            if(this.upgradeHover.ready == false) return;

            let reqs = this.upgradeHover.unlocks;

            const keys = Object.keys(reqs);
            for (const key of keys) {
                pantry[key].quant -= reqs[key];
            }

            this.obj.Upgrade();
            this.upgradeHover.ready = false;
            this.upgradeHover.Update();
        });
    }

    AddUnlock(_name,_quant){
        this.upgradeHover.AddUnlock(_name,_quant);
    }

    SetUnlocks(_list){
        this.ClearUnlocks();
        _list.forEach(e=>{
            this.AddUnlock(e[0],e[1]);
        });
    }

    ClearUnlocks(){
        this.upgradeHover.unlocks = {};
    }
}

class SimpleStack{
    constructor(_name,_quant,_parent,_x,_y){
        this.box = createElement("simpleStack");
        this.box.parent(_parent);
        this.box.position(_x,_y);

        this.img = createImg("images/"+_name+".png",_name);
        this.img.parent(this.box);
        this.img.size(32,32);
        this.img.position(0,0);

        this.text = createP(_quant);
        this.text.parent(this.box);
        this.text.position(16,0);
        this.text.class("quant_text");

    }
}

class ItemStackElement{
    constructor(_itemStack,_parent,_x,_y){
        this.itemStack = _itemStack;
        this.bkgd = createElement("item_stack");
        this.bkgd.class("item_stack");
        this.bkgd.parent(_parent);
        this.bkgd.position(_x,_y);

        this.img = createImg(_itemStack.icon,_itemStack.name);
        this.img.parent(this.bkgd);
        this.img.size(32,32);
        this.img.position(3,3);

        this.text = createP(this.itemStack.quant);
        this.text.parent(this.bkgd);
        this.text.position(16,6);
        this.text.class("quant_text");
        this.changed = false;

        this.ShowQuant(!(this.itemStack instanceof Tool))
       
    }
    
    show(){
        this.bkgd.show();
    }

    hide(){
        this.bkgd.hide();
    }

    
    ShowQuant(_show){
        if(_show){
            this.text.show();
        } else {
            this.text.hide();
        }
    }

    AddStackList(_stacks,_hideZeros = false){
        this.stackList = new ItemListDisplay(_stacks,this,_hideZeros);

        this.bkgd.mousePressed(()=>{
            this.stackList.ToggleVisible();});

    }

    Draw(){
        this.text.html(pantry[this.itemStack.name].quant);
        if(this.stackList != undefined){
            this.stackList.Draw();
        }
    }

    DrawCustomQuant(_quant){
        this.text.html(_quant);
        if(this.stackList != undefined){
            this.stackList.Draw();
        }
    }

    ChangeIcon(){
        this.img.attribute("src",this.itemStack.icon);
    }

    ChangeItemstack(_itemStack){
        this.itemStack = _itemStack;
        this.ChangeIcon();
        if( this.itemStack instanceof Tool){
            this.text.hide();
        } else {
            this.text.show();
        }
        this.changed = true;
    }

    EmptyItemstack(){
        this.itemStack = new ItemStack("null","images/null.png");
        this.ChangeIcon();
        this.text.hide();
        this.changed = true;
    }
}

class EmptyStackElement extends ItemStackElement{
    constructor(_parent,_x,_y,_gx,_gy){
        super(new ItemStack("null","images/null.png"),_parent,_x,_y,_gx,_gy);
        this.text.hide();
    }
}

class TempBar{
    constructor(_maxVal,_parent){
        this.maxVal = _maxVal;

        this.bkgd = createElement("tempGauge");
        this.bkgd.class("tempGauge");
        this.bkgd.parent(_parent);
        this.bkgd.size(10,80);
        this.bkgd.position(20,50); 
        
        this.slider = createElement("tempGaugeSlider");
        this.slider.class("tempGaugeSlider");
        this.slider.parent(this.bkgd); 
    }

    Draw(_val){
        let ratio = Math.min(1,_val/this.maxVal) *100;
        this.slider.style("bottom",ratio + "%");
    }
}

class ItemListDisplay{
    constructor(_list,_parent,_hideZeros = false){
        this.visible = false;
        this.bkgd = createElement("item_stack");
        this.bkgd.class("item_list");
        this.bkgd.parent(_parent.bkgd);
        this.bkgd.hide();
        this.dispElements = [];
        this.hideZeros = _hideZeros; 
        this.list = _list;
        this.parent = _parent;
        

        _parent.bkgd.mousePressed(()=>{
            this.ToggleVisible();});

    }

    Show(){
        
        this.dispElements = [];
        let x =0,y = 0;
        let spacing = 40;
        
        this.list.forEach(element => {
            if ((this.hideZeros && element.quant > 0) || !this.hideZeros){
                let stackElement = new ItemStackElement(element,this.bkgd,x,y);
                stackElement.bkgd.mousePressed(()=>{
                    this.parent.ChangeItemstack(stackElement.itemStack);
                });
    
                this.dispElements.push(stackElement);
                x+=spacing;
                if(x > 2*spacing){
                    x=0;
                    y+=spacing;
                }
            }
        });

        if(this.dispElements.length > 0){
            this.bkgd.show();
            let w = 3;
            let h = Math.max(Math.floor(this.dispElements.length / w), 3);  
            this.bkgd.position(0,spacing);      
            this.bkgd.size(w*spacing,h*spacing);
        }
    }

    Hide(){
        this.bkgd.hide();
    }

    ToggleVisible(){
        this.visible = !this.visible;
        if(this.visible){
            this.Show();
        } else {
            this.Hide();
        }
    }

    Draw(){
        if(this.visible){
            this.dispElements.forEach(element=>{element.Draw();});
        }
    }
}

class DirtyDylansBattleBar extends ProgBar{
    constructor(_p1,_p2,_parent){

        super(100,_parent);

        this.p1 = _p1;
        this.p2 = _p2;
    
       this.bkgd.style("background-color","red");
       this.pbar.style("background-color","blue");

        this.icon = createImg("images/party.png","party.png");
        this.icon.parent(this.pbar);
        this.icon.size(32,32);
        this.icon.position(-16,-16);

        this.icon2 = createImg("images/monster.png","party.png");
        this.icon2.parent(this.pbar);
        this.icon2.size(32,32);
        this.icon2.position(284,-16);

        this.label1 = createP("0");
        this.label1.parent(this.pbar);
        this.label1.position(10,-10);

        this.label2 = createP("0");
        this.label2.parent(this.pbar);
        this.label2.position(275,-10);

       this.SetSize(300,4);
    }

    SetParty1(_party){
        this.p1 = _party;
    }

    SetParty2(_party){
        this.p2 = _party;
    }

    Draw(){
        let h1 = this.p1.health.value;
        let h1max = this.p1.health.max;

        let h2 = this.p2.health.value;
        let h2max = this.p2.health.max;
        
        let ratio = h1/(h1+(h2*h1max)/h2max);

        this.pbar.style("width",ratio * 100 +"%");
        this.label1.html(this.p1.units.length);
        this.label2.html(this.p2.units.length);
    }
}


class Particle {
    constructor(_plus,_icon,_parent){
        this.box = createElement("particle");
        this.box.parent(_parent);
        this.x = 0;
        this.y = 0;

        this.icon = createImg("images/" + _icon + ".png", _icon);

        if(_plus){
            this.sign = createImg("images/plus.png","plus");
        } else {
            this.sign = createImg("images/minus.png","minus");
        }

        this.icon.parent(this.box);
        this.icon.position(0,0);
        this.icon.size(32,32);

        this.sign.parent(this.box);
        this.sign.position(16,16);
        this.sign.size(12,12);
    }

    Position(_x,_y){
        this.x = _x;
        this.y = _y;
        this.box.position(_x,_y);
    }
}

class ParticleSystem{
    constructor(_plus,_icon,_parent,_num,_x,_y,_spread=80,_lifetime = 5){
        this.particles = [];
        this.plus = _plus;
        this.icon = _icon;
        this.parent = _parent;
        this.num = _num;
        this.x = _x;
        this.y = _y;
        this.spread = _spread; 
        this.time = new Timer(_lifetime,false);

        this.SpawnParticles();
    }


    KillParticles(){
        this.particles.forEach(e=>{
            e.box.remove();
        });
    }

    SpawnParticles(){
        this.particles = [];
        for(let i = 0; i <this.num;i++){
            let x= this.x + Math.floor(Math.random() * this.spread) -this.spread/2;
            let y= this.y + Math.floor(Math.random() * this.spread) -this.spread/2;
            let p = new Particle(this.plus,this.icon,this.parent);
            p.Position(x,y);
            this.particles.push(p);
        }
        this.time.Reset();
    }

    Draw(){
        if(!this.time.Update(0.1,false)){
            this.particles.forEach(e=>{
                let y = e.y-1;
                e.Position(e.x,y);
            });
        }else{
            this.KillParticles();
        }
    }
}

class ReqDisplay{
    constructor(_parent,_x,_y){
        this.box = createElement("unlock");
        this.box.parent(_parent);
        this.box.position(_x,_y);

        this.button = createElement("Locked");
        this.button.style("background-color","red");
        this.button.parent(_parent);
        this.button.class("upgrade_butt");

        this.lockImg = createImg("images/lock.png","lock");
        this.lockImg.parent(this.button);
        this.lockImg.size(16,16);
        this.lockImg.position(4,4);
        this.box.hide();
    }

    DisplayUnlocks(_unlockList){

        this.box.show();
        this.box.style("display","flex");

        this.unlocks ={};

        let x = 0;
        let y = 0;
        _unlockList.forEach(e=>{
            new SimpleStack(e[0],e[1],this.box,x*44,y*44);
            this.unlocks[e[0]] = e[1];
            
            if(x++ > 5){
                x = 0;
                y++;
            }
        });

    }

    CheckReqs(){
        const keys = Object.keys(this.unlocks);
       
        for (const key of keys) {
            if(inventory[key] == undefined || this.unlocks[key] > inventory[key].quant){
                this.button.style("background-color","red");
                return false;
            }
        }

        this.button.style("background-color","green");
        return true;
    }

    Purchase(){
        if(!this.CheckReqs()) return false;    

        const keys = Object.keys(this.unlocks);
        for (const key of keys) {
            inventory[key].quant -= this.unlocks[key];
        }
        this.box.hide();
        this.button.hide();

        return true;
    }
}

function GetImage(_str){
    return "<img src='images/"+_str+".png' style = \" width:32px; height:32px;\">" ;
}


