import { KaboomCtx } from "kaboom";
import { scale } from "./constants";

export async function makeMap(k: KaboomCtx, name: string) {
  const mapData = await (await fetch(`./${name}.json`)).json();

  const map = k.make([k.sprite(name), k.scale(scale), k.pos(0)])

  const spawnPoints: { [key: string] : {x: number, y: number} } = {};

  for (const layer of mapData.layers) {
    if (layer.name === "Colliders") {
      for (const collider of layer.objects) {
        map.add([
          k.area({
            shape: new k.Rect(k.vec2(0), collider.width, collider.height),
            collisionIgnore: ["Platform", "Exit"],
          }),
          collider.name !== "Exit" ? k.body({isStatic: true}) : null,
          k.pos(collider.x, collider.y),
          collider.name !== "Exit" ? "Platform" : "Exit"
        ]);
      }
      continue;
    }

    if (layer.name === "Spawnpoints") {
      for (const spawnPoint of layer.objects) {
        if (spawnPoints[spawnPoint.name]) {
          spawnPoints[spawn]
        }
      }
    }
  }
}