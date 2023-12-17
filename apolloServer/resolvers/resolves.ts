import bannerResolvers from "./banner.resolver";
import { usersResolvers } from "./users.resolvers";
import resolvers2 from "./bannerClicks";

const resolvers = {
    Query: {
      ...bannerResolvers.Query,
      ...usersResolvers.Query,
      ...resolvers2.Query
    },
    Mutation: {
        ...bannerResolvers.Mutation,
        ...usersResolvers.Mutation,
    }
    
  };
  
  export default resolvers;