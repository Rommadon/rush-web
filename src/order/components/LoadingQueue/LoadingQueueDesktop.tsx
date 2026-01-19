import { FC, useContext, useState, useEffect } from "react";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";

import router from "next/router";

import { useResource, CartContext } from "src";
import { useTranslations } from "next-intl";

// import { SlipUploadModal } from "../SlipUploadModal";
import { useToast } from "src/core/hooks/useToast";
import {
  DefaultLayout,
  DefaultLayoutProp,
} from "src/core/components/DefaultLayout";
import { PaymentMethodType } from "src/order/models/enum/invoice";

export type LoadingQueueDesktopProps = DefaultLayoutProp & {
  orderQueueUuid: string;
  waitingQueue: number;
  checkTime: number;
};

export const LoadingQueueDesktop: FC<LoadingQueueDesktopProps> = (props) => {
  const { orderQueueUuid, waitingQueue, checkTime } = props;
  const { setCartData } = useContext(CartContext);
  const t = useTranslations("order.LoadingQueue");
  const resource = useResource();
  const toast = useToast();

  const [queueNumber, setQueueNumber] = useState(
    waitingQueue === 0 ? 1 : waitingQueue
  );
  const [dotCount, setDotCount] = useState(0);
  const maxDots = 3;

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    const intervalTime = checkTime === 0 ? 1000 : checkTime * 1000;

    const dotAnimation = setInterval(() => {
      setDotCount((prevCount) => (prevCount + 1) % (maxDots + 1));
    }, 2000);

    // Decrease queue number every 500ms
    const decreaseQueue = setInterval(() => {
      setQueueNumber((prevQueueNumber) =>
        prevQueueNumber > 1 ? prevQueueNumber - 1 : prevQueueNumber
      );
    }, 1000);

    // Check order status at specified interval
    const timer = setInterval(async () => {
      try {
        const data: any = await resource.fetchResource(
          `order-public/check/queue/${orderQueueUuid}`,
          {},
          ""
        );

        if (data?.data?.status === "SUCCESS") {
          clearInterval(timer); // Stop interval on success
          clearInterval(decreaseQueue); // Stop queue decreasing on success
          clearInterval(dotAnimation); // Stop dot animation on success
          handleSuccess(data?.data?.data); // Handle success scenario
        } else if (data?.data?.status === "FAILED") {
          clearInterval(timer); // Stop interval on failure
          clearInterval(decreaseQueue); // Stop queue decreasing on failure
          clearInterval(dotAnimation); // Stop dot animation on failure
          handleFailure(); // Handle failure scenario
        }
      } catch (error) {
        console.error("Error checking order status:", error);
        // Handle error if needed
      }
    }, intervalTime / 10);

    return () => {
      clearInterval(timer); // Cleanup on unmount or dependency change
      clearInterval(decreaseQueue); // Cleanup queue decreasing on unmount or dependency change
      clearInterval(dotAnimation); // Cleanup dot animation on unmount or dependency change
    };
  }, [orderQueueUuid, checkTime]); // Depend on orderQueueUuid and checkTime

  const handleSuccess = async (data: any) => {
    // Handle success scenario
    const fetchCart = await resource.fetchResource("cart-public", {}, "");
    setCartData(fetchCart?.data?.data);
    const order = data?.order;
    if (
      order?.invoice?.totalPrice === 0 ||
      order?.invoice?.paymentMethodType === PaymentMethodType.CASH
    ) {
      router.push(`/me/orders/${order?.number}`);
      toast.openToast("สร้างคำสั่งซื้อสำเร็จ", "success");
    } else {
      router.push(`/me/orders/${order?.number}/payment`);
      toast.openToast("สร้างคำสั่งซื้อสำเร็จ", "success");
    }
    // Redirect logic if needed
  };

  const handleFailure = () => {
    // Handle failure scenario
    router.push("/orders/create");
    toast.openToast("สร้างคำสั่งซื้อไม่สำเร็จ", "error");
  };

  return (
    <DefaultLayout {...props} titleMeta={`คำสั่งซื้อ`}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="60vh"
        margin="80px"
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeCDFTyqd5A1L7yWYjgnwTjuCLTaF_2TEhaA&s"
              alt="loading"
              width={200}
              height={200}
            />
          </Grid>
          <Grid item>
            <Box mt={2} mx={2} textAlign="center">
              <Typography variant="h2" color="textPrimary">
                {"กรุณารอสักครู่" + " . ".repeat(dotCount)}
              </Typography>
              <Typography mt={1} variant="h2" color="textPrimary">
                เรากำลังจัดการคิวให้คุณ
              </Typography>
              <Box mt={4} display="flex" justifyContent="space-between">
                <Typography variant="h2" color="textPrimary">
                  คุณเป็นคิวที่
                </Typography>
                <Typography
                  variant="h2"
                  fontWeight="bold"
                  color="primary"
                  ml={1}
                >
                  {queueNumber}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </DefaultLayout>
  );
};

export default LoadingQueueDesktop;
