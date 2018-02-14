function lamp() {
    this.lampBase = null;
    this.lampSupport = null;
    this.lampHead = null;
    this.lampLight = null;
    this.lampRotation = null;

    var that = this;

    this.drawBase = function (scene, size, lampMaterial) {
        that.lampBase = that.drawHalfcone(scene, size / 25, 0.4);
        that.lampBase.translate(new BABYLON.Vector3(0.5 * size,  5.27 * size / 16, -0.25 * size), 1, BABYLON.Space.WORLD);
        that.lampBase.material = lampMaterial;
    }
    this.drawSupport = function (scene, size, lampMaterial) {
        that.lampSupport = BABYLON.MeshBuilder.CreateBox("lampSupport", { height: size/8, width: size/100 , depth: size / 100 }, scene);
        that.lampSupport.rotate(new BABYLON.Vector3(0, 0, 1), 0.1 * Math.PI / 2, BABYLON.Space.WORLD);
        that.lampSupport.translate(new BABYLON.Vector3(0.498 * size,5.27 * size / 16 + size / 16, -0.25 * size), 1, BABYLON.Space.WORLD);
        that.lampSupport.material = lampMaterial;

    }
    this.drawHead = function (scene, size, lampMaterial) {
        that.lampHead = that.drawHalfcone(scene, size / 45, 3);
        that.lampHead.rotate(new BABYLON.Vector3(0, 0, 1), 0.8*Math.PI /2, BABYLON.Space.WORLD);
        that.lampHead.translate(new BABYLON.Vector3(0.489 * size + size / 30, size / 8 + 5.27 * size / 16, -0.25 * size), 1, BABYLON.Space.WORLD);
        that.lampHead.material = lampMaterial;
    }
    this.drawLight = function (scene, size,wall, table)
    {
        that.lampLight = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(0.420 * size , 2*size / 8 +  5.27 * size / 16, -0.25 * size), new BABYLON.Vector3(Math.cos(that.lampRotation), Math.sin(that.lampRotation), 0), Math.PI / 3, 2, scene);
        that.lampLight.includedOnlyMeshes.push(table.tableTop);
        that.lampLight.includedOnlyMeshes.push(wall.floor);
        that.lampLight.includedOnlyMeshes.push(wall.wall1);
        that.lampLight.includedOnlyMeshes.push(wall.wall2);
        var shadowGenerator = new BABYLON.ShadowGenerator(1024, that.lampLight, true);
        shadowGenerator.getShadowMap().renderList.push(table.tableTop);

        
        table.tableKeyboardStand.receiveShadows = true;
        wall.floor.receiveShadows = true;
    }
    this.drawLamp = function (scene, size,wall,table)
    {
        var lampMaterial = new BABYLON.StandardMaterial("mat1", scene);
        lampMaterial.diffuseTexture = new BABYLON.Texture("/Content/textures/metal.jpg", scene);
        

        that.drawBase(scene, size, lampMaterial);
        that.drawSupport(scene, size, lampMaterial);
        that.drawHead(scene, size, lampMaterial);
        that.drawLight(scene, size, wall, table);
    }
    this.drawHalfcone = function (scene, size, ratio) {
        var halfCircle = [];
        var x = size;
        var y = 0;
        var radius = size;
        var noPaths = 100;

        for (var i = 0; i <= noPaths; ++i) {
            x = Math.cos(i  * Math.PI / (2 * noPaths)) * radius;
            y = ratio*Math.sin(i * Math.PI / (2 * noPaths)) * radius;
            halfCircle.push(new BABYLON.Vector3(x, y, 0));
        }

        var paths = [];
        var noPoints = 100;

        var delta =  2*Math.PI / noPoints;
        for (p = 0; p <  2*Math.PI ; p += delta) {
            var path = [];
            for (var i = 0; i < halfCircle.length; i++) {
                var x = halfCircle[i].x * Math.cos(p) + halfCircle[i].z * Math.sin(p);
                var y = halfCircle[i].y;
                var z = -halfCircle[i].x * Math.sin(p) + halfCircle[i].z * Math.cos(p);
                path.push(new BABYLON.Vector3(x, y, z));
            }
            paths.push(path);
        }

        var ribbon = BABYLON.MeshBuilder.CreateRibbon("ribbon", { pathArray: paths, closeArray: true, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
        return ribbon;
    }
}