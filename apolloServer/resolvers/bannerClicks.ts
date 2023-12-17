import { ProductClicksModel,ProductClicks } from "../../src/ProductClicks/ProductClicks.model";
import bannerClicksService from "../../src/ProductClicks/productClicks.service";

const resolvers2 = {
    Query: {
        getAllProductClicks: async (): Promise<ProductClicks[]> => {
            try {
                console.log('Request received to get all banners');
                const banners = await bannerClicksService.getAllBannersClic();
                console.log(banners);

                return banners;
            } catch (error) {
                console.error('Error fetching banners:', error);
                throw new Error('Internal server error');
            }
        },
        getProductClicksById: async (_: any, args: { id: string }): Promise<ProductClicks | null> => {
            try {
                console.log(`Request received to get banner with ID: ${args.id}`);
                const banner = await bannerClicksService.getByBannerById(args.id);
                console.log(banner);

                return banner;
            } catch (error) {
                console.error(`Error fetching banner with ID ${args.id}:`, error);
                throw new Error('Internal server error');
            }
        },
    },
        
    }

export default resolvers2
