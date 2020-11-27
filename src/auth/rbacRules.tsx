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
      "packs:visit",
      // "posts:create",
      // "users:getSelf",
      // "home-page:visit",
      // "dashboard-page:visit"
    ],
    dynamic: {
      "posts:edit": ({userId, postOwnerId}:{userId:string, postOwnerId:string}) => {
        if (!userId || !postOwnerId) return false;
        return userId === postOwnerId;
      }
    }
  },
  moderator: {
    static: [
      "about:visit",
      "games:visit",
      "fiends:visit",
      "pack:edit",
    ],
  },  
  creator: {
    static: [
      "about:visit",
      "games:visit",
      "fiends:visit",
      "pack:edit",
      "pack:delete",
      "pack:create",
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
      "games:visit",
      "fiends:visit",
      "pack:edit",
      "pack:delete",
      "pack:create",      
      // "posts:list",
      // "posts:create",
      // "posts:edit",
      // "posts:delete",
      "users:get",
      "users:getSelf",
      // "home-page:visit",
      // "dashboard-page:visit"
    ]
  }
};

export default rules;