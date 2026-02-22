export interface ModalContextProps {
  show: <P extends object>(
    title: string | "customModal" | "fullScreenModal",
    Component: React.ComponentType<P>,
    props?: P | undefined
  ) => void;
  hide: () => void;
}
