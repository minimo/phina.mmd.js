phina.namespace(function() {

  //Add GLBoost object property accessor
  var addGLBAccessor = function(type, property, name) {
    if (name) {
      type.prototype.accessor(property, {
        get: function() {
          return this.glbObject[property][name];
        },
        set: function(v) {
          this.glbObject[property][name] = v;
        }
      });
    } else {
      type.prototype.accessor(property, {
        get: function() {
          return this.glbObject[property];
        },
        set: function(v) {
          this.glbObject[property] = v;
        }
      });
    }
  }

  phina.define('phina.glboost.Element', {
    superClass: 'phina.app.Object2D',

    glbObject: null,

    init: function(glbObject) {
      this.superInit();
      this.glbObject = glbObject || new GLBoost.Elemet();

      this.position = new GLBoost.Vector3(0, 0, 0);
      this.scale = new GLBoost.Vector3(1.0, 1.0, 1.0);
      this.rotate = new GLBoost.Vector3(0, 0, 0);
    },

    setPosition: function(x, y, z) {
      this.position.x = x;
      this.position.y = y;
      this.position.z = z;
    },

    setScale: function(x, y, z) {
      if (arguments.length === 1) {
        y = x;
        z = x;
      }
      this.scale.x = x;
      this.scale.y = y;
      this.scale.z = z;
    },

    setRotate: function(x, y, z) {
      this.rotate.x = x;
      this.rotate.y = y;
      this.rotate.z = z;
    },
  });

  phina.define('phina.glboost.Camera', {
    superClass: 'phina.glboost.Element',

    init: function(lookat, perspective) {
      var camera = new GLBoost.Camera(lookat, perspective);
      this.superInit(camera);
    },
  });
  addGLBAccessor(phina.glboost.Camera, "translate");
  addGLBAccessor(phina.glboost.Camera, "eye");
  addGLBAccessor(phina.glboost.Camera, "center");
  addGLBAccessor(phina.glboost.Camera, "up");
  addGLBAccessor(phina.glboost.Camera, "fovy");
  addGLBAccessor(phina.glboost.Camera, "aspect");
  addGLBAccessor(phina.glboost.Camera, "zNear");
  addGLBAccessor(phina.glboost.Camera, "zFar");


  phina.define('phina.glboost.Mesh', {
    superClass: 'phina.glboost.Element',

    init: function(param, canvas) {
      param = param || {};
      canvas = canvas || null;
      if (typeof param === 'string') {
        //アセットからロード
        var obj = phina.asset.AssetManager.get("mqo", param);
        if (obj) {
          var mesh = obj.getMesh(canvas);
          this.superInit(mesh);
        } else {
          console.warn('Asset not found.['+param+']');
        }
      } if (param instanceof GLBoost.Mesh) {
        //GLBoostのMeshをセット
        this.superInit(param);
      } else {
        //パラメータとしてジオメトリとマテリアルを渡してメッシュを生成
        param = param.$safe({
          geometry: null,
          material: null,
        });
        if (param.geometry && param.material) {
          var obj = new GLBoost.Mesh(param.geometry, param.material);
          this.superInit(obj);
        } else {
          console.warn('Mesh parameter error.');
          this.superInit();
        }
      }

      this.on('enterframe', this.onrender);
    },

    onrender: function(app) {
      this.glbObject.translate = this.position;
      this.glbObject.rotate = this.rotate;
      this.glbObject.scale = this.scale;
    },
  });
  addGLBAccessor(phina.glboost.Mesh, "geometry");
  addGLBAccessor(phina.glboost.Mesh, "material");
  addGLBAccessor(phina.glboost.Mesh, "translate");
  addGLBAccessor(phina.glboost.Mesh, "rotate");
  addGLBAccessor(phina.glboost.Mesh, "dirty");

});
