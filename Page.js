class Panel{
    constructor(_x,_y,_w,_h,_parent,_name){

        this.processTime=100;
        this.time = 0;
        this.unlocked = true;
        
        this.box = createElement("box");
        this.box.parent(_parent);
        this.box.class("box");
        let x2 = _x + _w - 1;
        let y2 = _y + _h - 1;

        this.box.style("grid-row",_y + " / "+ y2);
        this.box.style("grid-column",_x+ " / " + x2);

        this.SetTitle(_name);

        //input1
        this.input1 = new EmptyStackElement(this.box);
        this.input1.bkgd.addClass("input");

        this.stacks =[];
        
        this.progBar = new ProgBar(this.processTime,this.box);
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


        this.icon = createImg("images/"+_name.toLowerCase()+".png","_name");
        this.icon.parent(this.box);
        this.icon.position(110,70);
        this.icon.size(70,60);
        
    }

    SetTitle(_title){
        this.title = createP(_title);
        this.title.parent(this.box);
        this.title.class("title")
    }

    SetGrid(_r,_c){
        this.elements.forEach(e=>{
            e.Grid(_r,_c);
        });
    }

    Draw(){
       this.input1.Draw();
       this.progBar.Draw(this.time,this.processTime);

    }
}

class Page{
    constructor(_name){
        this.name = _name;
        this.page = createElement(_name);
        this.page.class("page");
        this.page.hide();
        this.selectedFood = undefined;
        this.unlocked = false;
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