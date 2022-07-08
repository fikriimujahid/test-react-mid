import styled from 'styled-components';
import { Link } from 'react-router-dom'; 

export const HeaderContainer = styled.div`
  background-color: #025FEB;
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 60px;
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 110px;
  padding-left: 40px;
  padding-top: 10px;
`;

export const OptionsContainer = styled.div`
  width: 25px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const OptionLink = styled(Link)`
  color: #FFFFFF;
  padding-right: 40px;
  font-size: 16px;
  justify-content: center;
  display: flex;
  text-decoration: none;
`;

export const OptionImage = styled.img`
  width: 25px;
  padding-right: 5px;
`;