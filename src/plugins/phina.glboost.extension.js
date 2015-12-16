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
    superClass: 'phina.display.CanvasElement',

    glbObject: null,

    init: function(glbObject) {
      this.superInit();
      this.glbObject = glbObject || null;
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

    init: function(glbObject) {
      this.superInit(glbObject);
    },
  });
  addGLBAccessor(phina.glboost.Mesh, "geometry");
  addGLBAccessor(phina.glboost.Mesh, "material");
});
