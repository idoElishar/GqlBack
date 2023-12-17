
import { ProductClicksModel, ProductClicks } from './ProductClicks.model';

const bannerClicksService = {
    getAllBannersClic: async (): Promise<ProductClicks[]> => {
        console.log(await ProductClicksModel.find({}));
        return await ProductClicksModel.find({});
    },
    getByBannerById: async (banner_id: string): Promise<ProductClicks | null> => {
        console.log("hi"+await ProductClicksModel.findOne({ banner_id: banner_id }));
        return await ProductClicksModel.findOne({ banner_id: banner_id });
    }
}



export default bannerClicksService;
