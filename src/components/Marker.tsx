import React from "react";
import { Icon } from "antd";

interface Props {
  name: string;
  key: any;
  lat: any;
  lng: any;
}

function Marker({ name, key }: Props) {
  return (
    <div key={key}>
      <span className="brand-red">{name}</span>
      <Icon
        className="font-1-5"
        type="environment"
        theme="twoTone"
        twoToneColor="#fd0000"
      />
    </div>
  );
}

export default Marker;
