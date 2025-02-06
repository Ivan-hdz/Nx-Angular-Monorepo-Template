# Monorepo angular (PatitoCorp)

Este README tiene como objetivo guiar paso a paso en la 
configuración del siguiente stack de librerias/estrategias/frameworks: 
- Nx Monorepo
- Angular 18
- Tailwindcss
- Angular Material
- NgxTranslate

Un monorepo es una estrategia la cual consiste en almacenar 
todas las aplicaciones/librerias/etc en un mismo repositorio.

Todo esto nos ayudará a que conforme crezca el workspace, 
sea más facil mantener las dependencias y exista más reutilizacion
de codigo a lo largo de las diferentes aplicaciones y librerias 
del workspace.

## Prerequisitos técnicos
- NodeJS 20.x.y

## Creacion del workspace

Como framework para la gestión del monorepo utilizaremos "Nx" (https://nx.dev/getting-started/intro), con Nx crearemos y configuraremos las aplicaciones y librerias.

Para empezar a usar Nx, debemos crear un workspace:

```sh
npx create-nx-workspace
```

La primera cosa que nos preguntará el comando es si deseamos 
instalar el paquete `create-nx-workspace@20.0.0` a lo que le damos `y`: 

```sh
PS D:\> npx create-nx-workspace
Need to install the following packages:
create-nx-workspace@20.0.0
Ok to proceed? (y) y
```

Una vez se haya descargado el paquete nos iniciara un CLI, 
el cual nos preguntará algunas cosas. Lo primero sera definir 
el nombre del workspace y de la carpeta donde trabajaremos:
```sh
 NX   Let's create a new workspace [https://nx.dev/getting-started/intro]

? Where would you like to create your workspace? · patito-corp
```

En este caso, el workspace y la carpeta del workspace se llamarán: 
`patito-corp`.

Después se nos preguntara sobre con qué framework vamos a 
trabajar en el workspace. Esto instala las dependencias de un framework 
en especifico para agilizar las cosas. En un monorepo de Nx se puede mezclar 
frameworks siempre y cuando instalen las dependencias compatibles con Nx y el 
framework en cuestion.

```sh
? Which stack do you want to use? ...
None:          Configures a TypeScript/JavaScript monorepo.
React:         Configures a React application with your framework of choice.
Vue:           Configures a Vue application with your framework of choice.
> Angular:       Configures a Angular application with modern tooling.
Node:          Configures a Node API application with your framework of choice.
```

Ya que trabajaremos con aplicativos angular, seleccionaremos `Angular`.

Posteriormente se nos preguntará si deseamos crear un monorepo o un 
repositorio simple. El repositorio simple nos ayuda para aplicaciones pequeñas, 
para aplicaciones medianas o grandes se recomienda un monorepo.

```sh
? Integrated monorepo, or standalone project? ...
> Integrated Monorepo:  Nx creates a monorepo that contains multiple projects.
Standalone:           Nx creates a single project and makes it fast.
```

Seleccionaremos `Integrated` para crear un monorepo.

Desde este punto se nos preguntaran varias configuraciones relacionadas 
a la creación de un proyecto de angular

Se nos preguntará el nombre de la aplicación inicial de angular, 
para nuestro ejemplo le pondremos `landing`:
```sh
? Application name » landing
```

Después seleccionamos el `bundler`. Un bundler es un `middleware` 
que resuelve todas las dependencias dentro de nuestro código fuente, 
así como, distribuye el código en `chunks`, entre otras cosas.

Para fines practicos y de rendimiento, seleccionaremos `esbuild`

```sh
? Which bundler would you like to use? ...
> esbuild [ https://esbuild.github.io/ ]
Webpack [ https://webpack.js.org/ ]
```

Nota: Webpack es más robusto pero por ello es mas lento y 
complicado de configurar.

Ahora se nos preguntará si se desea utilizar procesador de CSS, 
o CSS nativo, en nuestro caso seleccionaremos `SASS`.

```sh
? Default stylesheet format ...
CSS
> SASS(.scss)       [ https://sass-lang.com   ]
LESS              [ https://lesscss.org     ]
```

Elegimos `SASS o SCSS` porque nos facilita la personalización 
de los componentes de Angular Material con Material Design 3

Ahora se nos preguntará sobre si nuestra aplicacion Angular, 
SSR/SSG, para fines practicos seleccionaremos `No`, lo que 
mantendra nuestro aplicativo como una `SPA (Single Page App)`

```sh
? Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? ...
Yes
> No
```

La última pregunta referente a la aplicación Angular es sobre el motor 
de pruebas a utilizar. Por simplicidad utilizaremos `Cypress`

```sh
? Test runner to use for end to end (E2E) tests ...
Playwright [ https://playwright.dev/ ]
> Cypress [ https://www.cypress.io/ ]
None
```

Posteriormente, se nos preguntara qué proveedor de Continous Integration (CI) 
utilizaremos. Seleccionaremos `Do it later` ya que por el momento no configuraremos 
algún CI

```sh
? Which CI provider would you like to use? ...
GitHub Actions
Gitlab
Azure DevOps
BitBucket Pipelines
Circle CI

Do it later
```

Como última pregunta tendremos que seleccionar si deseamos configurar 
la nube de Nx como almacenamiento tipo `cache` para nuestro workspace. 
Seleccionaremos `No` para fines prácticos (realmente no lo nececitamos)

```sh
? Would you like remote caching to make your build faster? ...
(can be disabled any time)
Yes
> No - I would not like remote caching
Remote caching, task distribution and test splitting are provided by Nx Cloud. Read more at https://nx.dev/ci
```

Con las configuraciones seleccionadas, solo tendremos que esperar a que el CLI 
termine de crear la estructura del workspace e instale las dependencias necesarias

Una vez finalizdo el proceso del CLI, dentro de la carpeta `patito-corp` tendremos una estructura de archivos parecida a la siguiente:

- .nx
- .vscode
- apps
    - landing
    - landing-e2e
- editorconfig
- .gitignore
- .prettierignore
- .prettierrc
- eslint.config.js
- jest.config.ts
- jest.preset.js
- nx.json
- package-lock.json
- package.json
- README.md
- tsconfig.base.json

La mayoria de estos archivos son de configuración, con excepción 
de la carpeta `apps` , la cual contendra nuestras aplicaciones angular.

Por defecto se crean dos aplicaciones con el nombre que le indicamos al CLI 
en este caso:

- landing (aplicación principal)
- landing-e2e (aplicación para hacer pruebas end-to-end a la aplicación principal)

## Creación de estructura base

En esta sección moldearemos una estructura base la que nos servirá como 
referencia para llevar el workspace de forma optima y ordenada.

La estructura que definiremos está basada en 3 puntos claves:
- 80% del código fuente debe estar en librerias y 20% en la aplicación principal
- Separación de código por alcance
- Separación de librerías por dominio

El primer punto no requiere mucha explicación, la mayor parte de la lógica 
componentes visuales y utilerías deben implementarse sobre una librería. Esto 
para facilitar la reutilización de código mediante la abstracción de los elementos expuestos por la librería, ya que al ser una librería, el desarrollador tendrá que explicitamente definir entradas y salidas de cada elemento.

**Separación de código por alcance**

La separación de código por alcance se refiere a la agrupación de código y librerías respetando la aplicación a la que pertenecen. Es decir, dadas dos aplicaciones, landing y dashboard , las librerías de landing no pueden ser usadas en dashboard y viceversa. En caso de que exista una librería que deba ser compartida por más de un aplicativo, deberá ponerse en un alcance compartido.

**Separación de librerías por dominio**

La separación de librerías por dominio se refiere a la categorización de las mismas en los siguientes dominios:
- feature-shell
  - Librería encargada de unir las features, por lo general en esta lib se maneja el routing hacia las distintas features dentro de un mismo scope.
  - **Solo debe depender de librerías de tipo "feature"**
- feature-[nombre de la caracteristica]
  - Librería encargada de implementar una caracteristica en concreto
  - **Solo debe depender de librerías de tipo "feature", "ui", "data-access" y "utils"**
- ui
  - Librería encargada de implementar componentes visuales, no deben de tener lógica de negocio (_dummy components_)
  - **Solo debe depender de librerías de tipo "ui" y "utils"**
- data-access
  - Librería encargada de implementar la obtención de los datos y el acceso a los datos de nuestro scope
  - **Solo debe depender de librerías externas para la obtención de datos**
- utils
  - Librería encargada de implementar funciones, clases, interfaces y enums auxiliares o recurrentes
  - **Solo debe depender de librerias externas que sirvan como apoyo**
- config
  - Librería encargada de almacenar toda la configuración dentro de un scope.
  - **No debe de depender de otra librería**

Una vez definido lo anterior definiremos la estructura base del workspace. En este ejemplo solo se tiene el aplicativo "landing" por lo que nuestros scopes serán "landing" y "shared".

**Antes**
```
- .nx
- .vscode
- apps
    - landing
    - landing-e2e
- editorconfig
- .gitignore
- .prettierignore
- .prettierrc
- eslint.config.js
- jest.config.ts
- jest.preset.js
- nx.json
- package-lock.json
- package.json
- README.md
- tsconfig.base.json
```

**Después**
```
- .nx
- .vscode
- apps
    - landing
    - landing-e2e
- libs
    - landing
        - features
            - [nombre feature 1]
            - [nombre feature 2]
            - ...
        - feature-shell
        - ui
        - data-access
        - utils
        - config
    - shared
        - ui
        - utils
        - config
- editorconfig
- .gitignore
- .prettierignore
- .prettierrc
- eslint.config.js
- jest.config.ts
- jest.preset.js
- nx.json
- package-lock.json
- package.json
- README.md
- tsconfig.base.json

```

## Creación de librerías mediante CLI

Ahora que hemos definido la estructura y la razón de ser de la mismo, vamos a partir del workspace generado anteriormente para dejarlo lo más similar a lo que definimos arriba

**Nota: Siempre manipular las aplicaciones y librerías mediante el CLI de NX**

Como vamos a usa angular como framework frontend usaremos el plugin de NX de angular:

```
@nx/angular
```

Podemos ver todo lo que podemos generar con el plugin con el siguiente comando:
```sh
# Sin NX instalado como dependencia global
npx nx list @nx/angular

# Con NX instalado como dependencia global
nx list @nx/angular
```

**Nota: En caso de querer ver que modificaciones hace un comando en los archivos del workspace sin que esas modificaciones tomen efecto basta con agregar la bandera `--dry-run` al final del comando**

### /libs/shared/ui

Al ser la primera librería a generar, vamos a investigar el comando que debemos utilizar del CLI de NX por lo que hacemos un list de "@nx/angular"

```sh
nx list @nx/angular

NX   Capabilities in @nx/angular:

GENERATORS

add-linting : Adds linting configuration to an Angular project.
application : Creates an Angular application.
component : Generate an Angular Component.
component-story : Creates a stories.ts file for a component.
component-test : Creates a cypress component test file for a component.
convert-to-application-executor : Converts projects to use the `@nx/angular:application` executor or the `@angular-devkit/build-angular:application` builder. _Note: this is only supported in Angular versions >= 17.0.0_.
directive : Generate an Angular directive.
federate-module : Create a federated module, which is exposed by a remote and can be subsequently loaded by a host.
init : Initializes the `@nrwl/angular` plugin.
library : Creates an Angular library.
library-secondary-entry-point : Creates a secondary entry point for an Angular publishable library.
remote : Generate a Remote Angular Module Federation Application.
...
```

A nosotros lo que nos interesa es una library por lo que la generamos con el siguiente comando:

```sh
 nx g @nx/angular:library --name=shared-ui --directory=libs/shared/ui --buildable --standalone
```

Con el comando anterior creamos una librería:
- De nombre: `shared-ui`
- En el directorio: `libs/shared/ui`
- _Buildable_:
```txt
Buildable libraries are similar to "publishable libraries" described above. Their scope however is not to distribute or publish them to some external registry. Thus they might not be optimized for bundling and distribution.

Buildable libraries are mostly used for producing some pre-compiled output that can be directly referenced from an Nx workspace application without the need to again compile it. A typical scenario is to leverage Nx’s incremental building capabilities.
```
- _Standalone_: Crea la librería con componentes standalone en vez de mediante modulos

Algunas recomendaciones:
- **Todos los componentes de angular a utilizar deben ser standalone**
- **El nombre de la librería debe tener la siguiente estructura: `[scope]-[dominio/nombre-feature]`. Por ello en el ejemplo anterior la librería se llamó `shared-ui`**
- **El nombre de la librería no necesariamente tiene que coincidir con el nombre de la misma**
- **De ser posible las librerías deben ser _standalone_ y _buildables_**

En caso de equivocarnos, podemos borrar la librería generada con el siguiente comando:

```sh
nx g @nx/workspace:remove --projectName=shared-ui
```

**Es importante borrarla de esta forma para evitar problemas de configuración**

### /libs/shared/utils

```sh
 nx g @nx/angular:library --name=shared-utils --directory=libs/shared/utils --buildable --standalone
```

### /libs/shared/config

```sh
 nx g @nx/angular:library --name=shared-config --directory=libs/shared/config --buildable --standalone
```

### /libs/landing/utils

```sh
 nx g @nx/angular:library --name=landing-utils --directory=libs/landing/utils --buildable --standalone
```

### /libs/landing/data-access

```sh
 nx g @nx/angular:library --name=landing-data-access --directory=libs/landing/data-access --buildable --standalone
```

### /libs/landing/ui

```sh
 nx g @nx/angular:library --name=landing-ui --directory=libs/landing/ui --buildable --standalone
```

### /libs/landing/config

```sh
 nx g @nx/angular:library --name=landing-config --directory=libs/landing/config --buildable --standalone
```

### /libs/landing/feature-shell

```sh
 nx g @nx/angular:library --name=landing-feature-shell --directory=libs/landing/feature-shell --buildable --standalone
```

### /libs/landing/feature/[nombre de feature]

Hasta ahora, hemos creado librerías preestablecidas que nos facilitara el uso de buenas prácticas, sin embargo, las librerías que se crean dentro de la carpeta _feature_ son un tanto más arbitrarias ya que dependen en gran medida del análisis que se lleva al rededor del sistema y de la manera en la que se defina una _feature_. Muchas veces se segmentan mediante _Casos de uso_ o _Historias de usuario_, en ese caso, se tendría que crear una _feature_ por caso de uso o historia de usuario. Otra forma de clasificar a una _feature_ es desde el concepto de _smart component_, lo que significa la creación de un componente con lógica de negocio, dicho componente puede hacer uso de _dummy components_.

Para este README vamos a crear una feature muy sencilla que será la página de "Inicio" de nuestra aplicación "Landing":

```sh
nx g @nx/angular:library --name=landing-inicio --directory=libs/landing/features/home --buildable --standalone
```

Con esto hemos creado nuestra primer _feature_ y terminado de crear las librerías que nos van a servir como estructura base. En la siguientes secciones instalaremos algunas dependencias que nos serán de utilidad, así como, algunas configuraciones útiles.

Como detalle final de la sección, podemos ver las librerías creadas con el siguiente comando:

```sh
nx graph
```

Una vez iniciado el servidor local, vamos a la URL _http://127.0.0.1:4211/projects/all_ y podremos observar un grafo con las librerías creadas y su relación entre ellas

## Instalación de librerías útiles

### Tailwindcss

Como líbreria de estilos usaremos tailwind. Tailwind nos facilita la aplicación de estilos mediante sus clases CSS orientadas a utilerias. [Para más información](https://tailwindcss.com/docs/guides/vite).

Para agregar tailwind a nuestra aplicación ejecutaremos el siguiente comando:

```sh
nx g @nx/angular:setup-tailwind landing
```

**Nota: Este comando se ejecuta sobre aplicaciones y no sobre librerias. Esto porque nuestras librerías no las vamos a distribuir sino que siempre las usaremos a través de nuestra aplicación**

Al ejecutar el comando anterior se nos instalará la dependencia de _tailwindcss_ y se nos creará un archivo de configuración en la raíz de la aplicación que especificamos:

```sh
UPDATE package.json
CREATE apps/landing/tailwind.config.js
UPDATE apps/landing/src/styles.scss
```

En ese archivo configuraremos todo lo relacionado a tailwind. Sin embargo, y previendo la creación de aplicaciones en el futuro bajo una misma identidad gráfica, esa configuración la especificaremos en una de las librerías creadas. Al querer compartir esta configuración entre aplicaciones, el scope a elegir será _shared_ y el dominio, al tratarse de una configuración, será _config_.

Al expandir la libreria `shared/config` nos encontraremos con la siguiente estructura de archivos:

```
config
  - src
    - lib
      - shared-config 
    - index.ts
    ...
```

Dentro de la carpeta `lib` pondremos nuestros archivos como componentes, clases, interfaces etc.

En el archivo `index.ts` declararemos todo lo que queremos hacer visible para los usuarios de nuestra librería. Si la clase/interface/enum/componente no se exporta explicitamente mediante este archivo, dicho recurso no sera accesible fuera de la librería

**Limpiar la lib**

Para evitar confusiones, eliminaremos la carpeta `shared-config`

```sh
rm -rf libs/shared/config/src/lib/shared-config
```

Eliminamos la línea que exporta explicitamente el componente que acabamos de eliminar

> ~~export * from './lib/shared-config/shared-config.component';~~

**Crear directorio y archivo para configurar tailwindcss**

Dentro de la carpeta `shared/config/src/lib`, creamos una carpeta llamada `tailwindcss` y adentro de ella dos archivos `index.ts` y `themes.ts`

Dentro de `themes.ts` agregamos lo siguiente:
```ts
export const defaultThemeColors = {
  colors: {
    primary: '#662D91',
    secondary: '#F15A24',
  },
};
```

Y dentro de `index.ts`:
```ts
// shared/config/src/lib/tailwindcss/index.ts
export {defaultThemeColors} from './themes';
```

Por último debemos exportar el `index.ts` de `tailwindcss` hacia afuera de la librería, para eso, editamos el archivo `shared/config/src/index.ts`:
```ts
// shared/config/src/index.ts
export * from './lib/tailwindcss';
```

**Importar configuración en app**

Abrimos el archivo `apps\landing\tailwind.config.js` y modificamos su contenido para verse como el siguiente:
```js
const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
const  {defaultThemeColors} = require('../../libs/shared/config/src/lib/tailwindcss')


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      ... defaultThemeColors
    },
  },
  plugins: [],
};
```

Abrimos el archivo `apps\landing\src\styles.scss` y modificamos su contenido para verse como el siguiente (si aun no lo tiene):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* You can add global styles to this file, and also import other style files */

```

**Nota importante: Al ser el archivo `tailwind.config.js` de configuración externo a las librerías angular, ya que este mismo sirve para preprocesar las hojas de estilo usadas mediante _tailwind_ para compilar los proyectos angular; el `import` se hace directamente mediante el archivo `index` de la carpeta `tailwindcss` (`libs\shared\config\src\lib\tailwindcss\index.ts`), en vez de importarlo mediante el `index` de la librería angular (`libs\shared\config\src\index.ts`).**

En caso de tener más aplicaciones podemos realizar el mismo import y asi compartir la configuración entre aplicaciones, de esta forma centralizamos la configuración y reducimos duplicados y puntos de falla.

Con esto se termina de configurar Tailwindcss para la aplicación _landing_. A continuación instalaremos una librería que nos facilita la internacionalización de nuestras aplicaciones

### NgxTranslate

Esta librería facilita el manejo de la internacionalización en nuestra aplicación. Primero instalaremos dos dependencias necesarias:
- @ngx-translate/core: Es el core que nos ayuda a manipular el idioma a mostrarle al usuario de nuestra aplicación
- @ngx-translate/http-loader: Es un loader para cargar mediante http nuestras definiciones de etiquetas en distintos idiomas

```sh
npm i @ngx-translate/core
```

```sh
npm i @ngx-translate/http-loader
```

Al estar trabajando con las versiones más recientes de angular, no es necesario fijarnos en la compatibilidad entre versiones de dependencias a instalar y la versión de angular, sin embargo, siempre es bueno ver la tabla de compatibilidad que indica la dependencia a instalar. Ejemplo: https://github.com/ngx-translate/core?tab=readme-ov-file#installation


Una vez instaladas las dependencias de _ngx-translate_ toca configurarlo en nuestra aplicación (_landing_).

Al ser una configuración, vamos a declararla en la libreria _config_ del scope _shared_.

En la carpeta `libs\shared\config\src\lib`, crearemos una carpeta llamada `ngx-translate` y dentro de esa carpeta dos archivos `index.ts` y `module.config.ts` con el siguiente contenido:

```ts
// libs\shared\config\src\lib\ngx-translate\module.config.ts
import { HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { LocalStorageKeys } from "../local-storage/keys";

export const ngxTranslateModuleConfig = TranslateModule.forRoot({
    defaultLanguage: localStorage.getItem(LocalStorageKeys.preferredLang) ?? 'en',
    loader: {
      provide: TranslateLoader,
      useFactory: (http: HttpClient) =>
        new TranslateHttpLoader(http, '/i18n/', '.json'),
      deps: [HttpClient],
    },
  });
```

```ts
// libs\shared\config\src\lib\ngx-translate\index.ts
export {ngxTranslateModuleConfig} from './module.config';
```

### LocalStorage
Dentro de la misma carpeta `libs\shared\config\src\lib` crearemos un apartado `local-storage` para guardar las llaves de local storage:

- local-storage
  - index.ts
  - keys.ts

```ts
// keys.ts
export enum LocalStorageKeys {
    preferredLang = 'preferredLang'
}

```

```ts
// index.ts
export {LocalStorageKeys} from './keys'
```

### Exponer en el  api publica
El archivo `./src/index.ts` de cada libreria es el punto de entrada. Todo lo exportado en este archivo puede ser usado fueraa de la lib.

```ts
// libs\shared\config\src\index.ts
export * from './lib/tailwindcss';

```

## Variables de entorno

Para las variables de entorno usaremos el fileReplacement propuesto por angular, por lo que en cada app se tiene la opcion de agregar 
archivos que cambian dependiendo de la configuración.

Ejemplo

En la app `landing` (`apps\landing`), dentro de `src` crearemos la carpeta `environments` la cual consta de:

- environments
  - environments.prod.ts
  - environments.ts

Nota: Siempre se debe importar el `environments.ts`

En el archivo `libs\shared\config\project.json` vamos a agregar lo sieguiente:

```ts
{
  ...
  "target": {
    ...
    "build": {
      ...
      "configurations": {
        "production": {
          "budgets": [
            {
              "type": "initial",
              "maximumWarning": "500kb",
              "maximumError": "1mb"
            },
            {
              "type": "anyComponentStyle",
              "maximumWarning": "2kb",
              "maximumError": "4kb"
            }
          ],
          "outputHashing": "all",
          "fileReplacements": [ // <==== se agrega este nodo
            {
                "replace": "src/environments/environment.ts",
                "with": "src/environments/environment.prod.ts"
            }
          ],
        },
        "development": {
          "optimization": false,
          "extractLicenses": false,
          "sourceMap": true
        }
      },
      "defaultConfiguration": "development" // <=== Se cambia por development , antes production

    }
  }
  
}

```


## Angular Material

Para usar angular material, agregarlo de la siguiente forma

- npm install @angular/material 
- npx nx g @angular/material:ng-add --project=my-project-name

Para configurarlo seguir: `https://material.angular.io/guide/theming` 

## Comandos útiles


### Comandos de NX
Referirse a `https://nx.dev/reference/nx-commands`

### Comandos de angular
```sh
 NX   Capabilities in @nx/angular:

GENERATORS

add-linting : Adds linting configuration to an Angular project.
application : Creates an Angular application.
component : Generate an Angular Component.
component-story : Creates a stories.ts file for a component.
component-test : Creates a cypress component test file for a component.
convert-to-application-executor : Converts projects to use the `@nx/angular:application` executor or the `@angular-devkit/build-angular:application` builder. _Note: this is only supported in Angular versions >= 17.0.0_.
directive : Generate an Angular directive.
federate-module : Create a federated module, which is exposed by a remote and can be subsequently loaded by a host.
init : Initializes the `@nrwl/angular` plugin.
library : Creates an Angular library.
library-secondary-entry-point : Creates a secondary entry point for an Angular publishable library.
remote : Generate a Remote Angular Module Federation Application.
move : Moves an Angular application or library to another folder within the workspace and updates the project configuration.
convert-to-with-mf : Converts an old micro frontend configuration to use the new withModuleFederation helper. It will run successfully if the following conditions are met:
 - Is either a host or remote application
 - Shared npm package configurations have not been modified
 - Name used to identify the Micro Frontend application matches the project name

{% callout type="warning" title="Overrides" %}This generator will overwrite your webpack config. If you have additional custom configuration in your config file, it will be lost!{% /callout %}
host : Generate a Host Angular Module Federation Application.
ng-add : Migrates an Angular CLI workspace to Nx or adds the Angular plugin to an Nx workspace.
ngrx : Adds NgRx support to an application or library.
ngrx-feature-store : Adds an NgRx Feature Store to an application or library.
ngrx-root-store : Adds an NgRx Root Store to an application.
pipe : Generate an Angular Pipe
scam-to-standalone : Convert an existing Single Component Angular Module (SCAM) to a Standalone Component.
scam : Generate a component with an accompanying Single Component Angular Module (SCAM).
scam-directive : Generate a directive with an accompanying Single Component Angular Module (SCAM).
scam-pipe : Generate a pipe with an accompanying Single Component Angular Module (SCAM).
setup-mf : Generate a Module Federation configuration for a given Angular application.
setup-ssr : Generate Angular Universal (SSR) setup for an Angular application.
setup-tailwind : Configures Tailwind CSS for an application or a buildable/publishable library.
stories : Creates stories/specs for all components declared in a project.
storybook-configuration : Adds Storybook configuration to a project.
cypress-component-configuration : Setup Cypress component testing for a project.
web-worker : Creates a Web Worker.

EXECUTORS/BUILDERS

webpack-browser : Builds an Angular application using [webpack](https://webpack.js.org/).
dev-server : Serves an Angular application using [webpack](https://webpack.js.org/) when the build target is using a webpack-based executor, or [Vite](https://vitejs.dev/) when the build target uses an [esbuild](https://esbuild.github.io/)-based executor.
webpack-server : Builds a server Angular application using [webpack](https://webpack.js.org/). This executor is a drop-in replacement for the `@angular-devkit/build-angular:server` builder provided by the Angular CLI. It is usually used in tandem with the `@nx/angular:webpack-browser` executor when your Angular application uses a custom webpack configuration.
delegate-build : Delegates the build to a different target while supporting incremental builds.
ng-packagr-lite : Builds an Angular library with support for incremental builds.

This executor is meant to be used with buildable libraries in an incremental build scenario. It is similar to the `@nx/angular:package` executor but it only produces ESM2022 bundles.
package : Builds and packages an Angular library producing an output following the Angular Package Format (APF) to be distributed as an NPM package.

This executor is a drop-in replacement for the `@angular-devkit/build-angular:ng-packagr` with additional support for incremental builds.
browser-esbuild : Builds an Angular application using [esbuild](https://esbuild.github.io/).
module-federation-dev-server : Serves host [Module Federation](https://module-federation.io/) applications ([webpack](https://webpack.js.org/)-based) allowing to specify which remote applications should be served with the host.
module-federation-dev-ssr : The module-federation-ssr-dev-server executor is reserved exclusively for use with host SSR Module Federation applications. It allows the user to specify which remote applications should be served with the host.
application : Builds an Angular application using [esbuild](https://esbuild.github.io/) with integrated SSR and prerendering capabilities. _Note: this is only supported in Angular versions >= 17.0.0_.
extract-i18n : Extracts i18n messages from source code.
```

# Estructura de la aplicación 

Hasta ahora hemos hablado de la estructura y configuración del monorepo y sus librerias, en esta sección se discutira sobre la estructura de una aplicación


**Se recomienda usar Signals en todo momento para mantener y actualizar variables y si es posible OnPush como estrategia de detección de cambios**

- Signals: https://angular.dev/guide/signals
- Signals para input/output en vez de decoradores: https://angular.dev/guide/components/inputs
- OnPush: https://angular.dev/best-practices/skipping-subtrees#using-onpush

**Indice**

- [Stack](#stack)
- [Convención de nombres](#convención-de-nombres)
- [Estructura del proyecto](#esctructura-del-proyecto)
- [Routing de aplicación](#routing-del-proyecto)
- [Internacionalización](#internacionalización)
- [Interceptores utilizados](#interceptores-utilizados)

## Stack
- **Angular >= 18:** Versiones más antiguas no tienen buena integración con tailwindcss y en la versión 13 hay cambios importantes, por lo que se recomienda crear el proyecto con la versión más reciente de Angular
- **Angular Material >= 18:** Esta versión depende de la versión instalada de Angular
- **Tailwindcss >= 3.0** Se sustituye Bootstrap por Tailwind por cuestiones de simplicidad, performance y estilos
  - daisyui (plugin de componentes)


## Esctructura del proyecto

A continuación se muestra la estructura propuesta que el proyecto Angular debería seguir
- public
    - assets
- src
    - app
        - pages
            - [nombre pagina]
                - [nombre pagina].component.html
                - [nombre pagina].component.scss
                - [nombre pagina].component.ts
                - [nombre pagina].component.spec.ts
                - pages
                    - ...
            - ...
        - shared
            - components
            - enums
              - app.routes.ts
            - pipes
            - services
            - types
            - interfaces
            - classes
            - services
                - user.service.ts
        - app.component.ts 
        - app.component.spec.ts 
        - app.component.scss 
        - app.component.html
        - app.routes.ts 
        - app.config.ts 

### /public/assets

Directorio que es publico en el empaquetado final de la aplicación.En la carpeta assets se pondran todos los recursos graficos utilizados en la aplicación

Para acceder a los recursos de la carpeta `assets` se tiene que hacer mediante la ruta `/assets/`

Ejemplo:
```html
<img src="/assets/img1.png" />
```

### /src/app/pages

Directorio donde se almacenan las carpetas que incluyen los componentes que fungen como páginas en la aplicación

### /src/app/pages/[nombre de pantalla]

Directorio donde se almacenan los archivos de la pantalla en cuestion, dado que es un componente, la carpeta debe contar minimo con los siguientes archivos

Maquetado
- [nombre pagina].component.html

Estilo
- [nombre pagina].component.scss

Lógica
- [nombre pagina].component.ts

Pruebas
- [nombre pagina].component.spec.ts


### /src/app/pages/[nombre de pantalla]/[nombre pagina].component.ts

Archivo que contiene la lógica de la pantalla en cuestion. 

### /src/app/pages/[nombre de pantalla]/[nombre pagina].component.html

Archivo que contiene el layout de la pantalla en cuestion. 

### /src/app/pages/[nombre de pantalla]/[nombre pagina].component.scss

Archivo que contiene el estilo de la pantalla en cuestion. 


### /src/app/shared

Carpeta que contiene todos los demás archivos que no son pantallas:
- componentes
- types
- classes
- components
- interfaces
- enums
- services

### /src/app/shared/enums/app.routes.ts

Archivo que contiene todas las rutas en texto duro de todas las pantaallas, por ejemplo:

```ts
// app.routes.ts
export enum AppRoutes {
    login = '/login',
    home = '/home',
    dashboard = '/dashboard',
}

```

## Convención de nombres
- **Módulos:**
  - **Regla:** [nombre módulo en español]
  - **Nota** Usar módulos solo cuando sea necesario ya que la mayor parte debe ser standalone
  - **Ejemplo:**
    - autenticacion.module.ts
- **Pages:**
  - **Regla:** [nombre pantalla en español]
  - **Ejemplo:**
    - verificar-equipo-computo.component.ts
    - verificar-equipo-computo.component.html
    - verificar-equipo-computo.component.scss
- **Archivos no mencionados:**
  - **Regla:** [nombre archivo separado por guiones medios en español]
  - **Ejemplo:**
    - context-info-utils.ts
- **Constantes/Variables:**
  - **Regla:** [nombre en español usando camelCase]
  - **Ejemplo:** showContextInfoResults __(En caso de ser constante agregar modificador 'readonly' o 'const')__
- **Clases/Enums/Interfaces:**
  - **Regla:** [nombre en español usando PascalCase]
  - **Ejemplo:** ContextInfoInterface
- **Nombre de métodos dentro de RouterService**
  - **Regla:** [prefijo del modulo][nombrePantalla] __(Usar camelCase)__
  - **Ejemplo:** cuasRecuperarContrasenia

## Routing del proyecto
### /src/app/app.routes.ts

Archivo que contiene y donde se deben definir las rutas de toda la aplicación de la siguiente forma.

Dada la siguiente estructura del proyecto:

```
- pages
    - dashboard-layout
        - dashboard-layout.component.html
        - dashboard-layout.component.scss
        - dashboard-layout.component.ts
        - dashboard-layout.component.spec.ts
        - pages
            - inicio
                - inicio.component.html
                - inicio.component.scss
                - inicio.component.ts
                - inicio.component.spec.ts
            - examen
                - ...
    - login
        - login.component.html
        - login.component.scss
        - login.component.ts
        - login.component.spec.ts
    - ...
```

En el archivo `app.routes.ts` tendria que representarse de la siguiente manera con el objetivo de generar el routing apropiado hacia estas pantallas

```ts
// app.routes.ts

import { Routes } from '@angular/router';
import { AppRoutes } from './shared/enums/routes';

export const routes: Routes = [
  {
    path: AppRoutes.login.slice(1),
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRoutes.login,
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/dashboard-layout/dashboard-layout.component').then(
        (c) => c.DashboardLayoutComponent
      ),
    children: [
      {
        path: AppRoutes.home.slice(1),
        loadComponent: () =>
          import('./pages/dashboard-layout/pages/inicio/inicio.component').then(
            (c) => c.InicioComponent
          ),
      },

      // ... demas pantallas que deban verse dentro del layout dashboard
    ],
  },
  // ... demas pantallas que no formen parte del layout dashboard
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: AppRoutes.login,
  },
];

```

En el ejemplo anterior se hace uso de un layout es por eso que `inicio` forman parte del arreglo `children` del layout.

Para que el ruteo con el ejemplo anterior funcione correctamente, en el HTML del layout se debe incluir un `<router-outlet>` para que los hijos de este 
componente se rendericen dentro de ese outlet.

### RouterLink

Se quita cualquier servicio que use el `router.navigate`o similares en favor de que se ocupe directaamente en el `HTML` las directivas `[routerLink]` del modulo `Router` propio de angular.

Esto con el fin de mejorar la experiencia y la accesibilidad para el usuario final


**Ejemplo**

```html
<button
    mat-flat-button
    [routerLink]="routes.examen | routeParams: {idVersion: sesion.idVeersion, idSesion: sesion.id}"
    class="secondary-button"
    [disabled]="!sesion.activo"
>
    {{ "etiquetas.gestionar" | translate }}
</button>
```
```ts
export class SesionesDisponiblesComponent {
    readonly routes = AppRoutes;
    // ...
    constructor(
    ) {}


}
```

En caso que se requiera meter lógica, se usaría directaamente el `Router` de angular:

```html
<form [formGroup]="fg" (ngSubmit)="registrar()">
    <button
        mat-flat-button
        class="secondary-button"
        [disabled]="!sesion.activo"
        type="submit"
    >
        {{ "etiquetas.registrar" | translate }}
    </button>
</form>
```
```ts
export class SesionesDisponiblesComponent {
    readonly routes = AppRoutes;
    readonly fg = new FormGroup({
        // ...
    });
    // ...
    constructor(
        private router: Router,
        private routeParams: RouteParamsPipe
    ) {}
    registrar() {
        const sesion = fg.getRawValue();
        this.router.navigate([this.routeParams.transform(routes.gestionar)]);
    }

}
```

### RouteParamsPipe

```ts
// \src\app\shared\pipes\route-params.ts
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    standalone: true,
    name: 'routeParams'
})
export class RouteParamsPipe implements PipeTransform {
    transform(value: string, params: object) {
        let route = value;
        Object.entries(params).forEach(([key, value]) => {
            route = route.replace(':'+key, value);
        });
        return route;
    }

}
```

## Internacionalización

Se propone que el siguiente esquema para los archivos de internacionalización

El nombre de las llaves deberá ir en español, en caso de ñ utilizar "ni". Ejemplo año => anio, niña => ninia etc...

**Nota: Tratar de agregar las etiquetas en orden alfabetico**

```json

// es.json
{
  "salir": "Salir",
  "entrar": "Entrar"
}

// en.json
{
  "salir": "Exit",
  "entrar": "Enter"
}

```

## Interceptores utilizados
Se utilizan tres interceptores que facilitan el desarrollo
1. Interceptor para agregar el JWT a cada petición de librería
 ```ts
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserService} from "../services/user.service";
import {environment} from "../../../environments/environment";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    constructor(
        private userService: UserService
    ) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        let jwt = '';
        if (this.userService.getUserData()?.idUsuario && !request.url.includes('google')) {
            jwt = this.userService.getUserData()?.jwt || '';
            request = request.clone({
                setHeaders: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    Authorization: `Bearer ${jwt}`
                }
            });
            if (
                !request.url.includes(environment.jwtApi) &&
                !request.url.includes('autenticacion') &&
                !request.url.includes(environment.cenevalTime)
            ) {
                this.userService.checkToken();
            }
        }
        return next.handle(request);
    }
}
```
2. Interceptor para loggear todas las peticiones y sus respuestas
```ts
import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {UserService} from "../services/user.service";

@Injectable()
export class HttpLoggerInterceptor implements HttpInterceptor {

    constructor(
        private userService: UserService
    ) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (!environment.production &&
            !request.url.includes('i18n') &&
            !request.url.includes('google') &&
            !request.url.includes(environment.cenevalTime)) {

            console.debug(
                'REQUEST >>>\n' +
                request.method + ' ' + request.url + '\n' +
                'Authorization: ' + request.headers.get('Authorization') + '\n' +
                'Body: ' + JSON.stringify(request.body) + '\n' +
                'Params: ' + request.params.toString() + '\n'
            );
        }
        return next.handle(request).pipe(catchError(err => {
            if (err.error && typeof err.error === 'string') {
                err.error = JSON.parse(err.error);
            }
            if (!environment.production) {
                const errObj = {
                    path: request.method + ' ' + request.url,
                    error: err
                };
                console.error('HTTP Request Error: ', errObj);
            }
            return throwError(err);

        })).pipe(map((response) => {
            if (response instanceof HttpResponse &&
                !request.url.includes('i18n') &&
                !environment.production &&
                !request.url.includes('google') &&
                !request.url.includes(environment.cenevalTime)
            ) {
                // eslint-disable-next-line no-console
                console.debug(
                    '<<< RESPONSE\n' +
                    request.method + ' ' + request.url + '\n' +
                    'body:\n' +
                    JSON.stringify(response.body, null, 4)
                );
            }
            return response;
        }));
    }
}

```
3. Interceptor para traducir códigos de error devuelto por las APIs
```ts
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {UserService} from "../services/user.service";

@Injectable()
export class HttpTranslateErrorCodesInterceptor implements HttpInterceptor {

    constructor(
                private router: Router,
                private userService: UserService
    ) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(catchError(error => {
            if (error.error && typeof error.error === 'string') {
                error.error = JSON.parse(error.error);
            }
            if (error?.statusText === "Unknown Error") {
                return throwError(error);
            }
            const errs = error.error as RequestError;
            let msgErrors = [];
            const urlParsed = (request.method + '.' + request.url.replace(/\/[0-9]+/g, '')
                .split('?')[0]).replace(environment.apisBasepath, '');

            if (errs?.details) {

                msgErrors = errs.details.map(err => {
                    // if (err.code.includes('ERROR')) {
                    //     return 'reglas_negocio.UNKNOWN_ERROR';
                    // }
                    if (err.code.includes('CAPA_PERSISTENCIA')) {
                        return 'reglas_negocio.CAPA_PERSISTENCIA';
                    }
                    if (err.code !== 'NOT_FOUND') {
                        return 'reglas_negocio.' + urlParsed + ':' + err.code;
                    } else {
                        if (err.code.includes('autenticacion')) {
                            return 'reglas_negocio.login' + err.code;
                        }
                        return 'reglas_negocio.' + err.code;

                    }
                });
                this.alertsService.setErrors(msgErrors);

            } else {
                if (errs?.code) {
                    if (errs.code !== 'NOT_FOUND') {
                        msgErrors = ['reglas_negocio.' + urlParsed + ':' + errs.code];
                    } else {
                        msgErrors = ['reglas_negocio.' + errs.code];
                    }
                    this.alertsService.setErrors(msgErrors);

                } else {
                    msgErrors = [errs];
                }
            }
            if (!environment.production) {
                console.error('HTTP Translated Error: \n', msgErrors);
            }
            return throwError(msgErrors);

        }));
    }
}

class RequestError {
    code: string;
    details: Array<{
        code: string;
        message: string;
        type: string;
        path: string;
    }>;
    message: string;

    constructor() {
        this.code = '';
        this.details = [];
        this.message = '';
    }

}

```
Y se configuran en el `app.config.ts` de la siguiente forma
```ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }), 
        provideRouter(routes),
        provideAnimationsAsync(),
        {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: HttpTranslateErrorCodesInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: HttpLoggerInterceptor, multi: true},
    ]
};

```
