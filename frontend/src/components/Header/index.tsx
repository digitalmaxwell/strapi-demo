import arrayIsValid from "/src/lib/arrayIsValid";

interface Link {
  href: string;
  target: string;
  rel: string;
  ariaLabel: string;
}

interface NavItem {
  title: string;
  link: Link;
  hasSubMenu: boolean;
  subMenuLinks: Array<{ title: string; link: Link }>;
}

interface NavigationData {
  data: {
    attributes: {
      name?: string;
      primaryNavItems?: NavItem[];
      secondaryNavItems?: NavItem[];
      superNavItems?: NavItem[];
    };
  };
}

interface HeaderProps {
  enabled?: boolean;
  primaryNavigation?: NavigationData;
  secondaryNavigation?: NavigationData;
  superNavigation?: NavigationData;
}

const Header: React.FC<HeaderProps> = ({
  enabled = true,
  primaryNavigation,
  secondaryNavigation,
  superNavigation,
}) => {
  if (
    arrayIsValid(superNavigation?.data.attributes.superNavItems) &&
    arrayIsValid(primaryNavigation?.data.attributes.primaryNavItems) &&
    arrayIsValid(secondaryNavigation?.data.attributes.secondaryNavItems) &&
    enabled
  ) {
    return <header>Header</header>;
  } else if (!enabled) {
    return null;
  } else {
    throw new Error(
      `Error in Header: primaryNavigation, secondaryNavigation, & superNavigation arrays must be passed into the component.\n\nprimaryNavigation: ${primaryNavigation}\n\nsecondaryNavigation: ${secondaryNavigation}\n\nsuperNavigation: ${superNavigation}`,
    );
  }
};

export default Header;
