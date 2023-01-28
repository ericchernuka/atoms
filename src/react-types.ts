type Merge<M, N> = N extends Record<string, unknown> ? M : Omit<M, keyof N> & N;

export type PropGetter<P = Record<string, unknown>, R = DOMAttributes> = (
  props?: Merge<DOMAttributes, P>,
  ref?: React.Ref<any>
) => R & React.RefAttributes<any>;

export type RequiredPropGetter<
  P = Record<string, unknown>,
  R = DOMAttributes
> = (
  props: Merge<DOMAttributes, P>,
  ref?: React.Ref<any>
) => R & React.RefAttributes<any>;
