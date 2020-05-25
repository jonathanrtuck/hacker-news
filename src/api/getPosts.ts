import { API } from 'api/config';
import axios, { AxiosResponse } from 'axios';
import { fromUnixTime } from 'date-fns';
import { Post, Posts } from 'store/state';

const getPosts = async ({ first, offset }): Promise<Posts> => {
  const { data } = await axios({
    method: 'get',
    url: `${API}/topstories.json`,
  });
  const itemsSize: number = data.length;
  const ids: number[] = data.slice(offset, offset + first);
  const responses: AxiosResponse[] = await axios.all(
    ids.map((id) =>
      axios({
        method: 'get',
        url: `${API}/item/${id}.json`,
      })
    )
  );
  const posts: Post[] = responses
    .map(({ data }) => data)
    .map(({ by, id, score, time, title, url }) => ({
      comments: undefined,
      createdAt: fromUnixTime(time),
      createdBy: by,
      id,
      score,
      title,
      url,
    }));

  return {
    items: posts,
    size: itemsSize,
  };
};

export default getPosts;
