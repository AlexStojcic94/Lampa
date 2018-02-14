function Wall() {
    this.wall1 = null;
    this.wall2 = null;
    this.floor = null;

    var that = this;

    this.drawWalls = function (scene, size) {
        that.wall1 = BABYLON.MeshBuilder.CreateBox("wall1", { height: size, width: size * 2, depth: size / 50 }, scene);
        that.wall1.translate(new BABYLON.Vector3(size, size / 2, 0), 1, BABYLON.Space.LOCAL);
        var wall1Material = new BABYLON.StandardMaterial("mat1", scene);
        wall1Material.diffuseTexture = new BABYLON.Texture("/Content/textures/wall1.jpg", scene);
        wall1Material.bumpTexture = new BABYLON.Texture("/Content/textures/w11.png", scene);
        that.wall1.material = wall1Material;


        that.wall2 = BABYLON.MeshBuilder.CreateBox("wall2", { height: size, width: size * 2, depth: size / 50 }, scene);
        that.wall2.rotate(new BABYLON.Vector3(0, 1, 0), -Math.PI / 2, BABYLON.Space.LOCAL);
        that.wall2.translate(new BABYLON.Vector3(-size, size / 2, 0), 1, BABYLON.Space.LOCAL);
        var wall2Material = new BABYLON.StandardMaterial("mat1", scene);
        wall2Material.diffuseTexture = new BABYLON.Texture("/Content/textures/wall3.jpg", scene);
        wall2Material.bumpTexture = new BABYLON.Texture("/Content/textures/w31.png", scene);
        wall2Material.diffuseTexture.uScale = 2;
        wall2Material.diffuseTexture.vScale = 1;
        that.wall2.material = wall2Material;


        that.floor = BABYLON.MeshBuilder.CreateBox("floor", { height: size / 50, width: size * 2, depth: size * 2 }, scene);
        that.floor.translate(new BABYLON.Vector3(size, 0, -size), 1, BABYLON.Space.LOCAL);
        var floorMaterial = new BABYLON.StandardMaterial("mat1", scene);
        floorMaterial.diffuseTexture = new BABYLON.Texture("/Content/textures/floor.jpg", scene);
        floorMaterial.bumpTexture = new BABYLON.Texture("/Content/textures/floorNFinal.png",scene);
        that.floor.material = floorMaterial;
    }

}