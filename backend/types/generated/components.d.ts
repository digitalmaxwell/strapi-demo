import type { Schema, Attribute } from '@strapi/strapi';

export interface BackgroundImageBackgroundImage extends Schema.Component {
  collectionName: 'components_background_image_background_image';
  info: {
    displayName: 'Background Image';
    icon: 'link';
    description: '';
  };
  attributes: {
    backgroundImage: Attribute.Component<'media.image'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    backgroundImageMobile: Attribute.Component<'media.image'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    backgroundImageAlignment: Attribute.Enumeration<
      ['left', 'center', 'right']
    > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<'right'>;
  };
}

export interface ColorsColors extends Schema.Component {
  collectionName: 'components_colors_colors';
  info: {
    displayName: 'Bolt Colors';
    icon: 'link';
    description: '';
  };
  attributes: {
    color: Attribute.Enumeration<
      [
        'boltBlack',
        'white',
        'gray_200',
        'gray_400',
        'gray_600',
        'gray_700',
        'gray_800',
        'lightningYellow',
        'lightningYellowDark',
        'blue',
        'pink',
        'green',
        'purple'
      ]
    > &
      Attribute.Required &
      Attribute.DefaultTo<'white'>;
  };
}

export interface HeaderPrimaryNavItem extends Schema.Component {
  collectionName: 'components_header_primary_nav_item';
  info: {
    displayName: 'Primary Nav Item';
    icon: 'compass';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    link: Attribute.Component<'links.link'>;
    hasSubMenu: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    subMenuLinks: Attribute.Component<'header.sub-menu-link', true>;
  };
}

export interface HeaderSecondaryNavItem extends Schema.Component {
  collectionName: 'components_header_secondary_nav_item';
  info: {
    displayName: 'Secondary Nav Item';
    icon: 'compass';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    type: Attribute.Enumeration<['text', 'button']> &
      Attribute.Required &
      Attribute.DefaultTo<'text'>;
    link: Attribute.Component<'links.link'>;
    hasSubMenu: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    subMenuLinks: Attribute.Component<'header.sub-menu-link', true>;
  };
}

export interface HeaderSubMenuLink extends Schema.Component {
  collectionName: 'components_header_sub_menu_link';
  info: {
    displayName: 'Sub Menu Link';
    icon: 'compass';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    link: Attribute.Component<'links.link'> & Attribute.Required;
  };
}

export interface HeaderSuperNavItem extends Schema.Component {
  collectionName: 'components_header_super_nav_item';
  info: {
    displayName: 'Super Nav Item';
    icon: 'compass';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    link: Attribute.Component<'links.link'>;
  };
}

export interface LinksButtonWIcon extends Schema.Component {
  collectionName: 'components_links_button_with_icon';
  info: {
    displayName: 'Button with Icon';
    icon: 'sliders-h';
    description: '';
  };
  attributes: {
    componentId: Attribute.String;
    className: Attribute.String;
    isModal: Attribute.Boolean & Attribute.DefaultTo<true>;
    iconPosition: Attribute.Enumeration<['left', 'right']> &
      Attribute.DefaultTo<'left'>;
    buttonIcon: Attribute.Component<'media.image'>;
    text: Attribute.Text & Attribute.Required;
    link: Attribute.Component<'links.button'> & Attribute.Required;
  };
}

export interface LinksButton extends Schema.Component {
  collectionName: 'components_links_buttons';
  info: {
    displayName: 'Button';
    icon: 'link';
    description: '';
  };
  attributes: {
    link: Attribute.Component<'links.link'> & Attribute.Required;
    theme: Attribute.Enumeration<
      ['default', 'default2white', 'lightningYellow', 'lightningYellow2white']
    >;
    size: Attribute.Enumeration<['default', 'small', 'medium']>;
    styles: Attribute.Enumeration<['default', 'outlined', 'withIcon']>;
  };
}

export interface LinksImgTextLink extends Schema.Component {
  collectionName: 'components_links_img_text_link';
  info: {
    displayName: 'Image & Text Link';
    icon: 'link';
    description: '';
  };
  attributes: {
    text: Attribute.String;
    image: Attribute.Component<'media.image'>;
    link: Attribute.Component<'links.link'> & Attribute.Required;
  };
}

