import React from "react";

interface IVideoEmbedProps {
  url: string;
}

export const VimeoEmbed: React.FC<IVideoEmbedProps> = ({ url }) => {
  return (
    <div>
      <iframe
        src={url}
        width="100%"
        height="100%"
        frameBorder="0"
        allow=""
        title="Vimeo Video"
      />
    </div>
  );
};
