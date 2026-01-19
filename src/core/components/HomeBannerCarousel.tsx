import { FC } from "react";
import { Box, useMediaQuery } from "@mui/material";
import AliceCarousel from "react-alice-carousel";
import PrevIcon from "./PrevIcon";
import NextIcon from "./NextIcon";


export const HomeBannerCarousel: FC<{ images: any[] }> = (props) => {
  const renderDotsItems = (event: { isActive: boolean }) => {
    if (event.isActive) {
      return <Box bgcolor="rgba(0, 0, 0, 1)" width="8px" height="8px" borderRadius="50%" mx="8px" />;
    } else {
      return <Box bgcolor="rgba(0, 0, 0, 0.4)" width="8px" height="8px" borderRadius="50%" mx="8px" />;
    }
  };

  const renderPrevButton = (event: { isDisabled: boolean }) => {
    return <PrevIcon color="#5a5a5a" width="20px" height="20px" />;
  };

  const renderNextButton = () => {
    return <NextIcon color="#5a5a5a" width="20px" height="20px" />
  };

  return (
    <Box
      position="relative"
      width="100%"
    >
      <AliceCarousel
        mouseTracking
        responsive={{ 0: { items: 1 } }}
        autoPlayControls={false}
        autoPlay={props.images && props.images.length > 1}
        autoPlayInterval={8000}
        infinite
        animationType="fadeout"
        controlsStrategy="alternative"
        renderDotsItem={renderDotsItems}
        renderPrevButton={renderPrevButton}
        renderNextButton={renderNextButton}
        items={props.images}
        keyboardNavigation
      ></AliceCarousel>
    </Box>
  );
};

export default HomeBannerCarousel;
