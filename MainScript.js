let player = new Player();
let hBar;
let sBar;
let fBar;
let lBar;
let lvlLabel;

let fileData;
let bbar = [];
let loaded = false;

function preload() {
  loadJSON("pantry.json",GetData);
  loadJSON("customers.json",GetCustomers);
  loaded = true;
}

function GetCustomers(_data){
  const keys = Object.keys(_data);
  for (const key of keys) {
     let cust = new Customer(key);
     cust.AddTrade(_data[key][0],_data[key][1],_data[key][2],_data[key][3]);
     customers.push(cust);

     let unit = new Unit(key,_data[key][4],_data[key][5],_data[key][6],_data[key][7]);
     units[key] = unit;
  }

}

function GetData(_data){
  let tools = _data["tools"];

  tools.forEach(e=>{
    pantry[e[0]] = new Tool(e[0],e[1],e[2],e[3]);
  });

  let food = _data["food"];

  food.forEach(e=>{
    pantry[e[0]] = new Food(e[0],e[1],e[2]);
  });

  let items = _data["items"];

  items.forEach(e=>{
    inventory[e] = new ItemStack(e);
  });

  let fuels = _data["fuels"];

  fuels.forEach(e=>{
    inventory[e[0]] = new Fuel(e[0], e[1], e[2]);
  });

  let animals = _data["animals"];

  animals.forEach(e=>{
    pantry[e[0]] = new Animal(e[0], e[1]);
  });

}


function setup() {

  if(loaded == false) return;
  mainInfo = createElement("mainInfo");
  stall = new Stall("Stall");
  msgBoard = new MessageBoard();
  storage = new Storage();

  pages.push(new Camp());
  pages.push(stall);
  pages.push(storage);
  pages.push(msgBoard);
  pages.push(new Farm());

  selector = new Selector();
  selectedAction = undefined;
  
  SetupQuests();
  SetupMainInfo();  
}

let test;
function SetupMainInfo(){
  mainInfo.position(0,0);
  mainInfo.size(208,windowHeight);
  mainInfo.style("background-color","black");
  
  hBar = new StatBar(mainInfo,"heart","red");
  hBar.Position(20,400);
  
  sBar = new StatBar(mainInfo,"stamina","green");
  sBar.Position(20,440);

  fBar = new StatBar(mainInfo,"haunch","orange");
  fBar.Position(20,480);

  lBar = new StatBar(mainInfo,"lvlup","yellow");
  lBar.Position(20,520);

  lvlLabel = createP("0");
  lvlLabel.parent(lBar.pbar);
  lvlLabel.position(10,-10);
  lvlLabel.size(100,100);

  let button = createButton("save","saveButton");
  button.size(200,20);
  button.position(0,windowHeight -40);
  button.mousePressed(()=>{SaveData();});

  let button2 = createButton("load","loadButton");
  button2.size(200,20);
  button2.position(0,windowHeight -80);
  button2.mousePressed(()=>{LoadData();});  
}

function SaveData(){
  localStorage.setItem("pantry",JSON.stringify(pantry));
  localStorage.setItem("inventory",JSON.stringify(inventory));
  
  localStorage.setItem("player",JSON.stringify(player));
}

function LoadData(){
  player.LoadData(JSON.parse(localStorage.getItem("player")));
  let savedPantry = JSON.parse(localStorage.getItem("pantry"));

  const keys = Object.keys(pantry);
  for (const key of keys) {
    if(savedPantry[key]!=undefined){
      pantry[key].quant = savedPantry[key].quant;
    }
  }

  savedPantry = JSON.parse(localStorage.getItem("inventory"));

  const keys2 = Object.keys(inventory);
  for (const key of keys2) {
    if(savedPantry[key]!=undefined){
      inventory[key].quant = savedPantry[key].quant;
    }
  }
}

function UnlockFarm(){
  selector.UnlockPage(4);
}


function SetupQuests(){
  let p = new Party();
  
  p.AddUnit(new Unit("Wolf",20,4,2,2));
  p.AddUnit(new Unit("Dog",10,2,3,10));
  p.AddUnit(new Unit("Bear",300,4,4,200));

  msgBoard.AddQuest("Flew the coop" ,10,p,"Farm",UnlockFarm);
}

function draw(){
 pages.forEach(Element=>{if(Element.active)Element.Draw();})
 player.Update();
 hBar.Draw(player.health.value,player.health.max);
 sBar.Draw(player.stamina.value,player.stamina.max);
 fBar.Draw(player.hunger.value,player.hunger.max);
 lBar.Draw(player.exp.value,player.exp.max);
 lvlLabel.html(player.exp.level);
 
}

