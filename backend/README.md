## 🚀 Deployment

<a href="https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/deployment.html" target="_blank" rel="noopener noreferrer">Strapi deployment documentation</a>

### `build`

Create a Strapi production build. <a href="https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-build" target="_blank" rel="noopener noreferrer">Build docs</a>

```
npm run build
```

### `start`

Start your Strapi production build. <a href="https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-start" target="_blank" rel="noopener noreferrer">Start docs</a>

```
npm run start
```

## 📝 Strapi Components

### Creating a Strapi Component

**Note: The <a href="https://docs.strapi.io/user-docs/latest/content-types-builder/introduction-to-content-types-builder.html" target="_blank" rel="noopener noreferrer">Strapi Content-Type Builder</a> is a great tool for being able to build and edit components visually, but it doesn't currently have support for multi-level component nesting. Below is the recommended method for creating components as it allows for multi-level component nesting and allows for custom organization as well. The Content-Type Builder is still an excellent reference for the data structure of each component.**

1. Directories inside `./src/components` are used to group components by type or to organize child components with their respective parent component. Navigate to or create a directory in `./src/components` with a hyphenated-lower-case name for your new component or component group.
2. Create a `.json` file with the hyphenated-lower-case name of your component and use the following as a starter.

   ```json
   {
     "collectionName": "components_lorem_ipsum",
     "info": {
       "displayName": "Lorem Ipsum",
       "icon": "info-circle"
     },
     "options": {},
     "attributes": {}
   }
   ```

3. Replace the value of the `collectionName` with `components_` + the name of the parent directory and file name, replacing hyphens with underscores (ex. if your component is located at `./src/components/blog/related-posts.json`, use `components_blog_related_posts` as your `collectionName` value).
4. Replace the value of `info.displayName` with the name that should appear in component lists and menus.
5. Start adding the fields that you'd like to appear on your component to the `attributes` object. See the <a href="#-strapi-component-and-content-type-attributes-reference">attributes reference</a> for examples of each field type.

## 📚 Strapi content types

### Collection types

Collection types are used to create and manage types of content where multiple entries will be sharing a similar schema or template. Examples of data types that make sense as collection types are:

- Blog posts
- Blog authors
- Blog categories
- Case studies
- Pages that share the same template or have large dynamic areas
- Redirects

An additional feature that comes with collection types is the ability to create relationships between different types of content by using <a href="https://docs.strapi.io/user-docs/latest/content-manager/managing-relational-fields.html" target="_blank" rel="noopener noreferrer">relational fields</a> (ex. blog posts have one or many blog authors and one blog category). Relational fields only work with collection types, so if you plan to use a content type in a relationship then you should set it up as a collection type instead of a single type (see the <a href="https://docs.strapi.io/user-docs/latest/content-types-builder/configuring-fields-content-type.html#relation" target="_blank" rel="noopener noreferrer">relation field documentation</a> for more info).

### Single types

Single types are used to create and manage types of content where only one entry will be using a specific schema or template. If there is potential that you will want to create multiple versions of a set of data, it is better to use a collection type. Examples of data types that typically make sense as single types are:

- Footer
- Header
- Legal / copyright data
- Meta data that is shared across all pages
- Company social network links

### Creating a new content type

1. Create a directory in `./src/api` with the singular hyphenated-lower-case name of your new content type (ex. `case-study`).
2. Create the following directories and files inside the directory that you created for your new content type. Replace `[content-type-name]` with the singular hyphenated-lower-case name of your new content type and use the following starter code as the content for each file.

   - `/content-types/[content-type-name]/schema.json`

     ```json
     {
       "kind": "Change this value to specify whether your content type is a 'collectionType' or 'singleType'",
       "collectionName": "Place the plural hyphenated-lower-case name of your content type name here (ex. 'case-studies')",
       "info": {
         "singularName": "Place the singular hyphenated-lower-case name of your content type name here (ex. 'case-study')",
         "pluralName": "Place the plural hyphenated-lower-case name of your content type name here (ex. 'case-studies')",
         "displayName": "Place the name that you'd like to show up in menus here (ex. 'Case Studies')",
         "description": ""
       },
       "options": {
         "draftAndPublish": true
       },
       "pluginOptions": {
         "i18n": {
           "localized": true
         }
       },
       "attributes": {}
     }
     ```

   - `/controllers/[content-type-name].js`

     ```js
     const {createCoreController} = require('@strapi/strapi').factories;

     module.exports = createCoreController(
       'api::[content-type-name].[content-type-name]'
     );
     ```

   - `/routes/[content-type-name].js`

     ```js
     const {createCoreRouter} = require('@strapi/strapi').factories;

     module.exports = createCoreRouter(
       'api::[content-type-name].[content-type-name]'
     );
     ```

   - `/services/[content-type-name].js`

     ```js
     const {createCoreService} = require('@strapi/strapi').factories;

     module.exports = createCoreService(
       'api::[content-type-name].[content-type-name]'
     );
     ```

