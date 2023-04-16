import React, { useState, useEffect } from "react";

const API_URL =
  "https://api.github.com/repos/matthewmiglio/py-clash-bot/releases/latest";

const ReleaseLink = ({ child, onClick }) => {
  const [releaseUrl, setReleaseUrl] = useState(
    "https://github.com/matthewmiglio/py-clash-bot/releases/latest"
  );

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setReleaseUrl(data.assets[0].browser_download_url);
      });
  }, []);

  return (
    <a
      className="release_link"
      href={releaseUrl}
      onClick={(event) => onClick(event, releaseUrl)}
      rel="preconnect"
    >
      {child}
    </a>
  );
};

export default ReleaseLink;
