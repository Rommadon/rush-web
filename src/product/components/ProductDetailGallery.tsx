import { FC, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import NextImage from "next/image";
import AliceCarousel from "react-alice-carousel";
import dynamic from 'next/dynamic'

export const DynamicCarousel = dynamic(
  () => import("../../core/components/Carousel"),
  { ssr: false }
);

import { ProductImage } from "../models";
import NextIcon from "src/core/components/NextIcon";
import PrevIcon from "src/core/components/PrevIcon";
import { Typography } from "@mui/material";

export const ProductDetailGallery: FC<{ images: ProductImage[], isOutOfStock?: boolean }> = (props) => {
  const productImage = props?.images?.find((image) => image.order === 0)
    ?.imageUpload?.url;

  const [selectedImage, setSelectedImage] = useState(
    productImage || "/article-placeholder.svg"
  );
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const renderNextButton = (event: { isDisabled: boolean }) => {
    if (event.isDisabled) {
      return isDesktop && <Box
        sx={{
          width: "35px",
          bgcolor: "grey.100",
          borderRadius: "50%",
          height: "35px",
          cursor: "pointer",
          paddingTop: "4px",
          paddingRight: "5px",
          textAlign: "right"
        }}
      > <NextIcon fill="white" viewBox={"0 0 50 50"} /></Box >;;
    } else {
      return isDesktop && <Box
        sx={{
          width: "35px",
          bgcolor: "grey.100",
          borderRadius: "50%",
          height: "35px",
          cursor: "pointer",
          paddingTop: "4px",
          paddingRight: "4px",
          textAlign: "right"
        }}
      > <NextIcon fill="white" viewBox={"0 0 50 50"} /></Box >;;
    }
  };

  const renderPrevButton = (event: { isDisabled: boolean }) => {
    if (event.isDisabled) {
      return isDesktop && <Box
        sx={{
          width: "35px",
          bgcolor: "grey.100",
          borderRadius: "50%",
          height: "35px",
          cursor: "pointer",
          paddingTop: "4px",
          paddingRight: "7px"
        }}
      > <PrevIcon fill="white" viewBox={"0 0 50 50"} /></Box >;
    } else {
      return isDesktop && <Box
        sx={{
          width: "35px",
          bgcolor: "grey.100",
          borderRadius: "50%",
          height: "35px",
          cursor: "pointer",
          paddingTop: "4px",
          paddingRight: "7px"
        }}
      > <PrevIcon fill="white" viewBox={"0 0 50 50"} /></ Box>;
    }
  };

  return (
    <Box width="100%" className="alice-product-detail">
      {isDesktop && (
        <Box overflow="hidden" position="relative">
          {props.isOutOfStock && (
            <>
              <Box
                sx={{
                  position: "absolute",
                  zIndex: 2,
                  backgroundColor: "black",
                  height: "100%",
                  width: "100%",
                  opacity: 0.5,
                }}
              ></Box>
              <Typography
                color="white"
                variant="h3"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 3,
                }}
              >
                สินค้าหมด
              </Typography>
            </>
          )}
          <NextImage
            src={selectedImage}
            width={300}
            height={300}
            layout="responsive"
            priority={true}
            unoptimized
          />
        </Box>
      )}
      {!isDesktop && (
        <DynamicCarousel
          images={props?.images?.sort(
            (a: any, b: any) => a.order - b.order
          ).map((image) => (
            <Box key={image.id} position="relative" width="100%">
              <Box
                width="100%"
                position="relative"
              >
                {props.isOutOfStock && (
                  <>
                    <Box
                      sx={{
                        position: "absolute",
                        zIndex: 2,
                        backgroundColor: "black",
                        height: "100%",
                        width: "100%",
                        opacity: 0.5,
                      }}
                    ></Box>
                    <Typography
                      color="white"
                      variant="h3"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 3,
                      }}
                    >
                      สินค้าหมด
                    </Typography>
                  </>
                )}
                {
                  image.imageUpload && (
                    <NextImage
                      src={image.imageUpload?.url}
                      alt={image.imageUpload?.name}
                      width={375}
                      height={375}
                      layout="responsive"
                      priority
                      placeholder="blur"
                      blurDataURL={image.imageUpload?.url || "/new-in-placeholder.svg"}
                    />
                  )
                }
              </Box>
            </Box>
          ))}
        />
        // <Box minWidth="320px" minHeight="320px" position="relative">
        //   <NextImage
        //     src={productImage || "/article-placeholder.svg"}
        //     width={375}
        //     height={375}
        //     layout="fill"
        //     priority={true}
        //   />
        // </Box>
      )}
      {isDesktop && (
        <Box mt="24px">
          <AliceCarousel
            mouseTracking
            disableDotsControls
            // disableButtonsControls
            autoHeight
            infinite
            items={
              props.images ?
                props.images?.map((image, index) => (
                  <Box key={index}>
                    <NextImage
                      onClick={() => setSelectedImage(image?.imageUpload?.url)}
                      className="rounded-2"
                      src={image?.imageUpload?.url || "/new-in-placeholder.svg"}
                      width={100}
                      height={100}
                      priority={true}
                      // unoptimized
                      // placeholder="blur"
                      blurDataURL={image?.imageUpload?.url || "/new-in-placeholder.svg"}
                    />
                  </Box>
                )) :
                [<Box sx={{ width: '100px', height: '100px' }} key={0}></Box>]
            }
            paddingRight={12}
            responsive={{ "0": { items: 4 } }}
            controlsStrategy="basic"
            renderPrevButton={renderPrevButton}
            renderNextButton={renderNextButton}
          />
        </Box>
      )}
    </Box>
  );
};
