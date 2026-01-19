import { NextPage } from 'next'
import { PersonalInfo, PersonalInfoProps } from 'src/userProfile'
import { getProps } from 'utils';

const PersonalInfoPage: NextPage<PersonalInfoProps> = (props) => {
  return <PersonalInfo {...props} />
}

export const getServerSideProps = getProps({
  loginRequired: true,
  resolver: async (context, accessToken) => {
    try {
      return {
        props: {
          messages: {
            ...require(`src/core/messages/${context.locale}.json`),
            ...require(`src/auth/messages/${context.locale}.json`),
            ...require(`src/order/messages/${context.locale}.json`),
          },
          mode: context?.query?.mode || null
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

export default PersonalInfoPage