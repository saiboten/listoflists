import styled from "styled-components";

export const StyledListElement = styled.li`
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background-color: #eae7d6;

  &:nth-child(2n) {
    background-color: white;
  }
`;
