import React from "react";
import { Animal } from "../types";
interface PropType {
  children: JSX.Element;
  animalData: Animal;
}
export default function Card(props: PropType) {
  return (
    <div className="card-container" key={`card-${props.animalData.id}`}>
      {props.children}
      <div className="card-detail-container">
        <p className="animal-name">{props.animalData.name}</p>
        <a
          href={props.animalData.url}
          target="_blank"
          rel="noreferrer"
          className="link-adopt"
        >
          i
        </a>
      </div>
    </div>
  );
}
