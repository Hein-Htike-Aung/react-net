/* 
    project overview (create web project)
*/

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyDsEwnJ10IYDRmDAof7A6mA0r0cpfjk2oc',
	authDomain: 'react-netflix-bd2f5.firebaseapp.com',
	projectId: 'react-netflix-bd2f5',
	storageBucket: 'react-netflix-bd2f5.appspot.com',
	messagingSenderId: '740123255090',
	appId: '1:740123255090:web:4f49cc69e5828ce06bf72b',
};

const app = initializeApp(firebaseConfig);

export default app;
