export interface BlogResponse {
  statusCode: number
  success: boolean
  message: string
  meta: {
    total: number
    page: number
    limit: number
  }
  data: Blog[]
}

export interface SingelBlogResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Blog;
}

export interface Blog {
  _id: string
  title: string
  content: string
  authorId: string
  featuredImage: string
  tags: string[]
  published: boolean
  createdAt: string
  updatedAt: string
  __v: number
}
