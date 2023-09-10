import type { Schema, Attribute } from '@strapi/strapi';

export interface MediaImage extends Schema.Component {
  collectionName: 'components_media_images';
  info: {
    displayName: 'image';
    icon: 'file-image';
    description: '';
  };
  attributes: {
    image: Attribute.Media & Attribute.Required;
    lazy: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>;
  };
}

export interface MetaSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    metaTitle: Attribute.String;
    metaDescription: Attribute.String;
    canonicalURL: Attribute.String;
    metaRobots: Attribute.Enumeration<
      ['noindex nofollow', 'noindex', 'nofollow']
    >;
    metaImage: Attribute.Component<'media.image'>;
  };
}

declare module '@strapi/strapi' {
  export module Shared {
    export interface Components {
      'media.image': MediaImage;
      'meta.seo': MetaSeo;
    }
  }
}
