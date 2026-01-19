import { FC } from "react";
import {
  List,
  ListItem,
  useMediaQuery,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  SvgIcon,
} from "@mui/material";
import { useRouter } from "next/router";
import NextLink from 'next/link'

import { routes } from "src/core/routes";
import { DefaultLayout, DefaultLayoutProp, MobileAppBar } from "src";

export type ChangeLanguageProps = DefaultLayoutProp & {};

const locales = [
  // { locale: "en", text: "English" },
  { locale: "th", text: "ไทย" },
];

export const ChangeLanguage: FC<ChangeLanguageProps> = (props) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const router = useRouter();

  const onBackSetting = () => {
    router.push(routes.me())
  }

  return (
    <DefaultLayout
      {...props}
      appBar={!isDesktop && <MobileAppBar title="ภาษา" onBackClick={() => onBackSetting()} />}
    >
      <List>
        {locales.map((l) => (
          <NextLink key={l.locale} href={router.asPath} locale={l.locale}>
            <a>
              <ListItem>
                <ListItemButton>
                  <ListItemText
                    primary={l.text}
                    primaryTypographyProps={{
                      fontSize: "14px",
                    }}
                  />
                  {router.locale == l.locale && (
                    <ListItemIcon
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        py: "16px",
                      }}
                    >
                      {/* @ts-ignore */}
                      <SvgIcon viewBox="0 0 12 9" fontSize={"10px"}>
                        <path
                          d="M4.27541 6.39053L1.60882 3.72378L0.666016 4.66659L4.27541 8.27614L11.6087 0.942818L10.6659 8.90096e-06L4.27541 6.39053Z"
                          fill="#DE005E"
                        />
                      </SvgIcon>
                    </ListItemIcon>
                  )}
                </ListItemButton>
              </ListItem>
            </a>
          </NextLink>
        ))}
      </List>
    </DefaultLayout>
  );
};

export default ChangeLanguage;
