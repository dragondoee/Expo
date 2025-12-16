import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Keyboard = ({ children }) => {
    <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraScrollHeight={0}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
    >
        {children}
        
    </KeyboardAwareScrollView>
}

export default Keyboard;