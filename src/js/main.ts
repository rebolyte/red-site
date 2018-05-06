import { format } from 'date-fns';

import '../styles/main.scss';

console.log('this is the JS', format(new Date(2014, 1, 11), 'MM/DD/YYYY'));
