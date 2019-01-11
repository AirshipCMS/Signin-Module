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
  auth0Secret: 'HHMZeGgJrgE3RJOq4tasqIR00szF4wsTnM8vT27TmEcbxrnh8aCI-woG9biF5dXS',
  auth0RedurectUri: 'https://endtoend.airshipcms.io/api/auth0/',
  auth0ApiClientID: 'VQfbQ70BeHjf58w2m8Hu2I0gjZOETk7w',
  auth0ApiSecret: 'jKEfm1GNTLjA53N_XbviBogJNRR5zw1cpVDVDtCWIbrSe2XPc9Nz3HspmmI4X6xE'
};
