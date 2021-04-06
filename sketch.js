const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var bgImg;
var star, starBody, starImg;
var fairy, fairyImg;
var sound;

function preload()
{
	starImg = loadImage("star.png");
	bgImg = loadImage("starNight.png");
	fairyImg = loadAnimation("fairyImage1.png", "fairyImage2.png");
	sound = loadSound("JoyMusic.mp3");
}

function setup() {
	createCanvas(800, 600);

	sound.play();

	fairy = createSprite(400, 400);
	fairy.addAnimation("fairy", fairyImg);
	fairy.scale = 0.25;

	star = createSprite(650,30);
	star.addImage(starImg);
	star.scale = 0.2;

	engine = Engine.create();
	world = engine.world;

	starBody = Bodies.circle(Math.round(random(50,750)) , 30 , 5 , {restitution:0.5, isStatic:true});
	World.add(world, starBody);
	
	Engine.run(engine);

}


function draw() {
	background(bgImg);

	Engine.update(engine);

	star.x= starBody.position.x;
	star.y= starBody.position.y;

	console.log(star.y);

	if(keyDown("LEFT_ARROW")) {
		fairy.x = fairy.x - 3;
	} else if(keyDown("RIGHT_ARROW")) {
		fairy.x = fairy.x + 3;
	}

	keyPressed();

	if(star.y > 350 && starBody.position.y > 350) {
		Matter.Body.setStatic(starBody, true);
	}

  drawSprites();

}

function keyPressed() {
	if (keyCode === DOWN_ARROW) {
		Matter.Body.setStatic(starBody,false); 
	}
}
