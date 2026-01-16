import { DataProvider } from 'react-admin';

const getApiUrl = () => {
    if (typeof window !== 'undefined') {
        return window.location.origin;
    }
    return 'http://localhost:3000';
};

export const customDataProvider: DataProvider = {
    getList: async (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        
        const response = await fetch(`${getApiUrl()}/api/${resource}`);
        if (!response.ok) {
            throw new Error('Network error');
        }
        const data = await response.json();
        
        // Используем slug как id для react-admin
        const dataWithId = data.map((item: any) => ({
            ...item,
            id: item.slug || item.id,
        }));
        
        // Простая сортировка на клиенте
        const sortedData = [...dataWithId].sort((a, b) => {
            const aVal = a[field];
            const bVal = b[field];
            if (order === 'ASC') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });
        
        // Пагинация
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const paginatedData = sortedData.slice(start, end);
        
        return {
            data: paginatedData,
            total: data.length,
        };
    },

    getOne: async (resource, params) => {
        // Используем slug вместо id (params.id содержит slug)
        const response = await fetch(`${getApiUrl()}/api/${resource}/${params.id}`);
        if (!response.ok) {
            throw new Error('Network error');
        }
        const data = await response.json();
        // Убеждаемся, что id = slug для react-admin
        return { data: { ...data, id: data.slug || data.id } };
    },

    getMany: async (resource, params) => {
        const response = await fetch(`${getApiUrl()}/api/${resource}`);
        if (!response.ok) {
            throw new Error('Network error');
        }
        const allData = await response.json();
        const data = allData
            .filter((item: any) => 
                params.ids.includes(item.id) || params.ids.includes(item.slug)
            )
            .map((item: any) => ({
                ...item,
                id: item.slug || item.id,
            }));
        return { data };
    },

    getManyReference: async (resource, params) => {
        const response = await fetch(`${getApiUrl()}/api/${resource}`);
        if (!response.ok) {
            throw new Error('Network error');
        }
        const allData = await response.json();
        const data = allData
            .filter((item: any) => 
                item[params.target] === params.id
            )
            .map((item: any) => ({
                ...item,
                id: item.slug || item.id,
            }));
        return { data, total: data.length };
    },

    create: async (resource, params) => {
        const response = await fetch(`${getApiUrl()}/api/${resource}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params.data),
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Network error');
        }
        
        const data = await response.json();
        // Убеждаемся, что id = slug для react-admin
        return { data: { ...data, id: data.slug || data.id } };
    },

    update: async (resource, params) => {
        // Используем slug вместо id (params.id содержит slug)
        const response = await fetch(`${getApiUrl()}/api/${resource}/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params.data),
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Network error');
        }
        
        const data = await response.json();
        // Убеждаемся, что id = slug для react-admin
        return { data: { ...data, id: data.slug || data.id } };
    },

    updateMany: async (resource, params) => {
        const promises = params.ids.map(id =>
            fetch(`${getApiUrl()}/api/${resource}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params.data),
            })
            .then(res => res.json())
            .then((item: any) => ({
                ...item,
                id: item.slug || item.id,
            }))
        );
        
        const data = await Promise.all(promises);
        return { data };
    },

    delete: async (resource, params) => {
        // Используем slug вместо id
        const response = await fetch(`${getApiUrl()}/api/${resource}/${params.id}`, {
            method: 'DELETE',
        });
        
        if (!response.ok) {
            throw new Error('Network error');
        }
        
        return { data: { id: params.id } };
    },

    deleteMany: async (resource, params) => {
        const promises = params.ids.map(id =>
            fetch(`${getApiUrl()}/api/${resource}/${id}`, {
                method: 'DELETE',
            })
        );
        
        await Promise.all(promises);
        return { data: params.ids };
    },
};
