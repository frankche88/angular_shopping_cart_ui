import { Product } from '../models/product';

export const products: Product[] = [
    {
        id: 1,
        name: 'Nike shoes',
        description: 'The Nike Epic React Flyknit iD Running Shoe provides crazy comfort that lasts as long as you can run. Its Nike React foam cushioning is responsive yet lightweight, durable yet soft. This attraction of opposites creates a sensation that not only enhances the feeling of moving forward, but makes running feel fun, too. Customize yours with colors, accents and a personal iD.',
        price: 200,
        pictureUrl: 'https://images-na.ssl-images-amazon.com/images/I/41lfQdOdPzL.jpg'
    },
    {
        id: 2,
        name: 'Adidas T-shirt',
        description: `Model's height: 6'2”/188 cm , Model is wearing: Size Medium`,
        price: 100,
        pictureUrl: 'https://www.thegraphicedge.com/media/products/greyback_61269BC583CD3.png'
    }
];
