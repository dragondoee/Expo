import React from "react"
import { ImageBackground, StyleSheet } from "react-native"

const BgImage = ({ source, children, style }) => (
  <ImageBackground
    source={require("../assets/images/bg.png")}
    style={[styles.background, style]}
    resizeMode="cover"
    pointerEvents="box-none"
  >
    {children}
  </ImageBackground>
)

const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: "relative",
  }
})

export default BgImage
