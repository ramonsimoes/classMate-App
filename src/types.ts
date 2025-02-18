interface Teacher {
  id: string
  name: string
  email: string
}

export interface Post {
  id: string
  title: string
  author: string
  content: string
  createdAt: string
}

export type RootStackParamList = {
  Login: undefined
  App: undefined
  PostDetails: { postId: string }
  CreatePost: undefined
  EditPost: { post: Post }
  SignUp: undefined
  TeachersList: undefined
  EditTeacher: { teacher: Teacher }
}
