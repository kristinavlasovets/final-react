export const API_URL = process.env.REACT_APP_SERVER_URL + '/api';

export const IMAGE_DROP_URL = process.env.REACT_APP_IMAGE_HOST_URL;
export const sharedAuthUrls = {
	REGISTER_URL: '/registration',
	LOGIN_URL: '/login',
	GOOGE_LOGIN_URL: '/login/google',
	LOGOUT_URL: '/logout',
};

export const sharedReviewsUrls = {
	REVIEWS_URL: '/reviews',
	ALL_TAGS_URL: '/tags',
	MOST_RATED_REVIEWS_URL: '/most-rated-reviews',
	MOST_RECENT_REVIEWS_URL: '/most-recent-reviews',
	BY_TAG_REVIEWS_URL: '/by-tag-reviews',
	BY_USER_REVIEWS_URL: '/by-user-reviews',
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
