const CharacterQuery = `query ($term: String) {
  Media(search: $term) {
    title {
      romaji
    }
    characters(sort: FAVOURITES_DESC) {
      nodes {
        id
      }
    }
  }
}`;

export async function SearchMedia(media: string): Promise<QueryResponse> {
  let resp = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: CharacterQuery,
      variables: {
        term: media,
      },
    }),
  });
  switch (resp.status) {
    case 200:
      return (await resp.json()) as QueryResponse;
    default:
      console.error(resp.statusText);
  }
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
  nodes: Node[];
}

export interface Node {
  id: number;
}

export interface Title {
  romaji: string;
}
