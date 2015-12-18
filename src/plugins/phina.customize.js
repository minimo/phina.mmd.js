phina.namespace(function() {

  //ThreeLayer��addChild��ύX
  phina.display.ThreeLayer.prototype.addChild: function(child) {
    //GLBoostObject�ǉ�
    if (child.threeObject) this.scene.add(child.threeObject);

    //�ʏ��addChild
    return this.superClass.prototype.addChild.apply(this, arguments);
  }

  //�A�Z�b�g���[�_�[�ǉ�
  phina.asset.AssetLoader.assetLoadFunctions['mqo'] = function(key, path) {
    var mqo = phina.asset.MQO();
    var flow = mqo.load(path);
    return flow;
  }
  phina.asset.AssetLoader.assetLoadFunctions['threeJSON'] = function(key, path) {
    var mqo = phina.asset.MQO();
    var flow = mqo.load(path);
    return flow;
  }
  phina.asset.AssetLoader.assetLoadFunctions['vox'] = function(key, path) {
    var mqo = phina.asset.MQO();
    var flow = mqo.load(path);
    return flow;
  }
});
