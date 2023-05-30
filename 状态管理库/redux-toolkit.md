# Redux: Toolkit && RTK Query

## Toolkit

#### Redux官方强烈推荐，开箱即用的一个高效的 Redux 开发**工具集**，核心依旧是redux。

## 为什么使用它呢？

#### Redux很灵活，但是有时候我们不想如此灵活，想简单点就直接使用，就建议了解并且尝试使用Toolkit。

### 如何使用呢？

```react
//Toolkit提供了一个Api，createSlice(),目的是建立一个store的切片，子仓库
import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' }
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded(state, action) {
      state.push(action.payload)
    }
  }
})

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer
```

```react
//总仓库入口文件
/*
每次我们创建一个新 slice 时，我们都需要将它的 reducer 函数添加到我们的 Redux store 中。我们已经创建了一个 Redux store，但现在它里面没有任何数据。打开 store.js，导入 postsReducer 函数，并更新对configureStore 的调用，以便将 postsReducer 作为名为 posts 的 reducer 字段传递：
*/
import { configureStore } from '@reduxjs/toolkit'

import postsReducer from '../features/posts/postsSlice'

export default configureStore({
  reducer: {
    posts: postsReducer，
    login:loginReducer
  }
})
```

### 在组件中使用

```react
/*
React 组件可以使用 React-Redux 库中的 useSelector 钩子从 Redux store 中读取数据。您编写的“selector 函数”将使用整个 Redux state 对象作为参数被调用，并且应该从 store 中返回该组件需要的特定数据。

我们最初的 PostsList 组件将从 Redux store 中读取 state.posts 值，然后遍历文章数组并在屏幕上显示每个文章：
*/
import React from 'react'
import { useSelector } from 'react-redux'

export const PostsList = () => {
  const posts = useSelector(state => state.posts)
  const login = useSelector(state => state.login)
  const renderedPosts = posts.map(post => (	
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
    </article>
  ))

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}
```

```react
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'

import { postAdded } from './postsSlice'

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const dispatch = useDispatch()

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(
        postAdded({
          id: nanoid(),
          title,
          content
        })
      )

      setTitle('')
      setContent('')
    }
  }

  return (
    <section>
      <h2>添加新文章</h2>
      <form>
        {/* omit form inputs */}
        <button type="button" onClick={onSavePostClicked}>
          保存文章
        </button>
      </form>
    </section>
  )
}
```



### 这显示了完整的 Redux 数据流周期：

- #### 使用 `useSelector` 从 store 读取初始文章列表并渲染 UI

- #### 我们 dispatch 了包含新文章条目数据的 `postAdded` action

- #### `postsReducer` 监听到了 `postAdded` 动作，并用新条目更新了 posts 数组

- #### Redux store 告诉 UI 一些数据已经改变

- #### 文章列表读取更新后的文章数组，并重新渲染 UI 以显示新文章

### 在此之后我们将添加的所有新功能都将遵循相同的这个模式：添加状态 slice、编写 reducer 函数、dispatch action 以及基于 Redux store 中的数据渲染 UI。



## RTK Query

### 是什么？有什么用？

#### 	**RTK Query** 是一个强大的数据获取和缓存工具。它旨在简化在 Web 应用程序中加载数据的常见情况，**无需自己手动编写数据获取和缓存逻辑**。

#### 	Web 应用程序通常需要从服务器获取数据才能显示它。他们通常还需要对该数据进行更新，将这些更新发送到服务器，并使客户端上的缓存数据与服务器上的数据保持同步。	由于需要实现当今应用程序中使用的其他行为，这变得更加复杂：

- ##### 跟踪加载状态以显示 UI 微调器

- ##### 避免对相同数据的重复请求

- ##### Optimistic updates to make the UI feel faster

- ##### 在用户与 UI 交互时管理缓存生命周期

##### 	 ps：RTK Query 是**一个包含在 Redux Toolkit 包中的可选插件**，其功能构建在 Redux Toolkit 中的其他 API 之上。



### 为什么用？

#### 	redux store中不允许异步请求数据，得配置一些，虽然toolkit有一个createAsyncThunk()的api能简化一些，但感觉还是麻烦。

#### 	即使将 `createAsyncThunk` 与 `createSlice` 一起使用，在发出请求和管理加载状态方面还是要进行大量手动工作。必须得创建异步 thunk，发出实际请求，从响应中提取相关字段，添加加载状态字段，在 `extraReducers` 中添加处理程序以处理 `pending/fulfilled/rejected` 情况，并实际编写正确的状态更新。



### [`createApi()`](https://redux-toolkit.js.org/rtk-query/api/createApi) & [`fetchBaseQuery()`](https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery)

####  RTK Query主要是这俩组成的：

- ##### createApi()是RTK Query的功能的核心。它允许我们定义一组请求接口来描述如何从一系列请求接口检索数据，包括如何获取和转换响应数据的配置。（在大多数情况下，一个应用对应一个，也就是一个基本url对应一个）

