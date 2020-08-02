import { Map } from "./model/Map";
import { MapView } from "./view/MapView";
import { GameController } from "./controller/GameController";
import './style.css'


let map = new Map(10, 10);
let controller = new GameController(map);
let mapView = new MapView(map, controller);

controller.start();

document.body.append(mapView.render());
