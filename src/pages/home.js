import React from 'react';
import Grid from '@material-ui/core/Grid';
import Scream from '../components/Scream';
import User from '../components/User';
import { FEED_QUERY } from '../query';
import { useQuery } from '@apollo/react-hooks';

function Home(props) {
    
    const { data, loading, error } = useQuery(FEED_QUERY)
    
    return loading ? (
        'Loading...'
    ) : (<Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
            {data.feed.posts.map(post => <Scream post={post}></Scream>)}
        </Grid>
        <Grid item sm={4} xs={12}>
            <User />
        </Grid>
    </Grid>)
}

export default Home
