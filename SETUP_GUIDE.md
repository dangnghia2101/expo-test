# Movie App Setup Guide

## Prerequisites

- Node.js (v16 or higher)
- Yarn package manager
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
yarn install
```

**Note**: The project uses `patch-package` to apply patches to dependencies. Patches are automatically applied during installation via the `postinstall` script.

### 2. Get TMDB API Token

1. Create an account at [The Movie Database](https://www.themoviedb.org/signup)
2. Verify your email address
3. Log in to your account
4. Go to Settings (click your profile icon → Settings)
5. Click on "API" in the left sidebar
6. Click "Create" or "Request an API Key"
7. Choose "Developer" option
8. Fill in the application details:
   - Application Name: "Movie Database App" (or any name)
   - Application URL: Can use a placeholder like "http://localhost"
   - Application Summary: "A React Native movie database application"
9. Accept the terms and submit
10. Copy your **API Read Access Token** (NOT the API Key)

### 3. Configure Environment Variables

Create a `.env` file in the root directory of the project:

```bash
touch .env
```

Add the following content to `.env`:

```env
EXPO_PUBLIC_API_URL=https://api.themoviedb.org/3
EXPO_PUBLIC_TMDB_TOKEN=your_tmdb_read_access_token_here
```

**IMPORTANT**:

- Replace `your_tmdb_read_access_token_here` with your actual TMDB Read Access Token
- The token should start with `eyJ...`
- `EXPO_PUBLIC_API_URL` should be set to `https://api.themoviedb.org/3` (TMDB API v3 base URL)
- Never commit the `.env` file to git (it's already in `.gitignore`)

### 4. Run the Application

Start the development server:

```bash
yarn start
```

For iOS:

```bash
yarn ios
```

For Android:

```bash
yarn android
```

## Troubleshooting

### Issue: "Network request failed" or API errors

- Verify your TMDB token is correct
- Check that the token is the **Read Access Token** (not the API Key)
- Ensure your `.env` file is in the root directory
- Restart the development server after adding the `.env` file

### Issue: Images not loading

- Check your internet connection
- TMDB image URLs require internet access
- Some images may not have posters/backdrops in the TMDB database

### Issue: "Cannot find module" errors

- Run `yarn install` again
- Clear cache: `yarn start --clear`
- Delete `node_modules` and reinstall: `rm -rf node_modules && yarn install`
- Ensure patches are applied correctly (check `patches/` directory)

### Issue: Environment variables not working

- Ensure variable names start with `EXPO_PUBLIC_` prefix
- Restart the Expo development server after changing `.env` file
- Clear cache: `yarn start --clear`

## Testing the App

1. **Home Screen (MovieHome)**:
   - Select a category (Now Playing, Popular, Upcoming)
   - Try searching for a movie using the search functionality
   - Change the sort order (Alphabetical Order, By Rating, By Release Date)
   - Scroll through the movie list (infinite scroll)
   - Tap on a movie card to navigate to details

2. **Movie Details Screen**:
   - View basic movie information
   - Navigate back to the home screen

3. **Watchlist Screen**:
   - View your saved movies
   - Navigate to movie details from watchlist

4. **Persistence Test**:
   - Add movies to watchlist (if implemented in MovieDetails)
   - Change category preference
   - Change sort order preference
   - Close the app completely
   - Reopen the app
   - Verify watchlist and preferences are saved using MMKV storage

## Project Structure

```
src/
├── components/
│   ├── movie/              # Movie-specific components
│   │   ├── MovieCard.tsx
│   │   └── HeaderHome.tsx
│   ├── common/             # Shared components
│   └── form/               # Form components
├── containers/
│   ├── movie/              # Movie screens
│   │   ├── MovieHome.tsx
│   │   └── MovieDetails.tsx
│   └── watchlist/          # Watchlist screen
│       └── Watchlist.tsx
├── hooks/
│   └── api/                # API hooks
│       └── useMovies.ts    # Movie list hook with infinite scroll
├── services/
│   └── axios.js            # Axios instance with TMDB token
├── store/
│   └── useMovieStore.ts    # Movie state management (Zustand + MMKV)
├── types/
│   └── movie.ts            # TypeScript types
├── configs/
│   └── constants/
│       ├── api.ts          # API endpoints and constants
│       └── options/
│           └── movie.ts    # Movie category and sort options
└── utils/
    └── movie.ts            # Movie utility functions
```

## Features Implemented

✅ Category selection (Now Playing, Popular, Upcoming)
✅ Movie search functionality
✅ Sort by (Alphabetical Order, By Rating, By Release Date)
✅ Movie list with infinite scroll
✅ Movie details screen
✅ Watchlist functionality (Add/Remove movies)
✅ Watchlist screen
✅ Persistent storage for preferences and watchlist using MMKV
✅ TypeScript implementation
✅ React Query for data fetching and caching
✅ Zustand for state management
✅ Error handling and loading states
✅ Clean, reusable code structure

## API Endpoints Used

- `GET /movie/now_playing` - Now Playing movies
- `GET /movie/popular` - Popular movies
- `GET /movie/upcoming` - Upcoming movies
- `GET /movie/{id}` - Movie details
- `GET /movie/{id}/credits` - Movie credits
- `GET /movie/{id}/recommendations` - Recommended movies
- `GET /search/movie` - Search movies

## Technology Stack

- **Framework**: Expo SDK 52, React Native 0.76.9
- **Language**: TypeScript
- **State Management**: Zustand with MMKV persistence
- **Data Fetching**: React Query (react-query v3)
- **Navigation**: React Navigation v7
- **UI Library**: React Native UI Lib
- **Storage**: MMKV (react-native-mmkv)

## Notes

- All preferences (category, sort order) are saved to device storage using MMKV
- Watchlist is persisted and survives app restarts
- API responses are cached using React Query (stale time: 30 seconds)
- Images are loaded from TMDB CDN (`https://image.tmdb.org/t/p`)
- The app follows the existing codebase patterns and conventions
- Uses Expo environment variables (EXPO*PUBLIC*\*) for configuration
