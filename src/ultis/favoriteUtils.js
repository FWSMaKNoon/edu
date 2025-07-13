export const getFavorites = () => JSON.parse(localStorage.getItem('favorites')) || [];

export const addFavorite = (id) => {
    const favs = getFavorites();
    if (!favs.includes(id)) {
        favs.push(id);
        localStorage.setItem('favorites', JSON.stringify(favs));
    }
};

export const removeFavorite = (id) => {
    const favs = getFavorites().filter((fid) => fid !== id);
    localStorage.setItem('favorites', JSON.stringify(favs));
};

export const isFavorite = (id) => getFavorites().includes(id);
