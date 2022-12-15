import { apiSlice } from "../api/apiSlice";
import { storedTasks } from "./todoSlice";

export const todosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //handle endpoint here
    getTodos: builder.query({
      query: () => "todo_list",
      providesTags: ["Todos"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        // `onStart` side-effect
        dispatch(storedTasks([]));
        try {
          const result = await queryFulfilled;
          //console.log("stored tasks", result);

          //update local storage if req is successful
          localStorage.setItem(
            "task-list",
            JSON.stringify({
              tasks: result.data,
            })
          );
          //dispatch the storedTasks action
          dispatch(storedTasks(result?.data));
        } catch (err) {
          // `onError` side-effect
          dispatch(storedTasks("Error fetching post!"));
        }
      },
    }),
    // post request to add data
    addTodos: builder.mutation({
      query: (data) => ({
        url: "todo_list",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const { useGetTodosQuery, useAddTodosMutation } = todosApi;
