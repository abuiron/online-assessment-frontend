import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../apicalls/users';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../redux/usersSlice';
import { useNavigate } from 'react-router-dom';
import { HideLoading, ShowLoading } from '../redux/loaderSlice';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ReportIcon from '@mui/icons-material/BarChart';
import ProfileIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ExamIcon from '@mui/icons-material/Description';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: 'var(--primary)', // Set the same color as the sidebar
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const user = useSelector((state) => state.users.user);
  const [menu, setMenu] = useState([]);
  const [open, setOpen] = useState(false);

  const userMenu = [
    {
      title: 'Home',
      paths: ['/', '/user/write-exam/:id'],
      icon: <HomeIcon />,
      onClick: () => navigate('/'),
    },
    {
      title: 'Reports',
      paths: ['/user/reports'],
      icon: <ReportIcon />,
      onClick: () => navigate('/user/reports'),
    },
    {
      title: 'Profile',
      paths: ['/profile'],
      icon: <ProfileIcon />,
      onClick: () => navigate('/profile'),
    },
    {
      title: 'Logout',
      paths: ['/logout'],
      icon: <LogoutIcon />,
      onClick: () => {
        localStorage.removeItem('token');
        navigate('/login');
      },
    },
  ];

  const adminMenu = [
    {
      title: 'Home',
      paths: ['/', '/user/write-exam/:id'],
      icon: <HomeIcon />,
      onClick: () => navigate('/'),
    },
    {
      title: 'Exams',
      paths: ['/admin/exams', '/admin/exams/add', '/admin/exams/edit/:id'],
      icon: <ExamIcon />,
      onClick: () => navigate('/admin/exams'),
    },
    {
      title: 'Reports',
      paths: ['/admin/reports'],
      icon: <ReportIcon />,
      onClick: () => navigate('/admin/reports'),
    },
    {
      title: 'Profile',
      paths: ['/profile'],
      icon: <ProfileIcon />,
      onClick: () => navigate('/profile'),
    },
    {
      title: 'Logout',
      paths: ['/logout'],
      icon: <LogoutIcon />,
      onClick: () => {
        localStorage.removeItem('token');
        navigate('/login');
      },
    },
  ];

  const getUserData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getUserInfo();
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        dispatch(SetUser(response.data));
        setMenu(response.data.isAdmin ? adminMenu : userMenu);
      } else {
        dispatch(HideLoading());
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      navigate('/login');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      if (!user) {
        getUserData();
      }
    } else {
      navigate('/login');
    }
  }, []);

  const activeRoute = window.location.pathname;
  const getIsActiveOrNot = (paths) => {
    if (paths.includes(activeRoute)) {
      return true;
    } else if (activeRoute.includes('/admin/exams/edit') && paths.includes('/admin/exams')) {
      return true;
    } else if (activeRoute.includes('/user/write-exam/:id') && paths.includes('/user/write-exam/:id')) {
      return true;
    }
    return false;
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    user && (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar className="flex justify-between items-center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Online Assessment Portal
            </Typography>
            {/* User Details and Role */}
            <div className="flex justify-center items-center gap-2">
              <AccountCircleIcon />
              <Typography variant="subtitle1">{user?.name}</Typography>
              <Typography variant="body2">
                Role: {user?.isAdmin ? 'Admin' : 'User'}
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: 'var(--primary)', // Sidebar color
              color: 'white',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {menu.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  onClick={item.onClick}
                  className={`menu-item ${getIsActiveOrNot(item.paths) ? 'active-menu-item' : ''}`}
                >
                  <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} sx={{ color: 'white' }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <div className="content">{children}</div>
        </Main>
      </Box>
    )
  );
}

export default ProtectedRoute;
