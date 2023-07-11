const knex = require('knex');

const config = {
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        port: process.env.DB_PORT,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: {
            rejectUnauthorized: false
        }
    }
}

const db = knex(config);

const getRestaurant = async (id) => {
    const restaurant = await db('restaurant').where({ id }).first();
    return restaurant;
}

const getRestaurantMenu = async (id) => {
    const menu = await db('items').where({ restaurantid: id });
    return menu;
}

const getCategories = async (id) => {
    const categories = await db('categories').where({ restaurantid: id });
    return categories;
}

const getCategoriesWithItems = async (id) => {
    const categories = await db('category').where({ restaurant_id: id });
    const categoriesWithItems = await Promise.all(categories.map(async (category) => {
        const items = await db('items').where({ categoryid: category.id });
        return {
            ...category,
            items
        }
    }));
    return categoriesWithItems;
}


module.exports = {
    getRestaurant,
    getRestaurantMenu,
    getCategories,
    getCategoriesWithItems,
    db
}
