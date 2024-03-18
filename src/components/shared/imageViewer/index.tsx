import { FC } from 'react'
import ImageViewer from "react-simple-image-viewer";
import { Box, Image } from '@chakra-ui/react'

interface ImgViewerProps {
  isViewerOpen: boolean;
  openImageViewer: () => void;
  closeImageViewer: () => void;
  path: string;
}

const ImgViewer: FC<ImgViewerProps> = ({path, isViewerOpen, closeImageViewer}) => {
    const images = [
        path,
    ];


  return (
    <Box>
      {isViewerOpen && (
        <ImageViewer
          src={images}
          currentIndex={0}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
    </Box>
  );
}

export default ImgViewer