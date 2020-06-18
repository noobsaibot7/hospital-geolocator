import React from "react";

import { Radio } from "antd";

interface Props {
    value: string;
    onChangeType: any;

  }
  

function SelectHealth({value, onChangeType}:Props) {
  function onChange(e:any) {
    onChangeType(e.target.value)
  }
  return (
    <Radio.Group onChange={onChange} defaultValue={value}>
      <Radio.Button value="hospital">HOSPITAL</Radio.Button>
      <Radio.Button value="clinic">CLINIC</Radio.Button>
      <Radio.Button value="pharmacy">PHARMACY</Radio.Button>
      <Radio.Button value="medical">MEDIC</Radio.Button>
    </Radio.Group>
  );
}


export default SelectHealth