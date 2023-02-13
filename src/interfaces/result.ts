import { Thumbnail} from "./thumbnail";
import {Comics} from "./comics";

export interface Result {
  id:          number;
  name:        string;
  description: string;
  modified:    string;
  thumbnail:   Thumbnail;
  resourceURI: string;
  comics:      Comics;
  urls:        URL[];
}
