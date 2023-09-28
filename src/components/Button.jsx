import styled from "styled-components"

const StyledButton = styled.button`
  --color: ${props => props.color || "#1c1b1d"};

  font-family: inherit;
  display: inline-block;
  width: 8em;
  height: 2.6em;
  line-height: 2.5em;
  margin: 20px;
  position: relative;
  overflow: hidden;
  border: 2px solid var(--color);
  transition: color 0.5s;
  z-index: 1;
  font-size: 17px;
  border-radius: 6px;
  font-weight: 500;
  color: var(--color);

  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    background: var(--color);
    height: 150px;
    width: 200px;
    border-radius: 50%;
  }

  &:hover {
    color: #fff;
  }

  &:before {
    top: 100%;
    left: 100%;
    transition: all 0.7s;
  }

  &:hover:before {
    top: -30px;
    left: -30px;
  }

  &:active:before {
    background: ${props => props.background || "none"};
    transition: background 0s;
  }
`

export default StyledButton
