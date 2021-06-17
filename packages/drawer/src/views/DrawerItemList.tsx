import * as React from 'react';
import {
  CommonActions,
  DrawerActions,
  DrawerNavigationState,
  ParamListBase,
  useLinkBuilder,
} from '@react-navigation/native';
import DrawerItem from './DrawerItem';
import type { DrawerNavigationHelpers, DrawerDescriptorMap } from '../types';

type Props = {
  state: DrawerNavigationState<ParamListBase>;
  navigation: DrawerNavigationHelpers;
  descriptors: DrawerDescriptorMap;
  onItemPress: (route) => boolean;
};

/**
 * Component that renders the navigation list in the drawer.
 */
export default function DrawerItemList({
  state,
  navigation,
  descriptors,
  onItemPress,
}: Props) {
  const buildLink = useLinkBuilder();

  return (state.routes.map((route, i) => {
    const focused = i === state.index;
    const {
      title,
      drawerLabel,
      drawerIcon,
      drawerActiveTintColor,
      drawerInactiveTintColor,
      drawerActiveBackgroundColor,
      drawerInactiveBackgroundColor,
      drawerLabelStyle,
      drawerItemStyle,
    } = descriptors[route.key].options;

    return (
      <DrawerItem
        key={route.key}
        label={
          drawerLabel !== undefined
            ? drawerLabel
            : title !== undefined
            ? title
            : route.name
        }
        icon={drawerIcon}
        focused={focused}
        activeTintColor={drawerActiveTintColor}
        inactiveTintColor={drawerInactiveTintColor}
        activeBackgroundColor={drawerActiveBackgroundColor}
        inactiveBackgroundColor={drawerInactiveBackgroundColor}
        labelStyle={drawerLabelStyle}
        style={drawerItemStyle}
        to={buildLink(route.name, route.params)}
        onPress={() => {
          let handled = false;
          if (onItemPress) {
            handled = onItemPress(route);
          }

          if (!handled) {
            navigation.dispatch({
              ...(focused
                ? DrawerActions.closeDrawer()
                : CommonActions.navigate(route.name)),
              target: state.key,
            });
          }
        }}
      />
    );
  }) as React.ReactNode) as React.ReactElement;
}
