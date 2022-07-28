// TODO: Create a service worker that caches static assets:

import {precacheAndRoute} from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);
