import React, { useEffect, useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { createClient } from 'graphql-ws';
import { Badge, Menu, MenuItem } from '@mui/material';
import { getNotification } from '../utils/notification';

const client = createClient({
  url: 'ws://localhost:4000/graphql',
});

const query = getNotification;

export default function PushNotification() {
  const [invisible, setInvisible] = useState(true);
  const [notification, setNotification] = useState('');

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
    setNotification('');
    setInvisible(true);
  };

  const handleClick = (e) => {
    if (notification) {
      setAnchorEl(e.currentTarget);
    }
  };

  useEffect(() => {
    (async () => {
      const onNext = (data) => {
        setInvisible(false);

        const message = data?.data?.notification?.message;
        setNotification(message);
        console.log('[PUSH NOTIFICATION]', { data });
      };

      await new Promise((resolve, reject) => {
        client.subscribe(
          {
            query,
          },
          {
            next: onNext,
            error: reject,
            complete: resolve,
          }
        );
      });
    })();
  }, []);

  return (
    <>
      <Badge
        color='error'
        variant='dot'
        invisible={invisible}
        overlap='circular'
        sx={{ '&:hover': { cursor: 'pointer' }, ml: '5px' }}
      >
        <NotificationsIcon onClick={handleClick} sx={{ color: '#7D9D9C' }} />
      </Badge>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>{notification}</MenuItem>
      </Menu>
    </>
  );
}