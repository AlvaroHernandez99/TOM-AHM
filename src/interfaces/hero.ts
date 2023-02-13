/*export interface Character {
  code:            number;
  status:          string;
  copyright:       string;
  attributionText: string;
  attributionHTML: string;
  etag:            string;
  data:            Data;
}*/

/*export interface Data {
  offset:  number;
  limit:   number;
  total:   number;
  count:   number;
  results: Result[];
}*/

/*export interface Result {
  id:          number;
  name:        string;
  description: string;
  modified:    string;
  thumbnail:   Thumbnail;
  resourceURI: string;
  comics:      Comics;
  urls:        URL[];
}*/
/*export interface Comics {
  available:     number;
  collectionURI: string;
  returned:      number;
}*/
/*export interface Thumbnail {
  path:      string;
  extension: Extension;
}*/

export enum Extension {
  GIF = "gif",
  Jpg = "jpg",
}
