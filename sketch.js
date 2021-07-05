var Engine = Matter.Engine,
Render = Matter.Render,
Runner = Matter.Runner,
Body = Matter.Body,
Events = Matter.Events,
Composite = Matter.Composite,
Composites = Matter.Composites,
Common = Matter.Common,
MouseConstraint = Matter.MouseConstraint,
Mouse = Matter.Mouse,
Bodies = Matter.Bodies;

// create engine
var engine = Engine.create(),
world = engine.world;

// create renderer
var render = Render.create({
element: document.body,
engine: engine,
options: {
    width: 800,
    height: 600,
    wireframes: false
}
});

Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

var bodyStyle = { fillStyle: 'grey' };

// Creating edges
var wall1 = Bodies.rectangle(400, 0, 800, 50, { isStatic: true, render: bodyStyle }),
    wall2 = Bodies.rectangle(400, 600, 800, 50, { isStatic: true, render: bodyStyle }),
    wall3 = Bodies.rectangle(800, 300, 50, 600, { isStatic: true, render: bodyStyle }),
    wall4 = Bodies.rectangle(0, 300, 50, 600, { isStatic: true, render: bodyStyle });

//stack of circular bodies
var stack = Composites.stack(70, 100, 9, 4, 50, 50, function(x, y) {
    return Bodies.circle(x, y, 15, { restitution: 1, render: bodyStyle });
});

ball = Bodies.circle(200, 400, 30, {restitution: 1});

//Adding them to the world
Composite.add(world, [wall1, wall2, wall3, wall4, stack ]);

Events.on(engine, 'beforeUpdate', function(event){
    //console.log('Before Update');
    //console.log(event.timestamp);
    if(event.timestamp % 5000 < 50){
        console.log('5 seconds')
        shakeScene()
    }
})

function shakeScene(){
    var bodies = Composite.allBodies(world);

    var force = Common.choose([-1,1])*Common.random(0, 0.05)

    for (var i = 0; i < bodies.length; i++){
        var body = bodies[i];
        console.log(body);
        Body.applyForce(body, body.position, {x: force, y: force})
    }
    
}

// using collisionStart event on an engine
Events.on(engine, 'collisionStart', function(event) {
    var pairs = event.pairs;
    //console.log('Collision Start');
    // change object colours to show those starting a collision
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        pair.bodyA.render.fillStyle = 'pink';
        pair.bodyB.render.fillStyle = 'pink';
    }
});

// an example of using collisionActive event on an engine
Events.on(engine, 'collisionActive', function(event) {
    var pairs = event.pairs;
    //console.log('Collision Active');
    // change object colours to show those in an active collision (e.g. resting contact)
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        pair.bodyA.render.fillStyle = 'red';
        pair.bodyB.render.fillStyle = 'red';
    }
});

Events.on(engine, 'collisionEnd', function(event) {
    var pairs = event.pairs;
   // console.log('Collision End');
    // change object colours to show those in an active collision (e.g. resting contact)
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        pair.bodyA.render.fillStyle = 'lightblue';
        pair.bodyB.render.fillStyle = 'lightblue';
    }
});