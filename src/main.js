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
    layer.renderer.setClearColor(0x000000);

    var mesh = phina.three.Mesh('gradriel').addChildTo(layer);
    mesh.update = function() {
        this.rotation.y+=0.02;
    }

    var label = phina.display.Label('phina.jsとThree.js\n連携テスト').addChildTo(this);
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
      mmd: {
        'miku': {
            pmd: 'assets/pmd/miku_v2.pmd',
            vmd: 'assets/vmd/wavefile_v2.vmd',
        },
      },
    },
    startLabel: 'main',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  });

  app.run();
});
