import { createClient } from "redis";

export const client = createClient({
    password: '1234qwer',
    socket: {
        host: 'localhost',
        port: 6379
    }
});

export const getOrSetCache = async (cb:() =>any) => {
    try{
        const banners = await client.json.get("banner");
        if (banners) {
            return banners
        }
        const freshData = await cb()
    
        await client.json.set("banner","$" ,freshData)
        return freshData
    }
    catch (error){
        return error
    }
}

