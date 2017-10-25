# Login-Module

## Development

install dependencies

```
npm i
```

configuration

copy `src/environments/environment.ts` to `src/environments/environment.alpha.ts`
copy `src/environments/environment.ts` to `src/environments/environment.prod.ts`
and make any necessary changes. set `production` to `true` from `environment.prod.ts`.

`domain` should be the airship site this module will sit on. `domain.airships-alpha.io`

start dev server

```
ng serve --env=alpha --port=9001
```

## Creating Builds

for alpha:

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