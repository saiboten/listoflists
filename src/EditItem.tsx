import React, { useState } from "react";
import styled from "styled-components";
import { ListItemProps } from "./types";

const StyledInput = styled.input`
  padding: 0.5rem 0;
  width: 100%;
  text-align: center;
`;

export const EditItem: React.FC<ListItemProps> = ({
  item,
  store,
  index,
  cancel
}) => {
  const [value, setValue] = useState(item.name);

  return (
    <StyledInput
      type="text"
      value={value}
      onBlur={() => {
        cancel();
        store({ index, value });
      }}
      onChange={e => setValue(e.target.value)}
    />
  );
};
