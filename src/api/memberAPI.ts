import { Member, createDefaultMember } from "../model/member";
import { MemberResponseData, createDefaultMemberResponseData } from "../model/memberResponseData";

const checkStatus = (response: Response): Promise<Response> => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    let error = new Error(response.statusText);
    throw error;
  }
};

const parseJSON = (response: Response) => {
  return response.json();
};

const parseMemberListToJSON = (response: Response): Promise<MemberResponseData> => {
  return response.json().then(data => {
    let memberListResponseData: MemberResponseData = createDefaultMemberResponseData();
    memberListResponseData.page = getMembersPage(response);

    return resolveMemberList(data).then((memberList: Member[]) => {
      memberListResponseData.members = memberList;
      return Promise.resolve(memberListResponseData);
    });

  });
};

const getMembersPage = (response: Response): number => {
  let page = 1;

  if (response.headers) {
    const link = response.headers.get('Link');

    if (link) {
      const url = new URL(
        link
          .split(';')[1]
          .split(',')[1]
          .replace('<', '')
          .replace('>', '')
      );
      page = Number(url.searchParams.get('page'));
    }
  }
  return page;
};

const resolveMemberList = (data: any): Promise<Member[]> => {
  const members = data.map(gitHubMember => {
    var member: Member = createDefaultMember();

    member.id = gitHubMember.id;
    member.login = gitHubMember.login;
    member.avatar_url = gitHubMember.avatar_url;

    return member;
  });

  return Promise.resolve(members);
};

const resolveMember = (data: any): Promise<Member> => {
  const member = createDefaultMember();

  member.id = data.id;
  member.login = data.login;
  member.avatar_url = data.avatar_url;
  member.html_url = data.html_url;
  member.url = data.url;
  member.name = data.name;
  member.company = data.company;
  member.blog = data.blog;
  member.location = data.location;
  member.email = data.email;
  member.bio = data.bio;
  member.public_repos = data.public_repos;
  member.public_gists = data.public_gists;
  member.followers = data.followers;
  member.following = data.following;
  member.created_at = Date.parse(data.created_at);
  member.updated_at = Date.parse(data.updated_at);

  return Promise.resolve(member);
};

export const getAllMembers = (
  organizationName: string,
  page: number
): Promise<MemberResponseData> => {
  const gitHubMembersUrl: string = `https://api.github.com/orgs/${organizationName}/members?page=${page}`;

  return fetch(gitHubMembersUrl)
    .then(response => checkStatus(response))
    .then(response => parseMemberListToJSON(response));
};

export const getAllMembers2 = (organizationName: string): Promise<Member[]> => {
  const gitHubMembersUrl: string = `https://api.github.com/orgs/${organizationName}/members`;

  return fetch(gitHubMembersUrl)
    .then(response => checkStatus(response))
    .then(response => parseJSON(response))
    .then(data => resolveMemberList(data).then((memberList: Member[]) => memberList));
};

export const getMemberDetails = (name: string): Promise<Member> => {
  const gitHubMemberDetailsUrl = `https://api.github.com/users/${name}`;

  return fetch(gitHubMemberDetailsUrl)
    .then(response => checkStatus(response))
    .then(response => parseJSON(response))
    .then(data => resolveMember(data).then((memberData: Member) => memberData));
};
