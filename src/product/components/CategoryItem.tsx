import { FC } from "react";
import { Box, Typography, useMediaQuery } from '@mui/material'
import NextImage from 'next/image'

export type CategoryItemProps = {
  imgSrc?: string | null,
  imgAlt?: string | null,
  name: string
};

export const CategoryItem: FC<CategoryItemProps> = (props) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    isDesktop ? (
      <Box
        my={{ lg: '16px', sm: 0 }}
        width={{ lg: '100%', xs: '310px' }}
      >
        <Box
          borderRadius="8px"
          overflow="hidden"
          width={160}
          height={160}
          position="relative"
          display="block"
          mx="auto"
        >
          <NextImage  
            className="rounded-2"
            src={props.imgSrc ?? "/category-placeholder.jpg"}
            width={160}
            height={160}
            alt={props.imgAlt ?? props.name ?? ''}
            priority
            // placeholder="blur"
            blurDataURL={"/popular-product-thumbnail.jpg"}
  unoptimized={true}
/>
        </Box>
        <Typography variant="h2" component="h2" fontWeight="light" textAlign="center" pt="24px">
          {props.name}
        </Typography>
      </Box>
    ) : (
      <Box
        display={'flex'}
        alignItems="center"
        my={{ lg: '16px', sm: 0 }}
        width={{ lg: '100%', xs: '310px' }}
      >
        <Box
          borderRadius="8px"
          overflow="hidden"
          width={80}
          height={80}
          position="relative"
          display="block"
        >
          <NextImage  
            className="rounded-2"
            src={props.imgSrc ?? "/category-placeholder.jpg"}
            width={80}
            height={80}
            alt={props.imgAlt ?? props.name ?? ''}
            priority
            // placeholder="blur"
            blurDataURL={"/popular-product-thumbnail.jpg"}
  unoptimized={true}
/>
        </Box>
        <Box
          flex="1"
          width={{ lg: "215px", sm: "100%" }}
          height={80}
          display="flex"
          alignItems="center"
        >
          <Typography ml="16px" variant="h3" component="h3" fontWeight="light">
            {props.name}
          </Typography>
        </Box>
      </Box>
    )
  );
};

export default CategoryItem
