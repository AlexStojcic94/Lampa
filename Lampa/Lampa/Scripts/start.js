
start();

function start() {
    window.addEventListener('DOMContentLoaded', function () {

        var canvas = document.getElementById('renderCanvas');
        var engine = new BABYLON.Engine(canvas, true);

        var scene = createScene(canvas, engine);
        engine.runRenderLoop(function () {
            scene.render();
        });
        window.addEventListener('resize', function () {
            engine.resize();
        });
    });
}