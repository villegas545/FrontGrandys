import {configureStore} from '@reduxjs/toolkit';

import {authSlice} from '@app/store/reducers/auth';
import {uiSlice} from '@app/store/reducers/ui';
import usersReducer from '@app/store/reducers/usersDucks';
import restReducer from '@app/store/reducers/restsDucks';
import checksReducer from '@app/store/reducers/checksDucks';
import cashInReducer from '@app/store/reducers/cashInDucks';

const store = configureStore({
    reducer: {
        checks: checksReducer,
        rest: restReducer,
        users: usersReducer,
        cashIn: cashInReducer,
        auth: authSlice.reducer,
        ui: uiSlice.reducer
    }
});
export default store;
