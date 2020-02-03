import React, { useState } from "react";
import styled from "styled-components";
import { ListItemProps } from "./types";

const StyledInput = styled.input`
  padding: 1rem;
  width: 100%;
  text-align: center;
  font-size: 2rem;
`;

export const EditItem: React.FC<ListItemProps> = ({
  item,
  store,
  index,
  cancel
}) => {
  const [value, setValue] = useState(item.name);

  function storeValue() {
    cancel();
    store({ index, value });
  }

  return (
    <StyledInput
      type="text"
      value={value}
      autoFocus
      onKeyPress={e => {
        if (e.key === "Enter") {
          storeValue();
        }
      }}
      onBlur={storeValue}
      onChange={e => setValue(e.target.value)}
    />
  );
};
