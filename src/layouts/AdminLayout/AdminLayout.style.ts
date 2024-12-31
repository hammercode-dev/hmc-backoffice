import styled, { css } from "styled-components";

export const SidebarWrapper = styled.div<{ $width: number }>`
  position: fixed;
  left: 0px;
  top: 0px;
  bottom: 0px;
  ${(props) => css`width: ${props.$width}px`} ;
  z-index: 1;
  overflow-y: auto;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`
