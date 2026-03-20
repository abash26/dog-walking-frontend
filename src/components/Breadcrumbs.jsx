import { Breadcrumbs, Link, Typography, Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const routeNameMap = {
  owner: 'Dashboard',
  walker: 'Dashboard',
  dogs: 'My Dogs',
  walks: 'Walk Requests',
  'available-walks': 'Find Walks',
  'my-walks': 'My Walks',
};

export default function AppBreadcrumbs() {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Box sx={{ mb: 2 }}>
      <Breadcrumbs aria-label='breadcrumb'>
        <Link component={RouterLink} to='/' underline='hover' color='inherit'>
          Home
        </Link>

        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = '/' + pathnames.slice(0, index + 1).join('/');

          const label = routeNameMap[value] || value;

          return last ? (
            <Typography key={to} color='text.primary'>
              {label}
            </Typography>
          ) : (
            <Link
              key={to}
              component={RouterLink}
              to={to}
              underline='hover'
              color='inherit'
            >
              {label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
}
