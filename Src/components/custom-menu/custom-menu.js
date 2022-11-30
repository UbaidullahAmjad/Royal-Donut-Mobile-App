import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

export const CustomMenu = ({ visible, setVisible,changeFrn, changeEng }) => {
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  return (
    <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 0 }}>
      <Menu
        visible={visible}
        // anchor={<Text onPress={showMenu}>Show menu</Text>}
        onRequestClose={hideMenu}
      >
        {/* <MenuItem onPress={() => { hideMenu();exportFile()  }}>Export in Excel</MenuItem> */}
        {/* <MenuItem onPress={hideMenu}>Share</MenuItem> */}
        <MenuItem onPress={()=>{hideMenu(); changeEng()}}>English </MenuItem>
        <MenuItem onPress={()=>{hideMenu(); changeFrn()}}>French </MenuItem>
        {/* <MenuItem disabled>Save in db</MenuItem>

        <MenuDivider />
        <MenuItem onPress={hideMenu}>go Back </MenuItem> */}
      </Menu>
    </View>
  );
}