- ##### fetchBaseQuery()是[`fetch`](https://developer.mozilla.org/en) 的一个小包装 -US/docs/Web/API/Fetch_API），旨在简化请求。旨在为大多数用户在 `createApi` 中使用推荐的 `baseQuery`。

​		

###  使用

####  定义ApiSlice，**管理缓存数据的逻辑被集中到每个应用程序的单个“API Slice”中**

```react
// 从特定于 React 的入口点导入 RTK Query 方法
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// 定义我们的单个 API Slice 对象
export const apiSlice = createApi({
  // 缓存减速器预计将添加到 `state.api` （已经默认 - 这是可选的）
  reducerPath: 'api',
  // 我们所有的请求都有以 “/fakeApi” 开头的 URL
  baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
  // “endpoints” 代表对该服务器的操作和请求
  endpoints: builder => ({
    // `getPosts` endpoint 是一个返回数据的 “Query” 操作
    getPosts: builder.query({
      // 请求的 URL 是“/fakeApi/posts”
      query: (id) => '/posts'+`${id}`
    }),
    addNewPost: builder.mutation({
      query: initialPost => ({
        url: '/posts',
        method: 'POST',
        // Include the entire post object as the body of the request
        body: initialPost
      })
    })
  })
})

// 为 `getPosts` Query endpoint 导出自动生成的 hooksre
export const {
  useGetPostsQuery,
  useAddNewPostMutation
} = apiSlice
```

####  配置store

```react
import postsReducer from '../features/posts/postsSlice'
import usersReducer from '../features/users/usersSlice'
import notificationsReducer from '../features/notifications/notificationsSlice'
import { apiSlice } from '../features/api/apiSlice'

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
})
```

#### 在组件中使用 Query Hooks

现在我们已经定义了 API slice 并将其添加到 store 中，我们可以将生成的 `useGetPostsQuery` hooks 导入我们的 `<PostsList>` 组件并在那里使用它。

目前，`<PostsList>` 专门导入 `useSelector`、`useDispatch` 和 `useEffect`，从存储中读取帖子数据和加载状态，并在 mount 时调度 `fetchPosts()` thunk 以触发数据获取。 			

**`useGetPostsQueryHook` 取代了这些**。

```react
import React from 'react'
import { Link } from 'react-router-dom'

import { Spinner } from '../../components/Spinner'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'

import { useGetPostsQuery } from '../api/apiSlice'

let PostExcerpt = ({ post }) => {
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}

export const PostsList = () => {
  const {
    data: posts,//来自服务器的实际响应内容。 在收到响应之前，该字段将是 “undefined”
    isLoading,//一个 boolean，指示此 hooks 当前是否正在向服务器发出 第一次 请求。（请注意，如果参数更改以请求不同的数据，isLoading 将保持为 false。）
    isFetching,// 一个 boolean，指示 hooks 当前是否正在向服务器发出 any 请求
    isSuccess,//一个 boolean，指示 hooks 是否已成功请求并有可用的缓存数据（即，现在应该定义 data）
    isError,//一个 boolean，指示最后一个请求是否有错误
    error//一个 serialized（序列化，类似于转换成字符串或者JSON的格式） 错误对象
  } = useGetPostsQuery(null,{})
  /*
  对于useGetPostsQuery(),可以传入配置项
  例如useGetPostsQuery(null,{
  pollingInterval?: number
  refetchOnReconnect?: boolean
  refetchOnFocus?: boolean
  skip?: boolean
  refetchOnMountOrArgChange?: boolean | number
  selectFromResult?: (result: UseQueryStateDefaultResult) => any
  
  })
  第一个是传入的请求参数
  第二个是配置项对象
  */

  let content

  if (isLoading) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    content = posts.map(post => <PostExcerpt key={post.id} post={post} />)
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
```

#### 在组件中使用 Mutation hooks

```react
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { Spinner } from '../../components/Spinner'
import { useAddNewPostMutation } from '../api/apiSlice'
import { selectAllUsers } from '../users/usersSlice'

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  const [addNewPost, { isLoading, data, requestId }] = useAddNewPostMutation({fixCacheKey:'posts'})
  const users = useSelector(selectAllUsers)

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)
  const onAuthorChanged = e => setUserId(e.target.value)

  const canSave = [title, content, userId].every(Boolean) && !isLoading

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        //返回一个带有 .unwrap() 方法的特殊 Promise ，我们可以 await addNewPost().unwrap() 使用标准的 try/catch 块来处理任何潜在的错误。
        cosnt res = await addNewPost({ title, content, user: userId }).unwrap()
        setTitle('')
        setContent('')
        setUserId('')
      } catch (err) {
        console.error('Failed to save the post: ', err)
      }
    }
  }

  // omit rendering logic
}
```

#### Mutation hooks 返回一个包含两个值的数组：

- ##### 第一个值是触发函数。当被调用时，它会使用你提供的任何参数向服务器发出请求。这实际上就像一个已经被包装以立即调度自身的 thunk。

- ##### 第二个值是一个对象，其中包含有关当前正在进行的请求（如果有）的元数据。这包括一个 `isLoading` 标志以指示请求是否正在进行中。



## 未完待续...
