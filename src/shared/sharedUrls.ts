// export const API_URL = 'https://final-nodejs-production.up.railway.app/api';
export const API_URL = 'http://localhost:5000/api';

export const IMAGE_DROP_URL =
	'https://api.cloudinary.com/v1_1/kvlasovets/image/upload';

export const sharedAuthUrls = {
	REGISTER_URL: '/registration',
	LOGIN_URL: '/login',
	LOGOUT_URL: '/logout',
};

export const sharedReviewsUrls = {
	REVIEWS_URL: '/reviews',
	ALL_TAGS_URL: '/tags',
	MOST_RATED_REVIEWS_URL: '/most-rated-reviews',
	MOST_RECENT_REVIEWS_URL: '/most-recent-reviews',
	BY_TAG_REVIEWS_URL: '/by-tag-reviews',
};

export const sharedLikesUrls = {
	LIKES_URL: '/users/likes',
};

export const sharedArtPiecesUrls = {
	ARTPIECES_URL: '/art-pieces',
	NEW_ARTPIECE_URL: '/art-pieces/new',
	ARTPIECES_RATING_URL: '/art-pieces/rating',
};
