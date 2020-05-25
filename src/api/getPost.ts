import { API } from 'api/config';
import axios, { AxiosResponse } from 'axios';
import { fromUnixTime } from 'date-fns';
import { Comment, Post } from 'store/state';

// recursive
const getComments = async (ids: number[]): Promise<Comment[]> => {
  if (Array.isArray(ids) && ids.length !== 0) {
    const responses: AxiosResponse[] = await axios.all(
      ids.map((id) =>
        axios({
          method: 'get',
          url: `${API}/item/${id}.json`,
        })
      )
    );
    const comments: Comment[] = await Promise.all(
      responses
        .map(({ data }) => data)
        .map(async ({ by, deleted, id, kids, text, time }) => {
          const comments: Comment[] = await getComments(kids);

          return {
            comments,
            content: text,
            createdAt: fromUnixTime(time),
            createdBy: by,
            id,
            isDeleted: deleted,
          };
        })
    );

    return comments;
  }

  return [];
};

const getPost = async (id: number): Promise<Post> => {
  const {
    data: { by, kids, score, time, title, url },
  } = await axios({
    method: 'get',
    url: `${API}/item/${id}.json`,
  });
  const comments: Comment[] = await getComments(kids);

  return {
    comments,
    createdAt: fromUnixTime(time),
    createdBy: by,
    id,
    score,
    title,
    url,
  };
};

export default getPost;
