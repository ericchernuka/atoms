type Merge<M, N> = N extends Record<string, unknown> ? M : Omit<M, keyof N> & N;

export type HTMLProps<T = any> = React.HTMLAttributes<T> &
  React.RefAttributes<T>;

export type PropGetter<T extends React.ElementType = any, P = {}> = (
  props?: React.ComponentPropsWithoutRef<T> & P,
  ref?: React.Ref<any> | React.RefObject<any>
) => Merge<HTMLProps<T>, P>;
