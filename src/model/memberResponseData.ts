import { Member } from './member';

export interface MemberResponseData {
  members: Member[];
  page: number;
}

export const createDefaultMemberResponseData = () => ({
  members: [],
  page: 1
});
