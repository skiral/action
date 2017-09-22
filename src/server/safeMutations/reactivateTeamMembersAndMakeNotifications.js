import getRethink from 'server/database/rethinkDriver';
import makeReactivationNotifications from 'server/safeMutations/helpers/makeReactivationNotifications';
import shortid from 'shortid';
import {ADD_TO_TEAM} from 'universal/utils/constants';

const reactivateTeamMembersAndMakeNotifications = async (invitees, inviter, teamMembers) => {
  if (invitees.length === 0) return [];
  const {orgId, teamId, teamName} = inviter;
  const r = getRethink();
  const now = new Date();
  const userIds = invitees.map(({userId}) => userId);
  const teamMemberIds = userIds.map((userId) => `${userId}::${teamId}`);
  const {reactivatedUsers} = await r({
    reactivatedTeamMembers: r.table('TeamMember')
      .getAll(r.args(teamMemberIds), {index: 'id'})
      .update({isNotRemoved: true}),
    reactivatedUsers: r.table('User')
      .getAll(r.args(userIds))
      .update((user) => {
        return user.merge({
          tms: user('tms').append(teamId)
        });
      }, {returnChanges: true})('changes')('new_val')
  });
  const notifications = reactivatedUsers.map((user) => ({
    id: shortid.generate(),
    type: ADD_TO_TEAM,
    startAt: now,
    orgId,
    userIds: [user.id],
    teamId,
    // inviterName,
    teamName
  }));
  await r.table('Notification').insert(notifications);
  return makeReactivationNotifications(notifications, reactivatedUsers, teamMembers, inviter);
};

export default reactivateTeamMembersAndMakeNotifications;
