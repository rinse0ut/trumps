// type RuleType = {
//   static: string[],
//   dynamic: {},
// }

export type RulesType = {
  [id: string]: any, // @TODO
};

const rules: RulesType = {
  visitor: {
    static: [
      "about:visit",
      "membership:visit",
      "home-page:login",
    ]  
  },
  user: {
    static: [
      "about:visit",
      "membership:visit",
      "games:visit",
      "friends:visit",
    ],
    dynamic: {
      "game:play": ({packGroupId, userGroupIds}:{packGroupId:string, userGroupIds:string[]}) => {
        console.log('GAME:PLAY', {userGroupIds, packGroupId});
        if (packGroupId === 'public') return true;
        if (!userGroupIds) return false;
        console.log('GAME:PLAY INCLUDES', userGroupIds.includes(packGroupId));
        return userGroupIds.includes(packGroupId);
      },
    }
  },
  moderator: {
    static: [
      "about:visit",
      "membership:visit",      
      "games:visit",
      "friends:visit",      
      "fiends:visit",      
      "packs:visit",
      "packs:edit",
    ],
  },  
  creator: {
    static: [
      "about:visit",
      "membership:visit",      
      "games:visit",
      "fiends:visit",
      "packs:visit",
      "packs:edit",
      "packs:delete",
      "packs:create",  
    ],
    dynamic: {
      "pack:edit": ({userId, packOwnerId}:{userId:string, packOwnerId:string}) => {
        if (!userId || !packOwnerId) return false;
        return userId === packOwnerId;
      }
    }
  },    
  admin: {
    static: [
      "about:visit",
      "membership:visit",      
      "games:visit",
      "friends:visit",
      "packs:visit",
      "packs:edit",
      "packs:delete",
      "packs:create",      
      // "users:get",
      // "users:getSelf",
      // "home-page:visit",
      // "dashboard-page:visit"
    ]
  }
};

export default rules;