export interface Episodes{
    Ep: string,
  Download: string,
  Video: string,
  _id:string
}
export interface Categories{
    Name:string
}
export interface Anime{
    _id: string;
    Title: string,
    Poster: string,
    Review: string,
    Year: number
    Rating: number,
    Link: string,
    Categories: [Categories],
    Views: number,
    Likes: number,
    Episodes: [Episodes],
}

export interface State{
    data:Anime|null
}
export interface AnimeState{
    data:[Anime]|[],
    Title:string
}
export interface Home{
    data:[Anime]|[],
    PopularAnime: [Anime]|[],
    RandomAnimes: [Anime]|[],

}

export interface RouteByid{
    params:{
        id:string
    }
    
}