export interface LinksLink extends Schema.Component {
  collectionName: 'components_links_links';
  info: {
    displayName: 'Link';
    icon: 'link';
    description: '';
  };
  attributes: {
    href: Attribute.String & Attribute.Required;
    target: Attribute.Enumeration<['_blank']>;
    rel: Attribute.Enumeration<
      [
        'noopener noreferrer nofollow',
        'noopener noreferrer',
        'noopener',
        'noreferrer',
        'nofollow'
      ]
    >;
    ariaLabel: Attribute.String;
  };
}

export interface LinksTextLink extends Schema.Component {
  collectionName: 'components_links_text_link';
  info: {
    displayName: 'Text Link';
    icon: 'link';
    description: '';
  };
  attributes: {
    text: Attribute.String;
    link: Attribute.Component<'links.link'> & Attribute.Required;
  };
}

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

export interface MediaMediaBlockBodyList extends Schema.Component {
  collectionName: 'components_media_media_block_body_list';
  info: {
    displayName: 'Media Block Body List';
    description: '';
  };
  attributes: {
    heading: Attribute.String & Attribute.Required;
    body: Attribute.RichText & Attribute.Required;
  };
}

export interface MediaMediaBlockCta extends Schema.Component {
  collectionName: 'components_media_media_block_ctas';
  info: {
    displayName: 'Media Block CTA';
    icon: 'link';
    description: '';
  };
  attributes: {
    ctaType: Attribute.Enumeration<['button', 'text']> & Attribute.Required;
    text: Attribute.String & Attribute.Required;
    link: Attribute.Component<'links.link'> & Attribute.Required;
  };
}

export interface MediaMediaBlockImageLink extends Schema.Component {
  collectionName: 'components_media_images_link';
  info: {
    displayName: 'Media Block Image Link';
    icon: 'file-image';
    description: '';
  };
  attributes: {
    image: Attribute.Component<'media.image'> & Attribute.Required;
    link: Attribute.Component<'links.link'> & Attribute.Required;
  };
}

