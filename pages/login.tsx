import { NextPage } from 'next'

import { Login, LoginProps } from 'src';
import { getProps } from 'utils';

const LoginPage: NextPage<LoginProps> = (props) => {
  return <Login {...props} />
}

export default LoginPage

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
      console.log(error)
      return {
        props: {},
      };
    }
  },
});