function Scene() {}
Scene.prototype.loadScene = function () {
    // override to load scene specific contents
};
// Performs all initialization functions
//   => Should call gEngine.GameLoop.start(this)!
Scene.prototype.initialize = function () {
    // initialize the level (called from GameLoop)
};
// Update function to be called form EngineCore.GameLoop
Scene.prototype.update = function () {
    // when done with this level should call:
    // GameLoop.stop() ==> which will call this.unloadScene();
};
// draw function to be called from EngineCore.GameLoop
Scene.prototype.draw = function () {};
// Must unload all resources
Scene.prototype.unloadScene = function () {
    // .. unload all resources
};