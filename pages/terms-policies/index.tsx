import { NextPage } from "next";
import { TermsAndPoliciesList, TermsAndPoliciesListProps } from "src/core";
import { getProps } from "utils";

const TermsAndPoliciesPage: NextPage<TermsAndPoliciesListProps> = (props) => {
  return <TermsAndPoliciesList {...props} />;
};

export const getServerSideProps = getProps({
  loginRequired: false,
  resolver: async (context, accessToken) => {
    try {
      return {
        props: {
          messages: {
            ...require(`src/core/messages/${context.locale}.json`),
            ...require(`src/auth/messages/${context.locale}.json`),
          },
        },
      };
    } catch (error) {
      context.res.statusCode = 302;
      context.res.setHeader("Location", "/500");
      console.log(error);
      return {
        props: {},
      };
    }
  },
});

export default TermsAndPoliciesPage;
