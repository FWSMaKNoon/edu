export const setSuggestions = (userId) => {
    const suggestions = {
        1: [
            { id: 1, title: 'Áo Hoodie Nam', price: 450000 },
            { id: 3, title: 'Giày Sneaker Nữ', price: 650000 },
        ],
        2: [
            { id: 5, title: 'Giày Sneaker Nam', price: 700000 },
            { id: 9, title: 'Giày Boot Nữ', price: 800000 },
        ],
        default: [
            { id: 2, title: 'Áo Thun Basic', price: 250000 },
            { id: 7, title: 'Quần Jeans Nam', price: 400000 },
        ],
    };
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(suggestions[userId] || suggestions['default']);
        }, 300);
    });
};
