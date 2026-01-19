import Axios from "axios";
import { FC, useEffect, useState } from "react";
import { AuthContext, authContextDefaultValue } from "..";

export type AuthProviderProp = Partial<typeof authContextDefaultValue>;

export const AuthProvider: FC<AuthProviderProp> = (props) => {

  const [open, setOpen] = useState(props?.isAuthModalOpen ?? false);
  const [currentMerchant, setCurrentMerchant] = useState(props?.currentMerchant ?? null);
  const [token, setToken] = useState(props.token ?? null);
  const [profile, setProfile] = useState(props.profile ?? null);
  const [isAuth, setIsAuth] = useState(props?.isAuth ?? false);
  const [acceptCookies, setAcceptCookies] = useState(props?.acceptCookies ?? false);

  useEffect(() => {
    if (isAuth && token && currentMerchant && profile === null) {
      const fetchProfile = async () => {
        try {
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'CurrentMerchantSlug': `${currentMerchant?.data?.slug || '-'}`
          }


          const customerProfile = await Axios.get(`${props.baseApiUrl}/customer-public`, {
            headers: headers,
            params: {}
          })

          const dataProfile = customerProfile?.data ? customerProfile?.data?.data : {}

          setProfile({
            ...profile,
            ...dataProfile
          });
        } catch (error) {
          console.log(error)
        }
      }

      fetchProfile();
    }
  }, [isAuth, token, currentMerchant, profile])

  return (
    <AuthContext.Provider
      value={{
        currentMerchant,
        isAuthModalOpen: open,
        isAuth,
        baseApiUrl: props.baseApiUrl,
        acceptCookies: acceptCookies,
        profile,
        token,
        setCurrentMerchant: (value) => setCurrentMerchant(value),
        openAuthModal: () => setOpen(true),
        closeAuthModal: () => setOpen(false),
        setToken: (value) => setToken(value),
        setProfile: (value) => setProfile(value),
        setIsAuth: (value) => setIsAuth(value),
        setAcceptCookies: (value) => setAcceptCookies(value),
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
