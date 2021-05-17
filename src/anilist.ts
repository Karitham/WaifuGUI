const CharacterQuery = `query ($term: String) {
  Media(search: $term) {
    title {
      romaji
    }
    characters(sort: FAVOURITES_DESC, perPage: 50) {
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
  name: Name;
  image: Image;
}

export interface Image {
  large: string;
}

export interface Name {
  full: string;
}

export interface Title {
  romaji: string;
}
