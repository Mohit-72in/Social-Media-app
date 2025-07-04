import { useReducer, createContext } from "react";

export const PostList = createContext({
  PostList: [],
  addPost: () => {},
  addInitialPosts: () => {},
  deletePost: () => {},
});

const postListReducer = (currentPostList, action) => {
  let newPostList = currentPostList;
  if (action.typeof === "DELETE_POST") {
    newPostList = currentPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  }else if(action.type === "ADD_INITIAL_POSTS"){
      newPostList = action.payload.posts;
  }else if(action.type === "ADD_POST"){
    newPostList = [action.payload, ...currentPostList];
  }

  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    []
  );

  const addPost = (userId, postTitle, postBody, reactions, tags) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reactions: reactions,
        userId: userId,
        tags:tags,
      },
    });
  };

  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload: {
        posts,
      },
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      typeof: "DELETE_POST",
      payload: { postId },
    });
  };

  return (
    <PostList.Provider
      value={{ postList: postList, addPost: addPost,addInitialPosts, deletePost: deletePost }}
    >
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
