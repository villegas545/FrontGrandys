import {configureStore} from '@reduxjs/toolkit';

import {authSlice} from '@app/store/reducers/auth';
import {uiSlice} from '@app/store/reducers/ui';
import usersReducer from '@app/store/reducers/usersDucks';

const store = configureStore({
    reducer: {
        users: usersReducer,
        auth: authSlice.reducer,
        ui: uiSlice.reducer
    }
});
export default store;
