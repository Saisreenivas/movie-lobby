import { authController } from "./controller";
import { mongoDbConnect } from "./helpers";
import { moviesModel } from "./models";

const main = async () => {
  await mongoDbConnect();
  await authController.registerUser({ username: 'admin', password: 'admin', roles: ['admin'] })
    .catch((result) => {
      console.log('user-login', result);
    });

  await moviesModel.insertMany([
    {
      title: 'The Shawshank Redemption',
      genre: 'drama',
      rating: 9.3,
      streamingLink: 'https://www.imdb.com/title/tt0111161/'
    },
    {
      title: 'The Godfather',
      genre: 'crime',
      rating: 9.2,
      streamingLink: 'https://www.imdb.com/title/tt0068646/'
    },
    {
      title: 'The Dark Knight',
      genre: 'action',
      rating: 9.0,
      streamingLink: 'https://www.imdb.com/title/tt0468569/'
    }
  ]);

  console.log('inserted movies');

  process.exit(0);
}

if (require.main === module) {
  main()
}