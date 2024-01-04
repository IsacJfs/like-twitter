// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { UserState } from "./profileSlice";

// export interface CommentState {
//   id: string;
//   postagem: string;
//   autor: UserState;
//   conteudo: string | null;
//   data_criacao: string | null;
//   data_atualizacao: string | null;
// }

// export interface CommentsState {
//   comments: CommentState[];
//   isLoading: boolean;
//   error: string | null;
// }

// const initialState: CommentsState = {
//   comments: [],
//   isLoading: false,
//   error: null,
// };

// const commentsUrl = 'http://127.0.0.1:8000/api/postagens/'

// export const fetchComments = createAsyncThunk(
//   'comments/fetchComments',
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get(commentsUrl);
//       return response.data;
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         return thunkAPI.rejectWithValue(
//           error.response?.data?.message || 'Erro ao buscar comentários.'
//         );
//       }
//       return thunkAPI.rejectWithValue('Erro desconhecido ao buscar comentários.');
//     }
//   }
// );

// export const fetchCommentsByUser = createAsyncThunk(
//   'comments/fetchCommentsByUser',
//   async (username: string, thunkAPI) => {
//     try {
//       const url = `${commentsUrl}/${username}/`; // Supondo que a API usa query para filtrar por usuário
//       const response = await axios.get(url);
//       return response.data;
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         return thunkAPI.rejectWithValue(
//           error.response?.data?.message || 'Erro ao buscar comentários por usuário.'
//         );
//       }
//       return thunkAPI.rejectWithValue('Erro desconhecido ao buscar comentários por usuário.');
//     }
//   }
// );

// export const fetchCommentsByPost = createAsyncThunk(
//   'comments/fetchCommentsByPost',
//   async (postId: string, thunkAPI) => {
//     try {
//       const url = `${commentsUrl}/${postId}/`; // Supondo que a API usa query para filtrar por usuário
//       const response = await axios.get(url);
//       return response.data;
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         return thunkAPI.rejectWithValue(
//           error.response?.data?.message || 'Erro ao buscar comentários por post.'
//         );
//       }
//       return thunkAPI.rejectWithValue('Erro desconhecido ao buscar comentários por post.');
//     }
//   }
// );

// export const createComment = createAsyncThunk(
//   'comments/createComment',
//   async (comment: CommentState, thunkAPI) => {
//     try {
//       const response = await axios.post(commentsUrl, comment);
//       return response.data;
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         return thunkAPI.rejectWithValue(
//           error.response?.data?.message || 'Erro ao criar comentário.'
//         );
//       }
//       return thunkAPI.rejectWithValue('Erro desconhecido ao criar comentário.');
//     }
//   }
// );

// export const updateComment = createAsyncThunk(
//   'comments/updateComment',
//   async (comment: CommentState, thunkAPI) => {
//     try {
//       const url = `${commentsUrl}/${comment.id}/`;
//       const response = await axios.put(url, comment);
//       return response.data;
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         return thunkAPI.rejectWithValue(
//           error.response?.data?.message || 'Erro ao atualizar comentário.'
//         );
//       }
//       return thunkAPI.rejectWithValue('Erro desconhecido ao atualizar comentário.');
//     }
//   }
// );

// export const deleteComment = createAsyncThunk(
//   'comments/deleteComment',
//   async (commentId: string, thunkAPI) => {
//     try {
//       const url = `${commentsUrl}/${commentId}/`;
//       const response = await axios.delete(url);
//       return response.data;
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         return thunkAPI.rejectWithValue(
//           error.response?.data?.message || 'Erro ao deletar comentário.'
//         );
//       }
//       return thunkAPI.rejectWithValue('Erro desconhecido ao deletar comentário.');
//     }
//   }
// );

// export const commentsSlice = createSlice({
//   name: 'comments',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchComments.pending, (state, action) => {
//       state.isLoading = true;
//     });
//     builder.addCase(fetchComments.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.comments = action.payload;
//     });
//     builder.addCase(fetchComments.rejected, (state, action) => {
//       state.isLoading = false;
//       state.error = action.payload as string;
//     });
//     builder.addCase(fetchCommentsByUser.pending, (state, action) => {
//       state.isLoading = true;
//     });
//     builder.addCase(fetchCommentsByUser.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.comments = action.payload;
//     });
//     builder.addCase(fetchCommentsByUser.rejected, (state, action) => {
//       state.isLoading = false;
//       state.error = action.payload as string;
//     });
//     builder.addCase(fetchCommentsByPost.pending, (state, action) => {
//       state.isLoading = true;
//     });
//     builder.addCase(fetchCommentsByPost.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.comments = action.payload;
//     });
//     builder.addCase(fetchCommentsByPost.rejected, (state, action) => {
//       state.isLoading = false;
//       state.error = action.payload as string;
//     });
//     builder.addCase(createComment.pending, (state, action) => {
//       state.isLoading = true;
//     });
//     builder.addCase(createComment.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.comments.push(action.payload);
//     });
//     builder.addCase(createComment.rejected, (state, action) => {
//       state.isLoading = false;
//       state.error = action.payload as string;
//     });
//     builder.addCase(updateComment.pending, (state, action) => {
//       state.isLoading = true;
//     });
//     builder.addCase(updateComment.fulfilled, (state, action) => {
//       state.isLoading = false;
//       const comment = action.payload;
//       const index = state.comments.findIndex((c) => c.id === comment.id);
//       if (index !== -1) {
//         state.comments[index] = comment;
//       }
//     });
//     builder.addCase(updateComment.rejected, (state, action) => {
//       state.isLoading = false;
//       state.error = action.payload as string;
//     }
//     );
//     builder.addCase(deleteComment.pending, (state, action) => {
//       state.isLoading = true;
//     });
//     builder.addCase(deleteComment.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.comments = state.comments.filter((c) => c.id !== action.payload);
//     });
//     builder.addCase(deleteComment.rejected, (state, action) => {
//       state.isLoading = false;
//       state.error = action.payload as string;
//     });
//   }
// });
