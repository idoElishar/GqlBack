import bannerResolvers from "./banner.resolver";
import { usersResolvers } from "./users.resolvers";
const resolvers = {
    Query: {
      ...bannerResolvers.Query,
      ...usersResolvers.Query,
    },
    Mutation: {
        ...bannerResolvers.Mutation,
        ...usersResolvers.Mutation,
    }
    
  };
  
  export default resolvers;