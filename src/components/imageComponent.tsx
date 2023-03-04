import React from "react";
interface PropType {
  imgSource: string;
  id: string;
  handleClick(ev: React.MouseEvent<HTMLImageElement>): void;
}
export default function ImageComponent(props: PropType) {
  return (
    <img
      src={props.imgSource}
      className="animal-img"
      id={props.id}
      key={props.id}
      alt="animal-pic"
      onClick={props.handleClick}
    />
  );
}
