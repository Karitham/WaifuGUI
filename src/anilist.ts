/* eslint-disable require-jsdoc */
const CharacterQuery = `query ($term: String, $page: Int) {
  Media(search: $term) {
    title {
      romaji
    }
    characters(sort: FAVOURITES_DESC, perPage: 50, page: $page) {
      pageInfo {
        hasNextPage
        lastPage
      }
      nodes {
        id
        name {
          full
        }
        image {
          large
        }
      }
    }
  }
}`;

export async function searchMedia(
    media: string,
    page: number = 1,
): Promise<QueryResponse> {
  const resp = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: CharacterQuery,
      variables: {
        term: media,
        page: page,
      },
    }),
  });

  if (resp.status == 200) {
    const response = (await resp.json()) as QueryResponse;

    if (response.data.Media.characters.pageInfo.hasNextPage) {
      const resp2 = await searchMedia(media, page + 1);
      response.data.Media.characters.nodes.push(
          ...resp2.data.Media.characters.nodes,
      );
    }
    return response;
  }

  console.error(resp.statusText);
}

export interface QueryResponse {
  data: Data;
}

export interface Data {
  Media: Media;
}

export interface Media {
  title: Title;
  characters: Characters;
}

export interface Characters {
  pageInfo: PageInfo;
  nodes: Node[];
}

export interface Node {
  id: number;
  name: Name;
  image: Image;
}

export interface Image {
  large: string;
}

export interface Name {
  full: string;
}

export interface PageInfo {
  hasNextPage: boolean;
  lastPage: number;
}

export interface Title {
  romaji: string;
}
