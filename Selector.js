class Selector {
    constructor(){
        this.selection=0;
        this.buttons=[];
        this.ShowButtons();
    }

    UpdateSelected(_selection,_oldSelection){
       console.log("_selection is : "+_selection );
        pages[_oldSelection].HidePage();
        pages[_selection].DisplayPage();
        this.selection = _selection;
        
    }

    ShowButtons(){
        let _x = 4;
        let _y = 4;
        let _index = 0;
        this.buttons = [];
        player.unlocks = [];
        pages.forEach(Element=>{
            player.unlocks.push(Element.unlocked);
        
            if(Element.unlocked == true){
                let button = createButton(Element.name,Element.name);
                button.size(200,20);
                button.position(_x,_y);
                button.index = _index;
                button.mousePressed(()=>{this.UpdateSelected(button.index,this.selection);});
                _y+=25;
                this.buttons.push(button);
            }
            _index++;   
        });
        
    }

    UnlockPage(_index){
        pages[_index].unlocked = true;
        this.ShowButtons();
    }

    DecrementSelection(){
        var oldSelection = this.selection;
        this.selection--;
        if(this.selection < 0) this.selection = pages.length-1;
        this.UpdateSelected(this.selection,oldSelection);
    }

    IncrementSelection(){
        var oldSelection = this.selection;
        this.selection++;
        if(this.selection > pages.length-1) this.selection = 0;
        this.UpdateSelected(this.selection,oldSelection);
    }

    CheckPages(){
        pages.forEach(e=>{
            if(e.unlocked == false){
                if(e.reqPop <= player.popularity){
                    e.unlocked = true;   
                    this.ShowButtons();                                     
                }
            }
        });
    }



}