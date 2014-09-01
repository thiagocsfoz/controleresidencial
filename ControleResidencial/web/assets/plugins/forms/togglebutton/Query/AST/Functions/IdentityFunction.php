pUnk">Unmanaged Component Object Model (COM)<see cref="T:Microsoft.DirectX.PrivateImplementationDetails.ID3DXLine" /> interface pointer.</param>
    </member>
    <member name="M:Microsoft.DirectX.Direct3D.Line.#ctor(System.IntPtr)">
      <summary>Uses a left-handed coordinate system to create a line.</summary>
      <param name="unmanagedObject">Pointer to an unmanaged Component Object Model (COM)<see cref="T:Microsoft.DirectX.PrivateImplementationDetails.ID3DXLine" /> interface. This parameter is useful for working with unmanaged applications from managed code. Not supported.</param>
    </member>
    <member name="M:Microsoft.DirectX.Direct3D.Line.#ctor(Microsoft.DirectX.Direct3D.Device)">
      <summary>Uses a left-handed coordinate system to create a line.</summary>
      <param name="device">A <see cref="T:Microsoft.DirectX.Direct3D.Device" /> object that represents the device associated with the created line.</param>
    </member>
    <member name="M:Microsoft.DirectX.Direct3D.Line.Dispose">
      <summary>Immediately releases the unmanaged resources used by the <see cref="T:Microsoft.DirectX.Direct3D.Line" /> object.</summary>
      <returns />
    </member>
    <member name="M:Microsoft.DirectX.Direct3D.Line.Draw(Microsoft.DirectX.Vector2[],System.Drawing.Color)">
      <summary>Draws a line strip in screen space. Input is in the form of an array that defines points (of <see cref="T:Microsoft.DirectX.Vector2" />) on the line strip.</summary>
      <param name="vertexList">Array of vertices that make up the line. For more information, see <see cref="T:Microsoft.DirectX.Vector2" />.</param>
      <param name="color">A <see cref="T:System.Drawing.Color" /> object that specifies the color of the line.</param>
      <returns />
    </member>
    <member name="M:Microsoft.DirectX.Direct3D.Line.Draw(Microsoft.DirectX.Vector2[],System.Int32)">
      <summary>Draws a line strip in screen space. Input is in the form of an array that defines points (of <see cref="T:Microsoft.DirectX.Vector2" />) on the line strip.</summary>
      <param name="vertexList">Array of vertices that make up the line. For more information, see <see cref="T:Microsoft.DirectX.Vector2" />.</param>
      <param name="color">An <see cref="T:System.Int32" /> color value that specifies the color of the line.</param>
      <returns />
    </member>
    <member name="M:Microsoft.DirectX.Direct3D.Line.DrawTransform(Microsoft.DirectX.Vector3[],Microsoft.DirectX.Matrix,System.Drawing.Color)">
      <summary>Draws a line strip in screen space with a specified input transformation matrix.</summary>
      <param name="vertexList">Array of vertices that make up the line. For more information, see <see cref="T:Microsoft.DirectX.Vector2" />.</param>
      <param name="transform">Scale, rotate, and translate (SRT) matrix for transforming the points. For more information, see <see cref="T:Microsoft.DirectX.Matrix" />. If this matrix is a projection matrix, any stippled lines are drawn with a perspective-correct stippling pattern. Or, vertices can be transformed and <see cref="M:Microsoft.DirectX.Direct3D.Line.Draw" /> used to draw the line with a stipple pattern and no perspective correction.</param>
      <param name="color">A <see cref="T:System.Drawing.Color" /> object that specifies the color of the line.</param>
      <returns />
    </member>
    <member name="M:Microsoft.DirectX.Direct3D.Line.DrawTransform(Microsoft.DirectX.Vector3[],Microsoft.DirectX.Matrix,System.Int32)">
      <summary>Draws a line strip in screen space with a specified input transformation matrix.</summary>
      <param name="vertexList">Array of vertices that make up the line. For more information, see <see cref="T:Microsoft.DirectX.Vector2" />.</param>
      <param name="transform">Scale, rotate, and translate (SRT) matrix for transforming the points. For more information, see <see cref="T:Microsoft.DirectX.Matrix" />. If this matrix is a projection matrix, any stippled lines are drawn with a perspective-correct stippling pattern. Or, vertices can be transformed and <see cref="M:Microsoft.DirectX.Direct3D.Line.Draw" /> used to draw the line 