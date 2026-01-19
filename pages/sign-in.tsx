import { NextPage } from "next";
import { SignIn, SignInProps } from "src";
import { getProps } from "utils";
const SignInPage: NextPage<SignInProps> = (props) => {
  return <SignIn {...props} />;
};
export default SignInPage;
export const getServerSideProps = getProps({
  loginRequired: false,
  isSignInPage: true,
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
