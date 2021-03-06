import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Osama',
            email: 'admin@example.com',
            cnic:'1234567890001',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },

        {
            name: 'Fahad',
            email: 'user@example.com',
            cnic:'2233567890001',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        },
    ],

    vehicles: [
        {
            name: 'Toyota Corolla',
            category: 'Sedan',
            image: '/images/corolla1.jpg',
            price: 3500,
            countInStock: 1,
            manufacturer: 'Toyota',
            rating: 4.5,
            numReviews: 10,
            description: 'Rides Smoothly. No faults. Nice and Clean.',

        },
        {
            name: 'Toyota Vitz',
            category: 'HatchBack',
            image: '/images/vitz.jpg',
            price: 3000,
            countInStock: 0,
            manufacturer: 'Toyota',
            rating: 4.5,
            numReviews: 15,
            description: 'Rides Smoothly. No faults. Nice and Clean.',

        },
        {
            name: 'Toyota Prado',
            category: 'SUV',
            image: '/images/prado.jpg',
            price: 8000,
            countInStock: 1,
            manufacturer: 'Toyota',
            rating: 4.8,
            numReviews: 8,
            description: 'Rides Smoothly. No faults. Nice and Clean.',

        },
        {
            name: 'Toyota Supra',
            category: 'Super Car',
            image: '/images/supra.jpg',
            price: 15000,
            countInStock: 1,
            manufacturer: 'Toyota',
            rating: 5,
            numReviews: 100,
            description: 'Rides Smoothly. No faults. Nice and Clean.',

        },
        {
            name: 'Toyota Hiace',
            category: 'Van',
            image: '/images/hiace.jpg',
            price: 5000,
            countInStock: 0,
            manufacturer: 'Toyota',
            rating: 3.5,
            numReviews: 14,
            description: 'Rides Smoothly. No faults. Nice and Clean.',

        },
        {
            name: 'Toyota Coaster',
            category: 'Bus',
            image: '/images/coaster.jpg',
            price: 10000,
            countInStock: 1,
            manufacturer: 'Toyota',
            rating: 4.5,
            numReviews: 69,
            description: 'Rides Smoothly. No faults. Nice and Clean.',

        },
    ],
};

export default data;