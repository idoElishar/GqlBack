import bannerService from "../../src/Banners/banners.service";
import { Banner } from "../../src/Banners/Banners.model"; 

import { authenticateToken } from "../../src/middleware/morgen/middleware";
import { getOrSetCache } from "../../src/redis/banners";
import bannersController from "../../src/Banners/banners.Controller";

interface QueryResolvers {

    getAllBanners: () => Promise<Banner[]>;
    getBannerById: (_: any, args: { _id: string }) => Promise<any>
    getBannersByCategory: (_: any, args: { category: string }) => Promise<Banner[]>;
    getBannersByAuthor: (_: any, args: { author: string }) => Promise<Banner[]>;
    getBannerByProductID: (_: any, args: { productID: string }) => Promise<Banner[]>;
}
interface MyContext {
    token?: string;
  }
interface MutationResolvers {
    createBanner: (_: any, args: { banner: Banner }, context: MyContext) => Promise<Banner>;
    updateBanner: (_: any, args: { id: string, updatedBanner: Banner }, context: MyContext) => Promise<Banner | null>;
    deleteBanner: (_: any, args: { id: string }, context: MyContext) => Promise<String | null>;
}
const bannerResolvers: { Query: QueryResolvers, Mutation: MutationResolvers } = {
    Query: {
        getAllBanners : async () => {
            try {

                const banners = await getOrSetCache(bannerService.getAllBanners) 
                // console.log(banners);

                return banners;
            } catch (error) {
                console.error('Error fetching banners:', error);
                throw new Error('Internal server error');
            }
        },
        getBannerById: async (_, args) => {
           
            try {

                const banners:Banner[] = await getOrSetCache(bannerService.getAllBanners) 
                if (!banners) {
                    throw new Error('Banner not found');
                }
                const banner = banners.filter(banner => banner._id  == args._id)


                return banner;
            } catch (error) {
                console.error('Error fetching banner by ID:', error);
                throw new Error('Internal server error');
            }
        },
        
        getBannersByCategory: async (_, args) => {
            try {
                const banners:Banner[] = await getOrSetCache(bannerService.getAllBanners) 
                if (!banners) {
                    throw new Error('No banners found in this category');
                }
                const bannerByCategory = banners.filter (b => b.category === args.category)
                return bannerByCategory;
            } catch (error) {
                console.error('Error fetching banners by category:', error);
                throw new Error('Internal server error');
            }
        },
        getBannersByAuthor: async (_, args) => {
            try {
                const banners:Banner[] = await getOrSetCache(bannerService.getAllBanners) 
                if (!banners) {
                    throw new Error('No banners found for this author');
                }
                const bannerByAuthor = banners.filter(b => b.author === args.author)
                return bannerByAuthor;
            } catch (error) {
                console.error('Error fetching banners by author:', error);
                throw new Error('Internal server error');
            }
        },
        getBannerByProductID: async (_, args) => {
            try {
                const banners:Banner[] = await getOrSetCache(bannerService.getAllBanners) 
                if (!banners) {
                    throw new Error('Banner not found with the given product ID');
                }
                const banner = banners.filter(b => b.productID === +args.productID)
                return banner;
            } catch (error) {
                console.error('Error fetching banner by product ID:', error);
                throw new Error('Internal server error');
            }
        },
    },
    Mutation: {
        createBanner: async (_, args, context) => {
            try {

         
                await authenticateToken(context.token);
   

                const newBanner = await bannerService.createBanner(args.banner);
                
                return newBanner;
            }catch (error) {
                if (error instanceof Error) {
                    console.error('Error creating banner:', error.message);
                    throw new Error(error.message || 'Internal server error');
                } else {
                    console.error('An unknown error occurred:', error);
                    throw new Error('Internal server error');
                }
            }
        },
        updateBanner: async (_, args, context) => {
            try {
                await authenticateToken(context.token);
                console.log(args.id);
                const updatedBanner = await bannerService.updateBanner(args.id, args.updatedBanner);
                if (!updatedBanner) {
                    throw new Error('Banner not found');
                }
                return updatedBanner;
            } catch (error) {
                if (error instanceof Error) {
                    console.error('Error updating banner:', error.message);
                    throw new Error(error.message || 'Internal server error');
                } else {
                    console.error('An unknown error occurred:', error);
                    throw new Error('Internal server error');
                }
            }
        },
        deleteBanner: async (_, args, context) => {
            try {
                await authenticateToken(context.token);
                const deletedBanner = await bannerService.deleteBanner(args.id);
                console.log(deletedBanner);
                if (!deletedBanner) {
                    throw new Error('Banner not found');
                }
                return "Banner deleted successfully";
            } catch (error) {
                if (error instanceof Error) {
                    console.error('Error deleting banner:', error.message);
                    throw new Error(error.message || 'Internal server error');
                } else {
                    console.error('An unknown error occurred:', error);
                    throw new Error('Internal server error');
                }
            }
        },
    }
};
export default bannerResolvers;