3. Start adding the fields that you'd like to appear on your content type to the `attributes` object in `/content-types/[content-type-name]/schema.json`. See the <a href="#%F0%9F%93%96-strapi-component-and-content-type-attributes-reference">attributes reference</a> for examples of each field type.

## 📖 Strapi component and content type attributes reference

Create the fields that you'd like your component or content type to have by adding objects with camelCase names to the `attributes` object. Use the following references and starters as examples of Strapi's different field types.

- <a href="https://docs.strapi.io/user-docs/latest/content-types-builder/configuring-fields-content-type.html#regular-fields" target="_blank" rel="noopener noreferrer">Regular fields</a> are used for different types of input data (text, images, pulling content from other areas of the CMS, etc).
- <a href="https://docs.strapi.io/user-docs/latest/content-types-builder/configuring-fields-content-type.html#components" target="_blank" rel="noopener noreferrer">Component fields</a> are used to create nested fields within a component by specifying a child component to include.
- <a href="https://docs.strapi.io/user-docs/latest/content-types-builder/configuring-fields-content-type.html#dynamic-zones" target="_blank" rel="noopener noreferrer">Dynamic zones</a> are used to create flexible content structures by allowing users to pick from a list of components and arrange them in the order that they want them in.

Add the following i18n configuration to each content type and content type field that should have localization enabled.

```json
"pluginOptions": {
  "i18n": {
    "localized": true
  }
}
```

```json
"shortPlainTextFieldExample": {
  "type": "string",
  "default": "lorem ipsum",
  "required": true
}

"longPlainTextFieldExample": {
  "type": "text",
  "default": "lorem ipsum",
  "required": true
}

"richTextFieldExample": {
  "type": "richtext",
  "default": "<h2>lorem ipsum</h2>",
  "required": true
}

"emailFieldExample": {
  "type": "email",
  "default": "email@example.com",
  "required": true
}

"selectDropdownFieldExample": {
  "type": "enumeration",
  "enum": ["h1", "h2", "h3", "h4", "h5", "h6"],
  "default": "h2",
  "required": true
}

"imageFieldExample": {
  "type": "component",
  "component": "media.image",
  "required": true
}

"lottieFieldExample": {
  "type": "component",
  "component": "media.lottie",
  "required": true
}

"mediaFieldExample": {
  "type": "media",
  "allowedTypes": [
    "images",
    "videos",
    "audios",
    "files"
  ],
  "multiple": true,
  "required": true
}

"integerNumberFieldExample": {
  "type": "integer",
  "default": 3,
  "max": 12,
  "min": 1,
  "required": true
}

"bigIntegerNumberFieldExample": {
  "type": "biginteger",
  "default": 1234567890,
  "max": 1234567899,
  "min": 1234567800,
  "required": true
}

"decimalNumberFieldExample": {
  "type": "decimal",
  "default": 3.5,
  "max": 12.5,
  "min": 1.5,
  "required": true
}

"floatNumberFieldExample": {
  "type": "float",
  "default": 6.333333,
  "max": 12.999999,
  "min": 1.333333,
  "required": true
}

"dateTimeFieldExample": {
  "type": "datetime",
  "default": "2022-10-01T13:30:00.000Z",
  "required": true
}

"dateFieldExample": {
  "type": "date",
  "default": "2022-10-01",
  "required": true
}

"timeFieldExample": {
  "type": "time",
  "default": "08:30",
  "required": true
}

"booleanFieldExample": {
  "type": "boolean",
  "default": true,
  "required": true
}

"jsonFieldExample": {
  "type": "json",
  "required": true
}

"uidFieldExample": {
  "type": "uid",
  "targetField": "slug",
  "required": true
}

"componentFieldExample": {
  "type": "component",
  "component": "component-directory-name.component-file-name",
  "repeatable": false,
  "required": true
}

"relationFieldExample": {
  "type": "relation",
  "relation": "oneToMany",
  "target": "api::content-type-name.content-type-name",
  "required": true
}

"dynamicZoneFieldExample": {
  "type": "dynamiczone",
  "components": [
    "component-directory-1.component-file-1",
    "component-directory-2.component-file-2",
    "component-directory-3.component-file-3"
  ],
  "required": true
}
```

