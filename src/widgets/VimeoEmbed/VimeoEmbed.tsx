import React from "react";
import styles from "./styles.module.scss";

interface IVideoEmbedProps {
  url: string;
}

export const VimeoEmbed: React.FC<IVideoEmbedProps> = ({ url }) => {
  return (
    <div className={styles.container}>
      <iframe
        src={url}
        frameBorder="0"
        allow="fullscreen"
        title="Vimeo Video"
        allowFullScreen
      />
    </div>
  );
};
