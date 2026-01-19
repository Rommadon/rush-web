import { NextPage } from "next";
import { MerchantPdpaRepository } from "repositories";
import { Service, ServiceProps } from "src/core";
import { getProps } from "utils";

const ServicePage: NextPage<ServiceProps> = (props) => {
  return <Service {...props} />;
};

export const getServerSideProps = getProps({
  loginRequired: false,
  resolver: async (context, accessToken) => {
    try {    
      const merchantPdpaRepository = new MerchantPdpaRepository(
        accessToken,
        context.req.headers.host
      );

      // @ts-ignore
      const responses = await Promise.allSettled([merchantPdpaRepository.getMerchantPdpa(),]).then((responses) => responses.map((response) => response.value));

      const [
        merchantPdpa,
      ] = responses;

      return {
        props: {
          merchantPdpa: merchantPdpa?.data || null,
          messages: {
            ...require(`src/core/messages/${context.locale}.json`),
            ...require(`src/auth/messages/${context.locale}.json`),
          },
        },
      };
    } catch (error) {
      context.res.statusCode = 302;
      context.res.setHeader("Location", "/500");
      console.log(error)
      return {
        props: {},
      };
    }
  },
});


export default ServicePage;
