import { GET_MATCHES, UPDATE_MATCH_WITH_SENT_MESSAGE, UPDATE_MATCH_WITH_RECEIVED_MESSAGE } from '../constants/actionTypes';

const matchesReducer = (matches = [], action) => {
    switch (action.type) {
        case GET_MATCHES:
            return action.payload;
        case UPDATE_MATCH_WITH_SENT_MESSAGE:
            action.payload.message.time = action.payload.message.time.toISOString();
            const matchIndex = matches.findIndex((match) => action.payload.theirUserId === match.theirUser.userId);
            const updatedMatches = matches.slice();
            updatedMatches[matchIndex].conversation.push(action.payload.message);
            return updatedMatches;
        case UPDATE_MATCH_WITH_RECEIVED_MESSAGE:
            const matchIndex2 = matches.findIndex((match) => action.payload.from.userId === match.theirUser.userId);
            const updatedMatches2 = matches.slice();
            updatedMatches2[matchIndex2].conversation.push(action.payload);
            return updatedMatches2;
        default:
            return matches;
    }
}

export default matchesReducer;
