export type EitherOneOrAnother<TProps, UProps> =
  | (TProps & {
      [K in keyof UProps]?: never;
    })
  | (UProps & {
      [K in keyof TProps]?: never;
    });

export type AllOrNothing<TProps> =
  | TProps
  | {
      [K in keyof TProps]?: never;
    };
