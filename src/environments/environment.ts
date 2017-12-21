// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  domain: 'domain.airshipcms.io', //used for auth0 redirect url
  production: false,
  auth0Domain: '',
  auth0ClientID: '',
  auth0Secret: '',
  auth0RedurectUri: '',
  auth0ApiClientID: '',
  auth0ApiSecret: ''
};
