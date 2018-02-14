createScene = function (canvas, engine) {
    
    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(6, 5, -7), scene);
    
    camera.setTarget(BABYLON.Vector3.Zero());
    
    camera.attachControl(canvas, true);
    
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    
    light.intensity = 0.7;

    var w = new Wall();
    w.drawWalls(scene, 5);
    var t = new Table();
    t.drawTable(scene, 7);
    var l = new lamp();
    l.drawLamp(scene, 7, w, t);

    

    window.addEventListener('keypress', function (evt) {

        var angle = Math.PI/100;
        if (String.fromCharCode(evt.keyCode) == 'w') {
            l.lampHead.rotate(new BABYLON.Vector3(0, 0, 1), angle * Math.PI / 2, BABYLON.Space.WORLD);
            l.lampRotation += angle*Math.PI/2
        }
        if (String.fromCharCode(evt.keyCode) == 's') {
            l.lampHead.rotate(new BABYLON.Vector3(0, 0, 1), angle * -Math.PI / 2, BABYLON.Space.WORLD);
            l.lampRotation -= angle * Math.PI / 2

        }
        
        l.lampLight.direction = new BABYLON.Vector3(Math.cos(l.lampRotation), Math.sin(l.lampRotation), 0)

    });
    return scene;
};


