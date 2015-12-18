var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 640;

phina.define('MainScene', {
  superClass: 'phina.display.CanvasScene',

  init: function(options) {
    this.superInit();

    var layer = this.layer = phina.display.ThreeLayer({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT
    }).addChildTo(this);
    layer.camera.position.x = 0;
    layer.camera.position.y = 10;
    layer.camera.position.z = 30;
//    layer.camera.lookAt(0, 0, 0);

    var mesh = phina.three.Mesh('gradriel').addChildTo(layer);
    mesh.update = function() {
        this.rotation.y+=0.01;
    }

    var label = phina.display.Label('phina.jsとThree\n連携テスト').addChildTo(this);
    label.fill = 'white';
    label.stroke = 'black';
    label.fontSize = 32;
    label.strokeWidth = 4;
    label.x = this.gridX.center();
    label.y = this.gridY.center();
  },
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
