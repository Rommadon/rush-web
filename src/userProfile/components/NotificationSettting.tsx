import { FC, useState, MouseEventHandler, useContext } from "react";
import {
  List,
  ListItem,
  useMediaQuery,
  ListItemButton,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";

import { DefaultLayout, DefaultLayoutProp, MobileAppBar, IOSSwitch, AuthContext, useResource } from "src";

export type NotificationSettingProps = DefaultLayoutProp & {};

const notificationSettings = [
  { key: "isEmailNotify", text: "แจ้งเตือนทางอีเมล" },
  { key: "isApplicationNotify", text: "แจ้งเตือนทางแอพพลิเคชั่น" },
  { key: "isSmsNotify", text: "แจ้งเตือนทาง SMS" },
];

export const NotificationSetting: FC<NotificationSettingProps> = (props) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { profile } = useContext(AuthContext);
  const resource = useResource();

  const [isEmailNotify, setIsEmailNotify] = useState(profile?.customerNotificationConfiguration?.isEmailNotify || false)
  const [isApplicationNotify, setIsApplicationNotify] = useState(profile?.customerNotificationConfiguration?.isApplicationNotify || false)
  const [isSmsNotify, setIsSmsNotify] = useState(profile?.customerNotificationConfiguration?.isSmsNotify || false)

  const onChangeNotificationConfig = async (key: string) => {
    if (key === "isEmailNotify") {
      const value = !isEmailNotify;
      setIsEmailNotify(value);

      await resource.createResource('customer-notification-configuration-public', {
        isEmailNotify: value
      });
    }

    if (key === "isApplicationNotify") {
      const value = !isApplicationNotify;
      setIsApplicationNotify(value);

      await resource.createResource('customer-notification-configuration-public', {
        isApplicationNotify: value
      });
    }

    if (key === "isSmsNotify") {
      const value = !isSmsNotify;
      setIsSmsNotify(value);

      await resource.createResource('customer-notification-configuration-public', {
        isSmsNotify: value
      });
    }
  }

  const onCheckValue = (key: string) => {
    if (key === "isEmailNotify") {
      return isEmailNotify;
    }

    if (key === "isApplicationNotify") {
      return isApplicationNotify;
    }

    if (key === "isSmsNotify") {
      return isSmsNotify;
    }

    return false
  }

  return (
    <DefaultLayout
      {...props}
      appBar={!isDesktop && <MobileAppBar title="แจ้งเตือน" />}
    >
      <List disablePadding>
        {notificationSettings.map((setting) => (
          <ListItem
            key={setting.key}
            disablePadding
            onClick={() => onChangeNotificationConfig(setting.key)}
          >
            <ListItemButton
              sx={{
                p: "32px 16px",
                borderBottom: "1px solid",
                borderColor: "grey.100",
              }}
            >
              <ListItemText
                primary={setting.text}
                primaryTypographyProps={{
                  fontSize: "14px",
                }}
              />
              <ListItemSecondaryAction>
                <IOSSwitch
                  checked={onCheckValue(setting.key)}
                  onClick={() => onChangeNotificationConfig(setting.key)}
                />
              </ListItemSecondaryAction>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </DefaultLayout>
  );
};

export default NotificationSetting;
