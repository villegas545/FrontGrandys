import React from 'react';
import classes from './PageLoading.module.scss';

const PageLoading = () => {
    return (
        <div className={classes.loading}>
            <img src="./img/logoGrandys.png" width="500px" alt="not found" />
            <br />
            <span>L</span>
            <span>O</span>
            <span>A</span>
            <span>D</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>
        </div>
    );
};

export default PageLoading;
