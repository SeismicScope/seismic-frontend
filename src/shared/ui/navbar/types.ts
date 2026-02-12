export interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

export interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
}

export type NavProps = {
  logo: {
    url: string;
    alt: string;
    title: string;
  };
  user: string;
  menuWithAdmin: MenuItem[];
  login: () => void;
  logout: () => void;
};
