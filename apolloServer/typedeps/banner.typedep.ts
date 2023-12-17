const bannerTypeDefs = `#graphql

  type Banner {
    _id: String
    id:Int
    image: Image
    text: String
    createdAt: String
    author: String
    category: String
    rating: Int
    sale: Int
    productID: Int
  }
  type Image {
    url: String
    alt: String
  }
  input BannerInput {
    id: Int
    image: ImageInput
    text: String
    author: String
    category: String
    rating: Int
    sale: Int
    productID: Int
  }
  input ImageInput {
    url: String
    alt: String
  }
  type Query {
    getAllBanners: [Banner]
    getBannerById(_id: String!): [Banner]
    getBannersByCategory(category: String!): [Banner]
    getBannersByAuthor(author: String!): [Banner]
    getBannerByProductID(productID: Int!):[ Banner]
  }
  type Mutation {
    createBanner(banner: BannerInput!): Banner
    updateBanner(id: String!, banner: BannerInput!): Banner
    deleteBanner(id: String!): String
  }
`;
export default bannerTypeDefs;