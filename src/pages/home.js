import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Post from "../components/Post";
import User from "../components/User";
import { FEED_QUERY } from "../query";
import { NEW_POST, NEW_VOTE } from "../subscription";
import { useQuery } from "@apollo/react-hooks";

function Home(props) {
  useEffect(() => {
    subscribeToNewPost();
    subscribeToNewVote();
  });

  const { subscribeToMore, loading, data } = useQuery(FEED_QUERY);
  const updateCacheAfterVote = (cache, createVote, postId) => {
    const data = cache.readQuery({ query: FEED_QUERY });
    const votedPost = data.feed.posts.find(post => post.id === postId);
    votedPost.votes = createVote.post.votes;
    cache.writeQuery({ query: FEED_QUERY, data });
  };
  const subscribeToNewPost = () => {
    subscribeToMore({
      document: NEW_POST,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newPost = subscriptionData.data.newPost;
        const exists = prev.feed.posts.find(({ id }) => id === newPost.id);
        if (exists) return prev;

        return Object.assign({}, prev, {
          feed: {
            posts: [newPost, ...prev.feed.posts],
            __typename: prev.feed.__typename
          }
        });
      }
    });
  };
  const subscribeToNewVote = () => {
      subscribeToMore({
          document: NEW_VOTE
      })
  }

  return loading ? (
    "Loading..."
  ) : (
    <Grid container spacing={3}>
      <Grid item sm={8} xs={12}>
        {data.feed.posts.map(post => (
          <Post
            key={post.id}
            post={post}
            updateCacheAfterVote={updateCacheAfterVote}
          ></Post>
        ))}
      </Grid>
      <Grid item sm={4} xs={12}>
        <User />
      </Grid>
    </Grid>
  );
}

export default Home;
