le), 0,
0, 1, 0, 0,
-Math.sin(angle), 0, Math.cos(angle), 0,
0, 0, 0, 1);
};
/**
* Returns a matrix that rotates a vector around the z axis, from the origin. The rotation matrix
* is a right handed rotation, a positive angle will rotate the vector anticlockwise around the z axis
* @param {number} angle The angle to rotate in radians
* @return {Matrix4x4}
*/
Matrix4x4.createRotationZ = function (angle) {
return new Matrix4x4(Math.cos(angle), -Math.sin(angle), 0, 0,
Math.sin(angle), Math.cos(angle), 0, 0,
0, 0, 1, 0,
0, 0, 0, 1);
};
Matrix4x4.prototype =
{
/**
* Adds matrix m to to the current matrix and returns the result
* @param {Matrix4x4} m The matrix which will be added to the calling matrix
* @return {Matrix4x4}
*/
add: function add(m) {
return new Matrix4x4(this.m11 + m.m11, this.m12 + m.m12, this.m13 + m.m13, this.m14 + m.m14,
this.m21 + m.m21, this.m22 + m.m22, this.m23 + m.m23, this.m24 + m.m24,
this.m31 + m.m31, this.m32 + m.m32, this.m33 + m.m33, this.m34 + m.m34,
this.m41 + m.m41, this.m42 + m.m42, this.m43 + m.m43, this.m44 + m.m44);
},
/**
* Adds matrix m to to the current matrix and returns the result
* @