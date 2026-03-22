import { FC } from "react";
import { Box, Typography, useMediaQuery } from '@mui/material'
import NextImage from 'next/image'

export type CatalogItemProps = {
  imgSrc?: string | null,
  imgAlt?: string | null,
  name: string
};

export const CatalogItem: FC<CatalogItemProps> = (props) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <Box>
      {
        !isDesktop && (
          <Box
            display={'flex'}
            alignItems="center"
            flexDirection="column"
            width='100%'
          >
            <Box
              borderRadius="8px"
              width={80}
              height={80}
              position="relative"
              display="block"
            >
              <NextImage  
                className="circle-2"
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
            <Box textAlign="center" pt="8px">
              <Typography variant="h4" component="h3" fontWeight="light">
                {props.name}
              </Typography>
            </Box>
          </Box>
        )
      }
    </Box>
  );
};

export default CatalogItem
