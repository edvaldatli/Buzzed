import { MotiView } from "moti";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from "@/components/qrCode"; // Assuming you already have this for generating QR codes
import { LinearGradient } from "expo-linear-gradient";
import PrimaryText from "./primaryText";

type QRCodeModalProps = {
  value: string;
};

export default function QRCodeModal({ value }: QRCodeModalProps) {
  return (
    <MotiView
      className="flex absolte w-full h-full justify-center top-0 left-0 bg-black -right-"
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "timing", duration: 200 }}
    >
      <LinearGradient
        colors={["#E33EB0", "#FD841F"]}
        locations={[0.1, 0.5]}
        style={styles.background}
      />
      <PrimaryText tlw="rotate-90 text-4xl -right-28 absolute text-center">
        Scan this code to join!
      </PrimaryText>
      <View style={styles.qrContainer}>
        <QRCode data={value} />
      </View>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  qrContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  instructionText: {
    fontSize: 20,
    textAlign: "center",
    position: "absolute",
    left: 10,
    transform: [{ rotate: "90deg" }],
  },
});
