import * as CANNON from "cannon-es";

export const world : CANNON.World = new CANNON.World({gravity: new CANNON.Vec3(0,-10,0)});