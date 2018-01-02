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
ng build --prod --env=alpha
```

for production:

```
ng build --prod --env=prod
```
This will compile the app into `dist/`
Copy all the necessary scripts from `dist/` into the `compartments/assets/scripts/` directory of the airship project.
Copy `dist/index.html` into the appropriate template file of the airship project.

```
<base href="/">
<app-root></app-root>
<script src="/assets/scripts/signin/inline.js"></script>
<script src="/assets/scripts/signin/polyfills.js"></script>
<script src="/assets/scripts/signin/vendor.js"></script>
<script src="/assets/scripts/signin/main.js"></script>
```

this SPA loads on `/signin`
