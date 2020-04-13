import { defined } from "../Source/Cesium.js";
import { destroyObject } from "../Source/Cesium.js";
import { Pass } from "../Source/Cesium.js";
import { RenderState } from "../Source/Cesium.js";

var ViewportPrimitive = function (fragmentShader) {
  this._fs = fragmentShader;
  this._command = undefined;
};

ViewportPrimitive.prototype.update = function (frameState) {
  if (!defined(this._command)) {
    this._command = frameState.context.createViewportQuadCommand(this._fs, {
      renderState: RenderState.fromCache(),
      pass: Pass.OPAQUE,
    });
  }
  frameState.commandList.push(this._command);
};

ViewportPrimitive.prototype.isDestroyed = function () {
  return false;
};

ViewportPrimitive.prototype.destroy = function () {
  if (defined(this._command)) {
    this._command.shaderProgram = this._command.shaderProgram && this._command.shaderProgram.destroy();
  }
  return destroyObject(this);
};
export default ViewportPrimitive;
