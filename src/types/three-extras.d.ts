declare module 'three/examples/jsm/loaders/MTLLoader' {
  import { Loader, LoadingManager, MaterialCreator } from 'three';
  export class MTLLoader extends Loader {
    constructor(manager?: LoadingManager);
    load(
      url: string,
      onLoad: (materialCreator: MaterialCreator) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
    setMaterialOptions(value: object): this;
  }
}

declare module 'three/examples/jsm/loaders/OBJLoader' {
  import { Loader, LoadingManager, Group } from 'three';
  import { MaterialCreator } from 'three/examples/jsm/loaders/MTLLoader';

  export class OBJLoader extends Loader {
    constructor(manager?: LoadingManager);
    setMaterials(materials: MaterialCreator): this;
    load(
      url: string,
      onLoad: (group: Group) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
  }
}
