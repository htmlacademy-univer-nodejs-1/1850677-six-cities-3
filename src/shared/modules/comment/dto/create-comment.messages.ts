export const CreateCommentMessages = {
  text: {
    invalidFormat: 'text is required',
    lengthField: 'min length is 5, max length is 2024'
  },
  offerId: {
    invalidFormat: 'offerId field must be a valid id'
  },
  userId: {
    invalidFormat: 'userId field must be a valid id'
  },
  createdDate: {
    invalidFormat: 'date must be a valid ISO date'
  },
  rating: {
    invalidFormat: 'rating must be a number'
  },
} as const;
