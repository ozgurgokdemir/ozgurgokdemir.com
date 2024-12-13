type NavigationLink = {
  pathname: string;
  text: string;
};

const navigationLinks: NavigationLink[] = [
  { pathname: '/', text: 'Home' },
  { pathname: '/about', text: 'About' },
  { pathname: '/projects', text: 'Projects' },
  { pathname: '/contact', text: 'Contact' },
];

export default navigationLinks;
