import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Item } from "./types";
import styled from "styled-components";
import { StyledListElement } from "./StyledListElement";
import { EditItem } from "./EditItem";
import { StyledButton } from "./StyledButton";
import { ReactComponent as ChangeIcon } from "./Icons/change.svg";
import { StyledPlusIcon } from "./Icons/StyledPlusIcon";

const StyledChangeIcon = styled(ChangeIcon)`
  width: 32px;
  height: 32px;
  transform: translateX(5px) translateY(5px);
`;

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

const StyledName = styled.div`
  flex: 1;
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
          {item.link !== "" ? (
            <StyledLink to={`/${item.link}`}>{item.name}</StyledLink>
          ) : (
            <StyledName>{item.name}</StyledName>
          )}
          <StyledButtonContainer>
            <StyledButton onClick={enableEdit}>
              <StyledChangeIcon />
            </StyledButton>
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
