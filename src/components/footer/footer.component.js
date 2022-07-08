import React, { useState, useEffect, useCallback } from 'react';
import { getVersion } from "../../services/ApiService";
import { FooterContainer, RightText } from "./footer.style";

const Footer = () => {
  const [version, setVersion] = useState([]);
  // const [error, setError] = useState(null);

  const fetchVersionHandler = useCallback(async () => {
    try{
      await getVersion().then((response) => {
        setVersion(response.data)
      })
    } catch (err) {
      // setError(err.message);
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchVersionHandler();
  }, [fetchVersionHandler]);

  return (
    <FooterContainer>
      <RightText>API Version: {version.version}</RightText>
    </FooterContainer>
  )
}

export default Footer;