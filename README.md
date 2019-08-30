# Sign In-Module

## Development

install dependencies

```
npm i
```

configuration

copy `src/environments/environment.ts` to `src/environments/environment.alpha.ts`
copy `src/environments/environment.ts` to `src/environments/environment.prod.ts` and make any necessary changes.

set `target` in files `proxy.conf.alpha.json`, `proxy.conf.beta.json` and `proxy.conf.prod.json`,

start dev server

Alpha

```
npm run alpha
```

Beta

```
npm run beta
```


Prod

```
npm run prod
```

## Creating Builds

for alpha & beta:

```
npm run build-alpha
```

for production:

```
npm build
```
This will compile the app into `dist/`
Copy from `dist/airship-signin.min.js` into the `compartments/assets/scripts/` directory of the airship project.
Copy `dist/index.html` into the appropriate template file (such as `signin.html`) for the airship project.

```
<base href="/signin">
<app-root></app-root>
<script src="/assets/scripts/airship-signin.min.js></script>
```

# Admin Setup
- create page with permalink `signin` so that this SPA loads on `/signin`. 
- set a SPA route in the admin settings to:
```/signin/.*` --> `/signin```
- If a different permalink is used, adjust page permalink and SPA route accordingly.

# Auth0
- in order for auth0 to redirect back to `/signin`, set a  redirect url to the absolute URL of your signin page, for example `https://yoursite.airshipcms-alpha.io/signin` or `https://yoursite.com/signin`. 
- in order for auth0 to redirect back to `/signin` with a hosted login module, an AirshipCMS Core Developer will need to add the Auth0 Allowed Callback URL to our Auth0 Account Settings, for example `https://yoursite.airshipcms-alpha.io/signin` or `https://yoursite.com/signin`. 
