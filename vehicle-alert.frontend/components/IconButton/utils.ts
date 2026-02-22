import styles from "./button.module.scss";

const availableVariants = {
  primary: styles.primary,
  secondary: styles.secondary,
  tertiary: styles.tertiary,
};

const availableSizes = {
  small: styles.smallSize,
  medium: styles.mediumSize,
  big: styles.bigSize,
};

const disabledStyles = {
  primary: styles.disabledPrimary,
  secondary: styles.disabledSecondary,
  tertiary: styles.disabledTertiary,
};

export { availableVariants, availableSizes, disabledStyles };
