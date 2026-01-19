import { GetServerSidePropsContext } from "next";
import { MerchantRepository } from "repositories";

import { absoluteUrl, getAppCookies } from "src";

export const getProps =
  (input?: {
    resolver?: Resolver;
    loginRequired?: boolean;
    isVirtualShop?: boolean;
    isSignInPage?: boolean;
  }) =>
  async (context: GetServerSidePropsContext) => {
    const { req } = context;

    if (input?.isVirtualShop) {
      const t = context.query?.accessToken;
      req.headers.cookie = `acceptCookies=true; token=${t}`;
    }

    const { baseApiUrl, url } = absoluteUrl(req, null);
    const { token } = getAppCookies(req);

    const parsedItems: any = {};

    const cookiesItems = req.headers?.cookie?.split("; ");
    cookiesItems?.forEach((cookies: any) => {
      const parsedItem: any = cookies.split("=");
      parsedItems[parsedItem[0]] = decodeURI(parsedItem[1]);
    });

    let isAuth: boolean = false;
    let profile = null;
    let cartData = null;
    let accessToken = token ? token : null;
    let getAcceptCookies = parsedItems["acceptCookies"]
      ? parsedItems["acceptCookies"]
      : null;
    let props = {};
    const host = context?.req?.headers?.host;
    let currentMerchant = null;

    if (host) {
      try {
        const { data } = await new MerchantRepository(
          accessToken,
          host
        ).getMerchant();
        currentMerchant = data;
      } catch (error) {
        context.res.statusCode = 302;
        context.res.setHeader("Location", "/500");
        console.log(error);
        return {
          props: {},
        };
      }
    }

    const whitelist = ["terms-policies", "terms-and-policies"];
    const isPrivate = currentMerchant?.data?.merchantType === "private";
    const isWhitelisted = whitelist.some((path) => url.url.includes(path));
    const isBlocked = isPrivate && !isWhitelisted;

    if (!accessToken && isBlocked && input?.isSignInPage !== true) {
      context.res.statusCode = 302;
      context.res.setHeader("Location", "/sign-in");

      return {
        props: {},
      };
    }

    if (accessToken && isBlocked && input?.isSignInPage === true) {
      context.res.statusCode = 302;
      context.res.setHeader("Location", "/");

      return {
        props: {},
      };
    }

    if (!accessToken && input?.loginRequired) {
      console.log("unauth");
      context.res.statusCode = 302;
      context.res.setHeader("Location", "/login");

      return {
        props: {},
      };
    }

    if (accessToken) {
      try {
        // const { data } = await new CustomerRepository(accessToken, host).getCustomer();
        // profile = accessToken && data ? data : '';
        isAuth = true;
        // cartData = data?.cart;
      } catch (error) {
        console.log(error);
      }
    }

    try {
      if (input && input.resolver && typeof input.resolver === "function") {
        props = (await input.resolver(context, accessToken))?.props;
      }
      return {
        props: {
          ...props,
          isAuth,
          acceptCookies: getAcceptCookies,
          baseApiUrl,
          profile,
          cartData,
          token: accessToken,
          currentMerchant,
        },
      };
    } catch (error) {
      context.res.writeHead(302, { Location: "/" }).end();
      return {
        props: {
          isAuth,
          baseApiUrl,
          acceptCookies: getAcceptCookies,
          profile,
          cartData,
          token: accessToken,
          currentMerchant,
        },
      };
    }
  };

type Resolver = (
  context: GetServerSidePropsContext,
  accessToken: string
) =>
  | Promise<{ props: Record<string, any> }>
  | { props: Record<string, any> }
  | Record<string, any>;
