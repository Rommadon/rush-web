import { FC } from "react";
import { Box, useMediaQuery } from "@mui/material";
import AliceCarousel from "react-alice-carousel";
import { ChevronLeftIcon, ChevronRightIcon } from ".";
import PrevIcon from "./PrevIcon";
import NextIcon from "./NextIcon";


export const Carousel: FC<{ images: any[], desktopWidth?: number }> = (props) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const renderDotsItems = (event: { isActive: boolean }) => {
    if (event.isActive) {
      return <Box bgcolor="rgba(0, 0, 0, 1)" width="8px" height="8px" borderRadius="50%" mx="8px" />;
    } else {
      return <Box bgcolor="rgba(0, 0, 0, 0.5)" width="8px" height="8px" borderRadius="50%" mx="8px" />;
    }
  };

  const renderPrevButton = (event: { isDisabled: boolean }) => {
    if (event.isDisabled) {
      return isDesktop && <Box
        sx={{
          width: "35px",
          bgcolor: "rgba(255,255,255,0.5)",
          borderRadius: "50%",
          height: "35px",
          cursor: "pointer",
          paddingTop: "4px",
          paddingRight: "7px"
        }}
      > <PrevIcon fill="white" viewBox={"0 0 50 50"} /></Box >;
    } else {
      return isDesktop && <PrevIcon color="black" width="20px" height="20px" />;
    }
  };

  const renderNextButton = (event: { isDisabled: boolean }) => {
    if (event.isDisabled) {
      return isDesktop && <Box
        sx={{
          width: "35px",
          bgcolor: "rgba(255,255,255,0.5)",
          borderRadius: "50%",
          height: "35px",
          cursor: "pointer",
          paddingTop: "4px",
          paddingRight: "5px",
          textAlign: "right"
        }}
      > <NextIcon fill="white" viewBox={"0 0 50 50"} /></Box >;;
    } else {
      return isDesktop && <NextIcon color="black" width="20px" height="20px" />
    }
  };

  return (
    <AliceCarousel
      mouseTracking
      responsive={{ 0: { items: 1 } }}
      autoPlayControls={false}
      autoPlay={props.images && props.images.length > 1}
      autoPlayInterval={3000}
      // disableButtonsControls
      infinite
      controlsStrategy="alternative"
      renderDotsItem={renderDotsItems}
      renderPrevButton={renderPrevButton}
      renderNextButton={renderNextButton}
      items={props.images}
      keyboardNavigation
    ></AliceCarousel>
  );
};

export default Carousel
