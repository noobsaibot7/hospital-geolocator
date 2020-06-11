import React from "react";
import { Icon, Slider as MapSlider } from "antd";

interface Props {
  iconType: string;
  value?: number;
  onChange: ((value: any) => void) | undefined;
  text: string;
}

function Slider({ iconType, value, onChange, text }: Props) {
  return (
    <section className="d-flex flex-column">
      <div className="d-flex w-100 align-items-center">
        <Icon className="font-1-5 mr-4" type={iconType} />
        <MapSlider
          className="w-100"
          value={value}
          min={1}
          max={50}
          onChange={onChange}
        />
      </div>
      <span className="text-center fw-md">{text}</span>
    </section>
  );
}

export default Slider;
