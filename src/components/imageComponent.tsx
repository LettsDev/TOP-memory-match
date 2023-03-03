import React from "react";
interface PropType {
  imgSource: string;
  id: string;
}
export default function ImageComponent(props: PropType) {
  return (
    <img
      src={props.imgSource}
      className="animal-img"
      id={props.id}
      key={props.id}
      alt="animal-pic"
    />
  );
}
