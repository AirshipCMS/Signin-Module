# Sign In-Module

## Usage

1. Install Dependencies

run `npm install`

2. Configuration

for alpha & beta:

copy `src/environments/environment.ts` to `src/environments/environment.alpha.ts` and make any necessary changes.

for production:

make necessary changes in `src/environments/environment.prod.ts`.

3. Build Application

for alpha & beta:

```
npm run build-alpha
```

for production:

```
npm run build
```
This will compile the app into `dist/airship-signin.min.js`.

4. Add Script to Airship Project

In your airship project, add `airship-sigin.min.js` in `compartments/assets/scripts/`.

Add the following to `compartments/templates/signin.html`:

```
<base href="/">
<app-root></app-root>
<script src="/assets/scripts/signin.min.js"></script>
```

this SPA loads on `/signin`

## Development

1. Install Dependencies

run `npm install`

2. Configuration

copy `src/environments/environment.ts` to `src/environments/environment.alpha.ts` and make any necessary changes.

Make any necessary changes in `src/environments/environment.prod.ts`.

set `target` in files `proxy.conf.alpha.json`, `proxy.conf.beta.json` and `proxy.conf.prod.json`.

3. Serve

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

navigate to localhost:4200/signin