import { createClient } from "redis";

// export const client = createClient({
//     password: 'WTFwithRedis',
//     socket: {
//         host: 'localhost',
//         port: 6379
//     }
// });

export const client = createClient({
    password: 'MVQENSwDAAtobdqT8QrzyLcjNwaEfZma',
    socket: {
        host: 'redis-16155.c325.us-east-1-4.ec2.cloud.redislabs.com',
        port: 16155
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

