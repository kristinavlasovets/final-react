export const API_URL = process.env.REACT_APP_SERVER_URL + '/api';

export const IMAGE_DROP_URL = process.env.REACT_APP_IMAGE_HOST_URL;
export const sharedAuthUrls = {
	REGISTER_URL: '/registration',
	LOGIN_URL: '/login',
	LOGIN_SOCIAL_URL: '/get-user',
	LOGOUT_URL: '/logout',
	REFRESH_TOKEN: '/refresh',
};

export const sharedUserUrls = {
	USERS_URL: '/users',
};

export const sharedReviewsUrls = {
	REVIEWS_URL: '/reviews',
	ALL_TAGS_URL: '/tags',
	MOST_RATED_REVIEWS_URL: '/most-rated-reviews',
	MOST_RECENT_REVIEWS_URL: '/most-recent-reviews',
	BY_TAG_REVIEWS_URL: '/by-tag-reviews',
	BY_USER_REVIEWS_URL: '/by-user-reviews',
	BY_ART_PIECE_REVIEWS_URL: '/by-artpiece-reviews',
	BY_SEARCH_REVIEWS_URL: '/by-search-reviews',
	COMMENTS_URL: '/comments',
};

export const sharedLikesUrls = {
	LIKES_URL: '/users/likes',
};

export const sharedArtPiecesUrls = {
	ARTPIECES_URL: '/art-pieces',
	NEW_ARTPIECE_URL: '/art-pieces/new',
	ARTPIECES_RATING_URL: '/art-pieces/rating',
};
