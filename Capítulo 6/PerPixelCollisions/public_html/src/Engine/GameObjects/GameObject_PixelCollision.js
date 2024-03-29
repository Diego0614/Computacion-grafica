
/*global GameObject */

GameObject.prototype.pixelTouches = function (otherObj, wcTouchPos) {
    // only continue if both objects have GetColorArray defined 
    // if defined, should have other texture intersection support!
    var pixelTouch = false;
    var myRen = this.getRenderable();
    var otherRen = otherObj.getRenderable();

    if ((typeof myRen.pixelTouches === "function") && (typeof otherRen.pixelTouches === "function")) {
        var otherBbox = otherObj.getBBox();
        if (otherBbox.intersectsBound(this.getBBox())) {
            myRen.setColorArray();
            otherRen.setColorArray();
            pixelTouch = myRen.pixelTouches(otherRen, wcTouchPos);
        }
    }
    return pixelTouch;
};