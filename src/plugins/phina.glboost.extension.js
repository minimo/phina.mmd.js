phina.namespace(function() {

  phina.define("phina.glboost.DelegateUtil", {
    init: function(type) {
      this.type = type;
    },
    property: function(name, glbProperty) {
      if (glbProperty) {
        this.type.prototype.accessor(name, {
          get: function() {
            return this.glbObject[glbProperty][name];
          },
          set: function(v) {
            this.glbObject[glbProperty][name] = v;
          }
        });
      } else {
        this.type.prototype.accessor(name, {
          get: function() {
            return this.glbObject[name];
          },
          set: function(v) {
            this.glbObject[name] = v;
          }
        });
      }
      this.type.prototype[createSetterName(name)] = function(v) {
        this[name] = v;
        return this;
      };
    },
    method: function(name, returnThis, glbProperty) {
      if (glbProperty) {
        this.type.prototype[name] = function() {
          var r = this.glbObject[glbProperty][name].apply(this.glbObject[glbProperty], arguments);
          if (returnThis) {
            return this;
          } else {
            return r;
          }
        }
      } else {
        this.type.prototype[name] = function() {
          var r = this.glbObject[name].apply(this.glbObject, arguments);
          if (returnThis) {
            return this;
          } else {
            return r;
          }
        }
      }
    },
  });
  function createSetterName(propertyName) {
    return "set" + propertyName[0].toUpperCase() + propertyName.substring(1);
  }
});

phina.namespace(function() {

  phina.define('phina.glboost.Element', {
    superClass: 'phina.app.Object2D',

    glbObject: null,

    init: function(glbObject) {
      this.glbObject = glbObject || new GLBoost.Element();
      this.superInit();
/*
      this.position = new GLBoost.Vector3(0, 0, 0);
      this.scale = new GLBoost.Vector3(1.0, 1.0, 1.0);
      this.rotation = new GLBoost.Vector3(0, 0, 0);
*/
    },

    _accessor: {
      translate: {
        set: function(v) {
          this.positon = v;
          this.glbObject.translate = v;
        },
        get: function() {
          return this.glbObject.translate;
        },
      },
      position: {
        set: function(v) {
          this.positon = v;
          this.glbObject.translate = v;
        },
        get: function() {
          return this.glbObject.translate;
        },
      },
      rotate: {
        set: function(v) {
          this.glbObject.rotate = v;
        },
        get: function() {
          return this.glbObject.rotate;
        },
      },
      rotation: {
        set: function(v) {
          this.glbObject.rotate = v;
        },
        get: function() {
          return this.glbObject.rotate;
        },
      },
      scale: {
        set: function(v) {
          this.glbObject.scale = v;
        },
        get: function() {
          return this.glbObject.scale;
        },
      },
    },
  });
  var delegater = phina.glboost.DelegateUtil(phina.glboost.Element);
  delegater.property("dirty");
});

phina.namespace(function() {

  phina.define('phina.glboost.Camera', {
    superClass: 'phina.glboost.Element',

    init: function(lookat, perspective) {
      var camera = new GLBoost.Camera(lookat, perspective);
      this.superInit(camera);
    },
  });
  var delegater = phina.glboost.DelegateUtil(phina.glboost.Camera);
  delegater.property("eye");
  delegater.property("center");
  delegater.property("up");
  delegater.property("aspect");
  delegater.property("zNear");
  delegater.property("zFar");
});

phina.namespace(function() {

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
    },
  });
  var delegater = phina.glboost.DelegateUtil(phina.glboost.Mesh);
  delegater.property("geometry");
  delegater.property("material");
});
