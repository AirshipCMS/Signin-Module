// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  domain: 'https://endtoend.airshipcms.io',
  // Auth0
  auth0Domain: 'airshipcms.auth0.com',
  auth0ClientID: 'fhiKNb4dwN0W542W9Rv06jdr4xmqDHwm',
  auth0RedurectUri: 'https://endtoend.airshipcms.io/signin'
};
