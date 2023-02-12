import {ParticipantPopulated} from "./types";

export function userIsConversationParticipant(
    participants: Array<ParticipantPopulated>,
    userId: string
): boolean {
    return participants.some((participant) => participant.userId === userId);
}
