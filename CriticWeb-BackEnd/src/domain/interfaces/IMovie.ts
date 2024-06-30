import { IReview } from "./IReview";

interface IMovie {
  movieId?: number;
  title: string;
  category: string;
  image: string;
  description: string;
  rating?: number;
  year: number;
  reviews?: IReview[];
  name?: string;
}

export { IMovie };
