import { ProductClicks } from "../../src/ProductClicks/ProductClicks.model";
import bannerClicksService from "../../src/ProductClicks/productClicks.service";
import { client } from "../../src/redis/banners";

const resolvers2 = {
    Query: {
        getAllProductClicks: async (): Promise<ProductClicks[]> => {
            try {
                console.log('Request received to get all banners');
                const bannersRedis = await client.get("allBanners");
                let banners = bannersRedis ? JSON.parse(bannersRedis) : null;
                if (bannersRedis) {console.log("fetching clicks from redis")}
                if (!banners || banners.length === 0) {
                    console.log('fetching clicks from db');
                    banners = await bannerClicksService.getAllBannersClic();
                    await client.set("allBanners", JSON.stringify(banners));
                }
                return banners;
            } catch (error) {
                console.error('Error fetching banners:', error);
                throw new Error('Internal server error');
            }
        },

        getProductClicksById: async (_: any, args: { id: string }): Promise<ProductClicks | null> => {
            try {
                console.log(`Request received to get banner with ID: ${args.id}`);
                const bannerRedis = await client.get(`banner:${args.id}`);
                if (bannerRedis) {console.log("fetching clicks from redis")}
                let banner = bannerRedis ? JSON.parse(bannerRedis) : null;
                if (!banner) {
                    console.log('fetching clicks from db');
                    banner = await bannerClicksService.getByBannerById(args.id);
                    await client.set(`banner:${args.id}`, JSON.stringify(banner));
                }
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