export interface MediaMediaBlock extends Schema.Component {
  collectionName: 'components_media_media_blocks';
  info: {
    displayName: 'Media Block';
    icon: 'file-image';
    description: '';
  };
  attributes: {
    componentId: Attribute.String;
    className: Attribute.String;
    spacing: Attribute.Component<'spacing.spacing'> & Attribute.Required;
    heading: Attribute.String;
    headingClass: Attribute.String;
    headingType: Attribute.Enumeration<['h1', 'h2', 'h3', 'h4', 'h5', 'h6']> &
      Attribute.DefaultTo<'h3'>;
    body: Attribute.RichText;
    bodyList: Attribute.Component<'media.media-block-body-list', true>;
    imageLinks: Attribute.Component<'media.media-block-image-link', true>;
    image: Attribute.Component<'media.image'>;
    mobileImage: Attribute.Component<'media.image'>;
    imageWidth: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
        max: 12;
      }> &
      Attribute.DefaultTo<6>;
    ctas: Attribute.Component<'media.media-block-cta', true>;
    gridExtend: Attribute.Boolean;
    rowExtend: Attribute.Boolean;
    reverse: Attribute.Boolean;
    imageExtend: Attribute.Boolean;
    align: Attribute.Enumeration<['left', 'center']> &
      Attribute.DefaultTo<'center'>;
    responsiveTextAlign: Attribute.Enumeration<['left', 'center']> &
      Attribute.DefaultTo<'left'>;
    maxContentWidth: Attribute.String;
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

export interface NavigationOptionsColorTheme extends Schema.Component {
  collectionName: 'components_navigation_options_color_theme';
  info: {
    displayName: 'Navigation Options \u2014 Color Theme';
    icon: 'search';
  };
  attributes: {
    theme: Attribute.Enumeration<['light', 'medium', 'dark', 'yellow']> &
      Attribute.Required &
      Attribute.DefaultTo<'light'>;
  };
}

export interface NavigationOptionsFooter extends Schema.Component {
  collectionName: 'components_navigation_options_footer';
  info: {
    displayName: 'Navigation Options \u2014 Footer';
    icon: 'search';
  };
  attributes: {
    enabled: Attribute.Boolean & Attribute.DefaultTo<true>;
  };
}

export interface NavigationOptionsHeader extends Schema.Component {
  collectionName: 'components_navigation_options_header';
  info: {
    displayName: 'Navigation Options \u2014 Header';
    icon: 'search';
  };
  attributes: {
    enabled: Attribute.Boolean & Attribute.DefaultTo<true>;
  };
}

export interface NavigationOptionsNavigationOptions extends Schema.Component {
  collectionName: 'components_navigation_options_navigation_options';
  info: {
    displayName: 'Navigation Options';
    icon: 'search';
  };
  attributes: {
    header: Attribute.Component<'navigation-options.header'>;
    footer: Attribute.Component<'navigation-options.footer'>;
    responsiveNav: Attribute.Component<'navigation-options.responsive-nav'>;
    colorTheme: Attribute.Component<'navigation-options.color-theme'>;
  };
}

export interface NavigationOptionsResponsiveNav extends Schema.Component {
  collectionName: 'components_navigation_options_responsive_nav';
  info: {
    displayName: 'Navigation Options \u2014 Responsive Nav';
    icon: 'search';
  };
  attributes: {
    enabled: Attribute.Boolean & Attribute.DefaultTo<true>;
  };
}

export interface SpacingSpacing extends Schema.Component {
  collectionName: 'components_spacing_spacing';
  info: {
    displayName: 'Component Spacing';
    icon: 'link';
    description: '';
  };
  attributes: {
    marginTop: Attribute.Enumeration<
      [
        'marginTop--none',
        'marginTop--xs',
        'marginTop--sm',
        'marginTop',
        'marginTop--lg',
        'marginTop--xl',
        'marginTop--custom'
      ]
    > &
      Attribute.Required &
      Attribute.DefaultTo<'marginTop--custom'>;
    marginBottom: Attribute.Enumeration<
      [
        'marginBottom--none',
        'marginBottom--xs',
        'marginBottom--sm',
        'marginBottom',
        'marginBottom--lg',
        'marginBottom--xl',
        'marginBottom--custom'
      ]
    > &
      Attribute.Required &
      Attribute.DefaultTo<'marginBottom--custom'>;
    paddingTop: Attribute.Enumeration<
      [
        'paddingTop--none',
        'paddingTop--xs',
        'paddingTop--sm',
        'paddingTop',
        'paddingTop--lg',
        'paddingTop--xl',
        'paddingTop--custom'
      ]
    > &
      Attribute.Required &
      Attribute.DefaultTo<'paddingTop--custom'>;
    paddingBottom: Attribute.Enumeration<
      [
        'paddingBottom--none',
        'paddingBottom--xs',
        'paddingBottom--sm',
        'paddingBottom',
        'paddingBottom--lg',
        'paddingBottom--xl',
        'paddingBottom--custom'
      ]
    > &
      Attribute.Required &
      Attribute.DefaultTo<'paddingBottom--custom'>;
  };
}

declare module '@strapi/strapi' {
  export module Shared {
    export interface Components {
      'background-image.background-image': BackgroundImageBackgroundImage;
      'colors.colors': ColorsColors;
      'header.primary-nav-item': HeaderPrimaryNavItem;
      'header.secondary-nav-item': HeaderSecondaryNavItem;
      'header.sub-menu-link': HeaderSubMenuLink;
      'header.super-nav-item': HeaderSuperNavItem;
      'links.button-w-icon': LinksButtonWIcon;
      'links.button': LinksButton;
      'links.img-text-link': LinksImgTextLink;
      'links.link': LinksLink;
      'links.text-link': LinksTextLink;
      'media.image': MediaImage;
      'media.media-block-body-list': MediaMediaBlockBodyList;
      'media.media-block-cta': MediaMediaBlockCta;
      'media.media-block-image-link': MediaMediaBlockImageLink;
      'media.media-block': MediaMediaBlock;
      'meta.seo': MetaSeo;
      'navigation-options.color-theme': NavigationOptionsColorTheme;
      'navigation-options.footer': NavigationOptionsFooter;
      'navigation-options.header': NavigationOptionsHeader;
      'navigation-options.navigation-options': NavigationOptionsNavigationOptions;
      'navigation-options.responsive-nav': NavigationOptionsResponsiveNav;
      'spacing.spacing': SpacingSpacing;
    }
  }
}
