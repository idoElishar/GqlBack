export const clicksTypeDefs = `#graphql
type ProductClick {
    _id: ID
    banner_id: String
    clicks: [ClickRecord]
}

type ClickRecord {
    date: String
    count: Int
}

type Query {
    getAllProductClicks: [ProductClick]
    getProductClicksById(id: ID!): ProductClick
}
`;
