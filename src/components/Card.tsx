import React from "react";
import { Rate } from "antd";

// import image from "./images/no-image.jpg";

interface Place {
  address: string;
  distanceText: string;
  name: string;
  openNow: string;
  photoUrl: string;
  rating: number;
  timeText: string;
}

interface Props {
  info: Place;
  key: string;
}

const Card: React.FC<Props> = ({ info, key }) => {
  const {
    address,
    distanceText,
    name,
    openNow,
    photoUrl,
    rating,
    timeText
  }: Place = info;
  return (
    <div key={key} className="col-3 w-100 mx-4 my-4">
      {/* 
      API for photoservices needs billing before image can be displayed
      <img
        src={photoUrl ? photoUrl : image}
        className="image-wrapper-sm mb-2"
        alt="hospital"
      /> */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <span className="d-block mb-1">{address}</span>
          <span className="d-block">{distanceText}</span>
          <span className="d-block">{timeText}</span>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{openNow ? "Open" : "Closed"}</li>
          <li className="list-group-item">
            Rating - <Rate value={rating} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Card;
