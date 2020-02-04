import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Item } from "./types";
import styled from "styled-components";
import { StyledListElement } from "./StyledListElement";
import { EditItem } from "./EditItem";
import { StyledButton } from "./StyledButton";
import { StyledPlusIcon } from "./Icons/StyledPlusIcon";
import { StyledLinkIcon } from "./Icons/StyledLinkIcon";

interface UpdateItem {
  index: number;
  value: string;
}

interface Props {
  item: Item;
  key: any;
  index: number;
  store: (data: UpdateItem) => void;
  addSubLink: (index: number) => void;
  editDefault: boolean;
}

interface TitleProps {
  readonly isActive: boolean;
}

const StyledName = styled.button`
  flex: 1;
  padding: 1rem;
  width: 100%;
  text-align: center;
  font-size: 2rem;
  background-color: inherit;
  outline: none;
  border: none;
`;

const StyledButtonContainer = styled.div`
  flex: 0;
  display: flex;
`;

const StyledLink = styled(Link)`
  display: block;
  height: 100%;
  width: 100%;
  text-decoration: none;
`;

export const DisplayItem: React.FC<Props> = ({
  item,
  index,
  store,
  addSubLink,
  editDefault
}) => {
  const [edit, setEdit] = useState(editDefault);

  function cancel() {
    setEdit(false);
  }

  function enableEdit() {
    setEdit(true);
  }

  return (
    <>
      {edit ? (
        <StyledListElement>
          <EditItem item={item} cancel={cancel} index={index} store={store} />
        </StyledListElement>
      ) : (
        <StyledListElement>
          <StyledName onClick={enableEdit}>{item.name}</StyledName>
          <StyledButtonContainer>
            {item.link !== "" && (
              <StyledLink to={`/${item.link}`}>
                <StyledLinkIcon />
              </StyledLink>
            )}
            {item.link === "" && (
              <StyledButton onClick={() => addSubLink(index)}>
                <StyledPlusIcon />
              </StyledButton>
            )}
          </StyledButtonContainer>
        </StyledListElement>
      )}
    </>
  );
};
