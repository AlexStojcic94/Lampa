function Table() {
    this.tableTop = null;
    this.tableLegFL = null;
    this.tableLegBL = null;
    this.tableLegFR = null;
    this.tableLegBR = null;
    this.tableDrawerBase = null;
    this.tableDrawerTop = null;
    this.tableDrawerMiddle = null;
    this.tableDrawerBottom = null;
    this.tableKeyboardStand = null;

    var that = this;

    this.translate = function (x, y, z) {
        that.tableTop.translate(new BABYLON.Vector3(x, y, z), 1, BABYLON.Space.WORLD);
        that.tableLegFL.translate(new BABYLON.Vector3(x, y, z), 1, BABYLON.Space.WORLD);
        that.tableLegBL.translate(new BABYLON.Vector3(x, y, z), 1, BABYLON.Space.WORLD);
        that.tableLegFR.translate(new BABYLON.Vector3(x, y, z), 1, BABYLON.Space.WORLD);
        that.tableLegBR.translate(new BABYLON.Vector3(x, y, z), 1, BABYLON.Space.WORLD);
        that.tableDrawerBase.translate(new BABYLON.Vector3(x, y, z), 1, BABYLON.Space.WORLD);
        that.tableDrawerTop.translate(new BABYLON.Vector3(x, y, z), 1, BABYLON.Space.WORLD);
        that.tableDrawerMiddle.translate(new BABYLON.Vector3(x, y, z), 1, BABYLON.Space.WORLD);
        that.tableDrawerBottom.translate(new BABYLON.Vector3(x, y, z), 1, BABYLON.Space.WORLD);
        that.tableKeyboardStand.translate(new BABYLON.Vector3(x, y, z), 1, BABYLON.Space.WORLD);

    }
    this.drawTable = function (scene, size) {
        //top
        var topWidth = size / 1.7;
        var topHeight = size / 100;
        var topDepth = size / 5;
        that.drawTableTop(scene, topHeight, topWidth, topDepth);

        //legs
        var legHeight = size / 3;
        var legWidth = size / 60;
        that.drawTableLegs(scene, legHeight, legWidth, topWidth, topDepth);

        //drawers
        var sideLegWidth = size / 100;
        var sideLegHeight = legHeight;
        that.drawDrawers(scene, sideLegHeight, sideLegWidth, topWidth, topDepth, topHeight);

        //translation
        that.translate(0.7*size, 5.27*size / 16, -0.3*size);
    },

        this.drawTableTop = function (scene, height, width, depth) {
        that.tableTop = BABYLON.MeshBuilder.CreateBox("top", { height: height, width: width, depth: depth, sideOrientation: BABYLON.Mesh.DOUBLESIDE  }, scene);
            var woodMaterial = new BABYLON.StandardMaterial("mat1", scene);
            woodMaterial.diffuseTexture = new BABYLON.Texture("/Content/textures/desk.jpg", scene);
            that.tableTop.material = woodMaterial;
        },

        this.drawTableLegs = function (scene, h, w, topW, topD) {
            //front left
            that.tableLegFL = BABYLON.MeshBuilder.CreateBox("leg", { height: h, width: w, depth: w }, scene);
            that.tableLegFL.translate(new BABYLON.Vector3(-topW / 2 + w / 2, -h / 2, -topD / 2 + w / 2), 1, BABYLON.Space.LOCAL);

            //back left
            that.tableLegBL = BABYLON.MeshBuilder.CreateBox("leg", { height: h, width: w, depth: w }, scene);
            that.tableLegBL.translate(new BABYLON.Vector3(-topW / 2 + w / 2, -h / 2, topD / 2 - w / 2), 1, BABYLON.Space.LOCAL);

            var woodMaterial = new BABYLON.StandardMaterial("mat1", scene);
            woodMaterial.diffuseTexture = new BABYLON.Texture("/Content/textures/desk.jpg", scene);
            that.tableLegFL.material = woodMaterial;
            that.tableLegBL.material = woodMaterial;
        },

        this.drawDrawers = function (scene, legH, legW, topW, topD, topH) {
            //side legs
            that.tableLegFR = BABYLON.MeshBuilder.CreateBox("leg", { height: legH, width: legW, depth: topD }, scene);
            that.tableLegFR.translate(new BABYLON.Vector3(topW / 2 - legW / 4, -legH / 2, 0), 1, BABYLON.Space.LOCAL);
            that.tableLegBR = BABYLON.MeshBuilder.CreateBox("leg", { height: legH, width: legW, depth: topD }, scene);
            that.tableLegBR.translate(new BABYLON.Vector3(topW * 0.18, -legH / 2, 0), 1, BABYLON.Space.LOCAL);

            //bottom
            var bottomH = legH * 0.1;
            var bottomW = topW * 0.31;
            var bottomD = topD * 0.95;
            that.tableDrawerBase = BABYLON.MeshBuilder.CreateBox("bottom", { height: bottomH, width: bottomW, depth: bottomD }, scene);
            that.tableDrawerBase.translate(new BABYLON.Vector3(topW / 2 - bottomW / 2, -legH + bottomH / 2, topD / 2 - bottomD / 2), 1, BABYLON.Space.LOCAL);

            var woodMaterial = new BABYLON.StandardMaterial("mat1", scene);
            woodMaterial.diffuseTexture = new BABYLON.Texture("/Content/textures/desk.jpg", scene);
            that.tableLegFR.material = woodMaterial;
            that.tableLegBR.material = woodMaterial;
            that.tableDrawerBase.material = woodMaterial;

            //drawers
            var drawerH = (legH - bottomH - topH) / 3;
            var drawerW = topW * 0.29;
            var drawerD = topD;
            that.tableDrawerTop = BABYLON.MeshBuilder.CreateBox("d1", { height: drawerH, width: drawerW, depth: drawerD }, scene);
            that.tableDrawerTop.translate(new BABYLON.Vector3(topW / 2 - drawerW / 2 - legW, -drawerH / 2 - topH / 2, 0), 1, BABYLON.Space.LOCAL);
            that.tableDrawerMiddle = BABYLON.MeshBuilder.CreateBox("d2", { height: drawerH, width: drawerW, depth: drawerD }, scene);
            that.tableDrawerMiddle.translate(new BABYLON.Vector3(topW / 2 - drawerW / 2 - legW, -drawerH * 1.5 - topH / 2, 0), 1, BABYLON.Space.LOCAL);
            that.tableDrawerBottom = BABYLON.MeshBuilder.CreateBox("d3", { height: drawerH, width: drawerW, depth: drawerD }, scene);
            that.tableDrawerBottom.translate(new BABYLON.Vector3(topW / 2 - drawerW / 2 - legW, -drawerH * 2.5 - topH / 2, 0), 1, BABYLON.Space.LOCAL);

            var drawerMaterial = new BABYLON.StandardMaterial("mat1", scene);
            drawerMaterial.diffuseTexture = new BABYLON.Texture("/Content/textures/drawer3.jpg", scene);
            drawerMaterial.bumpTexture = new BABYLON.Texture("/Content/textures/drawerN31.png", scene);
            that.tableDrawerTop.material = drawerMaterial;
            that.tableDrawerMiddle.material = drawerMaterial;
            that.tableDrawerBottom.material = drawerMaterial;


            
            var holeH = legH * 0.2;
            var holeW = 0.62 * topW;
            that.tableKeyboardStand = that.hole(scene, holeW, holeH, topD);
            that.tableKeyboardStand.translate(new BABYLON.Vector3(-topW / 2 + holeW / 2 + legW * 3, topD / 2, -holeH / 2 - topH / 2), 1, BABYLON.Space.LOCAL);

            var keyboardStandMaterial = new BABYLON.StandardMaterial("mat1", scene);
            keyboardStandMaterial.diffuseTexture = new BABYLON.Texture("/Content/textures/whiteDesk2.jpg", scene);
            that.tableKeyboardStand.material = keyboardStandMaterial;
        },

        this.rectangle = function (width, height, xOffset, yOffset, zOffset) {
            var shape = [
                new BABYLON.Vector3(width / 2 + xOffset, yOffset, height / 2 + zOffset),
                new BABYLON.Vector3(-width / 2 + xOffset, yOffset, height / 2 + zOffset),
                new BABYLON.Vector3(-width / 2 + xOffset, yOffset, -height / 2 + zOffset),
                new BABYLON.Vector3(width / 2 + xOffset, yOffset, -height / 2 + zOffset)
            ];

            return shape;
        },

        this.hole = function (scene, width, height, d) {
            var shape = that.rectangle(width, height, 0, 0, 0);
            var holes = [];
            holes[0] = that.rectangle(width * 0.95, height * 0.75, 0, 0, height * 0.1 * 0.75);
            var polygon = BABYLON.MeshBuilder.ExtrudePolygon("polygon", { shape: shape, holes: holes, depth: d, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
            polygon.rotate(new BABYLON.Vector3(1, 0, 0), -Math.PI / 2, BABYLON.Space.LOCAL);
            return polygon;
        }
}
