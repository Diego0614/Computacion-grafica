
function SimpleShader(vertexShaderID, fragmentShaderID) {
    this.mViewProjTransform = null;
    this.mModelTransform = null;
    // reference to the pixelColor uniform in the fragment shader
    this.mPixelColor = null;
    // instance variables (Convention: all instance variables: mVariables)
    this.mCompiledShader = null;
    // reference to the compiled shader in webgl context
    this.mShaderVertexPositionAttribute = null;
    // reference to SquareVertexPosition in shader
    var gl = gEngine.Core.getGL();
    // start of constructor code
    // Step A: load and compile vertex and fragment shaders
    var vertexShader = this._CompileShader(vertexShaderID, gl.VERTEX_SHADER);
    var fragmentShader = this._CompileShader(fragmentShaderID, gl.FRAGMENT_SHADER);
    // Step B: Create and link the shaders into a program.
    this.mCompiledShader = gl.createProgram();
    gl.attachShader(this.mCompiledShader, vertexShader);
    gl.attachShader(this.mCompiledShader, fragmentShader);
    gl.linkProgram(this.mCompiledShader);
    // Step C: check for error
    if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
        alert("Error linking shader");
        return null;
    }
    // Step D: Gets a reference to the aSquareVertexPosition attribute
    this.mShaderVertexPositionAttribute = gl.getAttribLocation(this.mCompiledShader, "aSquareVertexPosition");
    // Step E: Activates the vertex buffer loaded in Engine.Core_VertexBuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLVertexRef());
    // Step F: Describe the characteristic of the vertex position attribute
    gl.vertexAttribPointer(this.mShaderVertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    // Step G: references: uniforms: uModelTransform, uPixelColor, and uViewProjTransform
    this.mPixelColor = gl.getUniformLocation(this.mCompiledShader, "uPixelColor");
    this.mModelTransform = gl.getUniformLocation(this.mCompiledShader, "uModelTransform");
    this.mViewProjTransform = gl.getUniformLocation(this.mCompiledShader, "uViewProjTransform");
}
// Loads per-object model transform to the vertex shader
SimpleShader.prototype.loadObjectTransform = function (modelTransform) {
    var gl = gEngine.Core.getGL();
    // loads the modelTransform matrix into webGL to be used by the vertex shader
    gl.uniformMatrix4fv(this.mModelTransform, false, modelTransform);
};
// Returns a complied shader from a shader in the dom.
// The id is the id of the script in the html tag.
SimpleShader.prototype._CompileShader = function (filePath, shaderType) {
    var gl = gEngine.Core.getGL();
    var shaderSource = null, compiledShader = null;
// Step A: Access the shader textfile
    shaderSource = gEngine.ResourceMap.retrieveAsset(filePath);
    if (shaderSource === null) {
        alert("WARNING: Loading of:" + filePath + " Failed!");
        return null;
    }
    // Step B: Create the shader based on the shader type: vertex or fragment
    compiledShader = gl.createShader(shaderType);
    // Step C: Compile the created shader
    gl.shaderSource(compiledShader, shaderSource);
    gl.compileShader(compiledShader);
    // Step D: check for errors and return results (null if error)
    // The log info is how shader compilation errors are typically displayed.
    // This is useful for debugging the shaders.
    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
        alert("A shader compiling error occurred: " + gl.getShaderInfoLog(compiledShader));
    }
    return compiledShader;
};

SimpleShader.prototype.activateShader = function (pixelColor, vpMatrix) {
    var gl = gEngine.Core.getGL();
    gl.useProgram(this.mCompiledShader);
    gl.uniformMatrix4fv(this.mViewProjTransform, false, vpMatrix);
    gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLVertexRef());
    gl.vertexAttribPointer(this.mShaderVertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);             // offsets to the first element
    gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
    gl.uniform4fv(this.mPixelColor, pixelColor);
};

SimpleShader.prototype.getShader = function () {
    return this.mCompiledShader;
};



















