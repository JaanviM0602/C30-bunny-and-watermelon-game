const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;

var bg_img;
var food;
var rabbit;
var bunny;
var btn; 

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);

  bunny = createSprite(250,620);
  bunny.addImage("bunnyImg", rabbit);
  bunny.scale = 0.2;

  rope = new Rope(7,{x:245,y:30});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);

  btn = createImg("cut_button.png");
  btn.position(225,30);
  btn.size(50,50);
  btn.mouseClicked(drop);

}

function draw() 
{
  background(255);

  image(bg_img,width/2,height/2,490,690);

  drawSprites();

  image(food,fruit.position.x,fruit.position.y,70,70);
  rope.show();
  Engine.update(engine);
 // ground.show();


  if(fruit.position.y > 500) {
    Matter.Body.scale(fruit, 0.001,0.001);
}

}


function drop() {
  rope.break();
  fruit_con.detatch();
  fruit_con=null;
}
