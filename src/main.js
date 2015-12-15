GLBoost.TARGET_WEBGL_VERSION = 1;
var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 640;

phina.define('MainScene', {
  superClass: 'phina.display.CanvasScene',

  init: function(options) {
    this.superInit();

    var layer = phina.display.GLBoostLayer({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT
    }).addChildTo(this);

    var camera = new GLBoost.Camera({
      eye: new GLBoost.Vector4(0.0, 1.5, 10.0, 1),
      center: new GLBoost.Vector3(0.0, 1.5, 0.0),
      up: new GLBoost.Vector3(0.0, 1.0, 0.0)
    },{
      fovy: 45.0,
      aspect: 1.0,
      zNear: 0.1,
      zFar: 300.0
    });
    layer.scene.add(camera);

    var obj = phina.asset.AssetManager.get("mqo", "gradriel");
    var mesh = obj.getMesh(layer.canvas);
    layer.scene.add(mesh[0]);
    layer.scene.prepareForRender();

    layer.update = function() {
      var rotateMatrix = GLBoost.Matrix44.rotateY(-0.02);
      var rotatedVector = rotateMatrix.multiplyVector(camera.eye);
      camera.eye = rotatedVector;
    };

    var label = phina.display.Label('phina.jsとGLBoostの\n夢の共演！').addChildTo(this);
    label.fill = 'white';
    label.stroke = 'black';
    label.fontSize = 32;
    label.strokeWidth = 4;
    label.x = this.gridX.center();
    label.y = this.gridY.center();
  }
});

phina.main(function() {
  var app = phina.game.GameApp({
    assets: {
        mqo: {
            'gradriel': 'assets/gradriel_pose.mqo',
        },
    },
    startLabel: 'main',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  });

  app.run();
});
