tHandle" /> class that represents the constant.</returns>
    </member>
    <member name="M:Microsoft.DirectX.Direct3D.ConstantTable.GetConstant(Microsoft.DirectX.Direct3D.EffectHandle,System.Int32)">
      <summary>Retrieves a constant by looking up its index or by name.</summary>
      <param name="constant">An <see cref="T:Microsoft.DirectX.Direct3D.EffectHandle" /> that serves as a unique identifier to the parent data structure. If the constant is a top-level parameter (that is, if there is no parent data structure), use 0.</param>
      <param name="index">Zero-based index of the constant.</param>
      <returns>An <see cref="T:Microsoft.DirectX.Direct3D.EffectHandle" /> class that represents the constant.</returns>
    </member>
    <member name="M:Microsoft.DirectX.Direct3D.ConstantTable.GetConstantDescription(Microsoft.DirectX.Direct3D.EffectHandle,System.Int32)">
      <summary>Retrieves an array of constant descriptions in the constant table.</summary>
      <param name="constant">An <see cref="T:Microsoft.DirectX.Direct3D.EffectHandle" /> class that uniquely identifies a constant.</param>
      <param name="numberConstants">[in, out] Input supplied must be the maximum size of the array. Output is the number of elements that are filled in the array when the function returns.</param>
      <returns>Array of descriptions. For more information, see <see cref="T:Microsoft.DirectX.Direct3D.ConstantDescription" />.</returns>
    </member>
    <member name="M:Microsoft.DirectX.Direct3D.ConstantTable.GetConstantElement(Microsoft.DirectX.Direct3D.EffectHandle,System.Int32)">
      <summary>Retrieves a constant from an array of constants.</summary>
      <param name="constant">An <see cref="T:Microsoft.DirectX.Direct3D.EffectHandle" /> class that uniquely identifies the array of constants. This value cannot be 0.</param>
      <param name="index">Zero-based index of the element in the array.</param>
      <returns>An <see cref="T:Microsoft.DirectX.Direct3D.EffectHandle" /> that uniquely identifies the constant.</returns>
    </member>
    <member name="M:Microsoft.DirectX.Direct3D.ConstantTable.GetHashCode">
      <summary>Returns the hash code for the current instance.</summary>
      <returns>Hash code for the instance.</returns>
    </member>
    <member name="M:Microsoft.DirectX.Direct3D.ConstantTable.GetObjectByValue(System.Int32)">
      <summary>This member supports the infrastructure for Microsoft DirectX 9.0 for Managed Code and is not intended to be used directly from your code.</summary>
      <param name="uniqueKey">Object identifier.</param>
      <returns>Pointer to the unmanaged Component Object Model (COM) interface, ID3DXConstantTable, which allows unmanaged COM clients to create an instance of the managed <see cref="T:Microsoft.DirectX.Direct3D.ConstantTable" /> class. Not supported.</returns>
    </member>
    <member name="M:Microsoft.DirectX.Direct3D.ConstantTable.GetSamplerIndex(Microsoft.DirectX.Direct3D.EffectHandle)">
      <summary>Retrieves the sampler index.</summary>
      <param name="constant">An <see cref="T:Microsoft.DirectX.Direct3D.EffectHandle" /> object that represents the unique identifier for the sampler whose index is to be retrieved.</param>
      <returns>The sampler index number from the constant table.</returns>
    </member>
    <member name="M:Microsoft.DirectX.Direct3D.ConstantTable.op_Equality(Microsoft.DirectX.Direct3D.ConstantTable,Microsoft.DirectX.Direct3D.ConstantTable)">
      <summary>Compares the current instance of a class to another instance to determine whether they are the same.</summary>
      <param name="left">The <see cref="T:Microsoft.DirectX.Direct3D.ConstantTable" /> object to the left of the equality operator.</param>
      <param name="right">The <see cref="T:Microsoft.DirectX.Direct3D.ConstantTable" /> object to the right of the equality operator.</param>
      <returns>Returns true if the objects are the same; otherwise, false.</returns>
    </member>
    <member name="M:Microsoft.DirectX.Direct3D.ConstantTable.op_Inequality(Microsoft.DirectX.Direct3D.ConstantTable,Microsoft.DirectX.Direct3D.ConstantTable)">
      <summary>Compares the current instance of a class to another instance to determine whether they are different.</summary>
      <param name="left">The <see cref="T:Microsoft.DirectX.Direct3D.ConstantTable" /> object to the left of the equality operator.</param>
      <param name="right">The <see cref="T:Microsoft.DirectX.Direct3D.ConstantTable" /> object to the right of the equality operator.</param>
      <returns>Returns true if the objects are different; otherwise, false.</returns>
    </member>
    <member name="M:Microsoft.DirectX.Direct3D.ConstantTable.raise_Disposing(System.Object,System.EventArgs)">
      <summary>Raises the <see cref="E:Microsoft.DirectX.Direct3D.ConstantTable.Disposing" /> event when called from within a derived class.</summary>
      <param name="i1">Invoking object reference; should be this object.</param>
      <param name="i2">Arguments to pass to the event handler.</param>
      <returns />
    </member>
    <member name="M:Microsoft.DirectX.Direct3D.ConstantTable.SetDefaults(Microsoft.DirectX.Direct3D