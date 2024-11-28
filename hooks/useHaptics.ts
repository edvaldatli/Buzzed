import * as Haptics from 'expo-haptics';

const useHaptics = () => {
    const notification = () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const selection = () => Haptics.selectionAsync();
    const impact = () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    return { notification, selection, impact };
};

export default useHaptics;