phina.namespace(function() {
phina.asset.AssetLoader.assetLoadFunctions['mmd'] = function(key, path) {
  var texture = phina.asset.Texture();
  var flow = texture.load(path);
  return flow;
}
});
