var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 960;

phina.define('MainScene', {
  superClass: 'phina.display.CanvasScene',

  init: function(options) {
    this.superInit();

    //Three.js用レイヤー
    var layer = this.layer = phina.display.ThreeLayer({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT
    }).addChildTo(this);
    layer.renderer.setClearColor(0xB0B0F0);
    layer.scene.remove(layer.light);

    //カメラ位置の変更
    layer.camera.position.x = 0;
    layer.camera.position.y = 10;
    layer.camera.position.z = 20;

    //アンビエントライト（環境光）の追加
    var ambientLight = phina.three.AmbientLight(0x555555).addChildTo(layer);
    var camera = phina.three.Camera().addChildTo(layer);


    //メッシュの追加
    var mesh = phina.three.Mesh('miku_wave').addChildTo(layer);
/*
    var threeMesh = phina.three.createThreeMeshFromMMD("miku", "wavefile");
    var mesh = phina.three.Mesh(threeMesh).addChildTo(layer);
*/
    THREE.AnimationHandler.update(0);

    // 2Dスプライトも併用可能
    var hiyoko = phina.display.Sprite("hiyoko", 32, 32)
      .setScale(3)
      .setFrameIndex(0)
      .addChildTo(this)
      .on("enterframe", function() {
        this.x += this.vx * 10;
        this.y += this.vy * 10;
        if (this.x < 0 || SCREEN_WIDTH < this.x) this.vx *= -1;
        if (this.y < 0 || SCREEN_HEIGHT < this.y) this.vy *= -1;
        this.frameIndex = (this.frameIndex + 1) % 4;
        this.rotation += 2;
      });
    hiyoko.vx = 1;
    hiyoko.vy = 1;

    var label = phina.display.Label('WaveFile').addChildTo(this);
    label.fill = 'white';
    label.stroke = 'black';
    label.fontSize = 32;
    label.strokeWidth = 4;
    label.x = this.gridX.center();
    label.y = this.gridY.center();
    label.tweener.clear().fadeOut(3000);

    //音楽再生
    var snd = phina.asset.AssetManager.get("sound", "wavefile");
    snd.play(false);

  },

  update: function(app) {
    THREE.AnimationHandler.update(app.deltaTime/1000);
  },
});

phina.main(function() {
  var app = phina.game.GameApp({
    assets: {
      image: {
        'hiyoko': 'assets/hiyoco_nomal_full.png',
      },
      mmd: {
        'miku_wave': {
            pmd: 'assets/pmd/miku_v2.pmd',
            vmd: 'assets/vmd/wavefile_v2.vmd',
        },
      },
      pmd: {
        'miku': 'assets/pmd/miku_v2.pmd',
      },
      vmd: {
        'wavefile': 'assets/vmd/wavefile_v2.vmd',
      },
      sound: {
        'wavefile': 'assets/smile.mp3',
      },
    },
    startLabel: 'main',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  });

  app.run();
});