## ✏️ API tokens

Strapi API tokens allow for granular control over what data can be accessed over Strapi's API. API tokens can be viewed at `/cms-dashboard/settings/api-tokens`.

### Creating a new API token

Navigate to `/cms-dashboard/settings/api-tokens/create` and set a token name, duration and type. Most situations should only require a read-only token, but full access tokens and custom permission tokens can be used for write access or to restrict the data that a token is allowed to access.

See the <a href="https://docs.strapi.io/user-docs/latest/settings/managing-global-settings.html#managing-api-tokens" target="_blank" rel="noopener noreferrer">API token management reference</a> for more info.

## 🌐 GraphQL API

Strapi has a GraphQL IDE available at `/graphql` when `NODE_ENV=development` that allows developers to easily view and test their GraphQL schemas. Add the following in the `HTTP HEADERS` tab at the bottom of the screen to authorize the IDE to access Strapi's data, replacing `YOUR_API_TOKEN` with the API token that you've generated with Strapi (see <a href="#creating-a-new-api-token">Creating a new API token</a> if you don't already have one).

```json
{
  "Authorization": "Bearer YOUR_API_TOKEN"
}
```

### Additional GraphQL resources

<a href="https://docs.strapi.io/developer-docs/latest/plugins/graphql.html" target="_blank" rel="noopener noreferrer">Strapi GraphQL plugin configuration options</a>.

<a href="https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/graphql-api.html" target="_blank" rel="noopener noreferrer">Strapi GraphQL API reference</a>.

## 🌎 Resources and community

- <a href="https://strapi.io/resource-center" target="_blank" rel="noopener noreferrer">Resources</a> — All Strapi resources including tutorials, guides, documentation, etc.
- <a href="https://docs.strapi.io" target="_blank" rel="noopener noreferrer">Documentation</a> — Official Strapi documentation.
- <a href="https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html" target="_blank" rel="noopener noreferrer">CLI reference</a> — Official reference for the Strapi CLI.
- <a href="https://strapi.io/tutorials" target="_blank" rel="noopener noreferrer">Tutorials</a> — List of Strapi tutorials made by the core team and the community.
- <a href="https://strapi.io/blog" target="_blank" rel="noopener noreferrer">Blog</a> — Official Strapi blog containing articles made by the Strapi team and the community.
- <a href="https://github.com/strapi/awesome-strapi" target="_blank" rel="noopener noreferrer">Awesome Strapi</a> — Collection of documentation, guides, templates, plugins, etc.
- <a href="https://strapi.io/changelog" target="_blank" rel="noopener noreferrer">Changelog</a> — Strapi product updates, new features and improvements.
- <a href="https://forum.strapi.io" target="_blank" rel="noopener noreferrer">Forum</a> — Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- <a href="https://www.npmjs.com/package/@strapi/strapi" target="_blank" rel="noopener noreferrer">NPM</a> — The official Strapi package.
- <a href="https://github.com/strapi/strapi/issues" target="_blank" rel="noopener noreferrer">Issues</a> — Issue tracker in the primary Strapi GitHub repository.
- <a href="https://github.com/strapi/strapi/pulls" target="_blank" rel="noopener noreferrer">Pull requests</a> — Pull requests in the primary Strapi GitHub repository.
- <a href="https://discord.strapi.io" target="_blank" rel="noopener noreferrer">Discord</a> — Come chat with the Strapi community including the core team.

