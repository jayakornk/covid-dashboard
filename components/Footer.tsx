import { Link, Typography } from '@material-ui/core';

const Footer = (): JSX.Element => {
  return (
    <Typography variant="caption" color="GrayText">
      &copy; {new Date().getFullYear()}{' '}
      <Link href="https://jayakornk.dev" color="inherit">
        JayakornK
      </Link>
      . All rights reserved.
    </Typography>
  );
};

export default Footer;
