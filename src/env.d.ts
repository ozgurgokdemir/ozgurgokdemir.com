/* eslint-disable @typescript-eslint/triple-slash-reference */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/// <reference path="../.astro/types.d.ts" />

type ENV = {
  RESEND_API_KEY: string;
  EMAIL_ADDRESS: string;
};

type Runtime = import('@astrojs/cloudflare').Runtime<ENV>;

declare namespace App {
  interface Locals extends Runtime {}
}
