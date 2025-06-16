interface BaseProps {
  id: string;
  visible: boolean;
  children: React.ReactNode;
}
interface StyleProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface ComponentProps extends BaseProps, StyleProps {}

export type Props = BaseProps & StyleProps  
