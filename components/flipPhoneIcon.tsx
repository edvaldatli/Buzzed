import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type FlipPhoneIconProps = {
  className?: string;
};

export default function FlipPhoneIcon({ className }: FlipPhoneIconProps) {
  return (
    <MaterialCommunityIcons
      className={className}
      name="phone-rotate-landscape"
      size={40}
      color="white"
    />
  );
}
