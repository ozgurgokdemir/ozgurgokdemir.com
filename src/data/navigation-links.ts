type NavigationLink = {
  pathname: string;
  text: string;
};

const navigationLinks: NavigationLink[] = [
  { pathname: '/', text: 'Home' },
  { pathname: '/about', text: 'About' },
  { pathname: '/projects?category=featured', text: 'Projects' },
  { pathname: '/contact', text: 'Contact' },
];

export default navigationLinks;
