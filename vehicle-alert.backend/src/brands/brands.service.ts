import { Injectable } from '@nestjs/common';

@Injectable()
export class BrandsService {
    getBrands() {
        return [
            { id: 1, name: 'Toyota' },
            { id: 2, name: 'Honda' },
            { id: 3, name: 'Ford' },
            { id: 4, name: 'Chevrolet' },
            { id: 5, name: 'Nissan' },
        ];
    }
}
