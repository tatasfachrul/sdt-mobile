import { TextStyle } from 'react-native';

export const Texts = {
    Typography: {
        Avatar: {
            fontWeight: '600' as TextStyle['fontWeight'],
            fontSize: 15,
            letterSpacing: 0.3, // 2% of 15
            textAlign: 'center' as TextStyle['textAlign'],
        },
         Title: {
            fontWeight: '500' as TextStyle['fontWeight'],
            fontSize: 14,
            letterSpacing: 0.2, // 2% of 15
            textAlign: 'center' as TextStyle['textAlign'],
        }
    }
};