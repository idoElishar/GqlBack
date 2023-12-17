import { app } from "./src/server";
import request from "supertest";
import jwt from 'jsonwebtoken';
import { secret_key } from "./src/server";




describe('Product Controller', () => {
    test('should get all banners successfully', async () => {
        const response = await request(app)
            .get('/banner/api/banners')
            .timeout({ response: 200000 })
            .expect(200);

        expect(response.body).toBeDefined();
    }, 300000);
});


describe('Product Controller', () => {
    test('should create a new banner successfully', async () => {
        const newBannerData = {
            id: 25,
            image: {
                url: "https://example.com/image4.jpg",
                alt: "תמונה רביעית"
            },
            text: "טקסט לדוגמא 4",
            createdAt: "2023-11-19T10:00:00Z",
            author: "ido 4",
            rating: 5,
            sale: 10,
            category: "computers",
            productID: 5
        };

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhbGljZTExMUBleGFtcGxlLmNvbSIsImlhdCI6MTcwMTMzNjQ5OCwiZXhwIjoxNzAxMzQ3Mjk4fQ.WNo17aYACvTxLdIKSapqCg1CXLe6hOymSGwOz8oKVT0"; // הטוקן שלך

        const response = await request(app)
            .post('/banner/api/banners') 
            .set('Authorization', `Bearer ${token}`) 
            .send(newBannerData) 
            .timeout({ response: 200000 })
            .expect(201); 

        expect(response.body).toBeDefined();
    }, 300000);
});


describe('Product Controller', () => {
    test('should update a banner successfully', async () => {
        const newBannerData = {
            id: 25,
            image: {
                url: "https://example.com/image4.jpg",
                alt: "תמונה רביעית"
            },
            text: "טקסט לדוגמא 4",
            createdAt: "2023-11-19T10:00:00Z",
            author: "ido 4",
            rating: 6,
            sale: 10,
            category: "computers",
            productID: 5
        };

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhbGljZTExMUBleGFtcGxlLmNvbSIsImlhdCI6MTcwMTMzNjQ5OCwiZXhwIjoxNzAxMzQ3Mjk4fQ.WNo17aYACvTxLdIKSapqCg1CXLe6hOymSGwOz8oKVT0"; // הטוקן שלך

        const response = await request(app)
            .put('/banner/api/banners/656857605e2237360eaab9b8') 
            .set('Authorization', `Bearer ${token}`) 
            .send(newBannerData) 
            .timeout({ response: 200000 })
            .expect(200); 

        expect(response.body).toBeDefined();
    }, 300000);
});


describe('Product Controller', () => {
    test('should add rating to a banner successfully', async () => {
       

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhbGljZTExMUBleGFtcGxlLmNvbSIsImlhdCI6MTcwMTMzNjQ5OCwiZXhwIjoxNzAxMzQ3Mjk4fQ.WNo17aYACvTxLdIKSapqCg1CXLe6hOymSGwOz8oKVT0"; // הטוקן שלך

        const response = await request(app)
            .put('/banner/api/banners/addrating/656857605e2237360eaab9b8') 
            .set('Authorization', `Bearer ${token}`) 
            .timeout({ response: 200000 })
            .expect(200); 

        expect(response.body).toBeDefined();
    }, 300000);
});


describe('Product Controller', () => {
    test('should delete a banner successfully', async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhbGljZTExMUBleGFtcGxlLmNvbSIsImlhdCI6MTcwMTMzNjQ5OCwiZXhwIjoxNzAxMzQ3Mjk4fQ.WNo17aYACvTxLdIKSapqCg1CXLe6hOymSGwOz8oKVT0"; // הטוקן שלך
        const response = await request(app)
            .delete('/banner/api/banners/656857605e2237360eaab9b8') 
            .set('Authorization', `Bearer ${token}`) 
            .timeout({ response: 200000 })
            .expect(200); 

        expect(response.body).toBeDefined();
    }, 300000);
});









describe('Product Controller', () => {
    test('should get all banner successfully', async () => {
        const response = await request(app)
            .get('/banner/api/banners/655f18b37a9f0d7057d09858')
            .timeout({ response: 200000 })
            .expect(200);
        expect(response.body).toBeDefined();
    }, 300000);
});

describe('Product Controller', () => {
    test('should get all banners by category successfully', async () => {
        const response = await request(app)
            .get('/banner/api/banners/cat/smartphones')
            .timeout({ response: 200000 })
            .expect(200);
        expect(response.body).toBeDefined();
    }, 300000);
});

describe('Product Controller', () => {
    test('should get all banners by author successfully', async () => {
        const response = await request(app)
            .get('/banner/api/banners/author/Chavi da')
            .timeout({ response: 200000 })
            .expect(200);
        expect(response.body).toBeDefined();
    }, 300000);
});

describe('Product Controller', () => {
    test('should get all banners by products successfully', async () => {
        const response = await request(app)
            .get('/banner/api/banners/product/3')
            .timeout({ response: 200000 })
            .expect(200);
        expect(response.body).toBeDefined();
    }, 300000);
});

describe('Product Controller', () => {
    test('should get all users successfully', async () => {
        const response = await request(app)
            .get('/banner/api/users')
            .timeout({ response: 200000 })
            .expect(200);
        expect(response.body).toBeDefined();
    }, 300000);
});
describe('Product Controller', () => {
    test('should get user successfully', async () => {
        const response = await request(app)
            .get('/banner/api/users/655cb0a6692ce6df349c40ca')
            .timeout({ response: 200000 })
            .expect(200);
        expect(response.body).toBeDefined();
    }, 300000);
});

describe('Product Controller', () => {
    test('should delete user successfully', async () => {
        const response = await request(app)
            .delete('/banner/api/users/delete/655c7b6d5672bff00628c3db')
            .timeout({ response: 200000 })
            .expect(200);
        expect(response.body).toBeDefined();
    }, 300000);
});

describe('User Controller', () => {
    test('should change user password successfully', async () => {
        const userData = {
            email: "idoelishar81@gmail.com",
            newPassword: "Tgbyhn67"
        };

        const response = await request(app)
            .put('/banner/api/users/changepassword')
            .send(userData)
            .timeout({ response: 200000 })
            .expect(200);

        expect(response.body).toBeDefined();
    }, 300000);
});


describe('User Controller', () => {
    test('should update user successfully', async () => {
        const userData = {
            username: "bob456",
            email: "bob@example.com",
            password: "password456",
            isAdmin: true
        };

        const response = await request(app)
            .put('/banner/api/users/update/655cb3a8aa8e8aeede5e5b80')
            .send(userData)
            .timeout({ response: 200000 })
            .expect(200);

        expect(response.body).toBeDefined();
    }, 300000);
});


describe('User Controller', () => {
    test('should  user login successfully', async () => {
        const userData = {
            email: "alice11@example.com",
            password: "password1233"
        };

        const response = await request(app)
            .post('/banner/api/users/login')
            .send(userData)
            .timeout({ response: 200000 })
            .expect(200);

        expect(response.body).toBeDefined();
    }, 300000);
});



describe('User Controller', () => {
    test('should  user register successfully', async () => {
        const userData = {
            username: "alice123445",
            email: "alice11984@example.com",
            password: "password1233",
            isAdmin: true
        };

        const response = await request(app)
            .post('/banner/api/users/login')
            .send(userData)
            .timeout({ response: 200000 })
            .expect(200);

        expect(response.body).toBeDefined();
    }, 300000);
});


