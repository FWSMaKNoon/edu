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

export const toggleFavorite = (id) => {
    const favs = getFavorites();
    const isFav = favs.includes(id);
    let updated;

    if (isFav) {
        updated = favs.filter((fid) => fid !== id);
    } else {
        updated = [...favs, id];
    }

    localStorage.setItem('favorites', JSON.stringify(updated));
    return !isFav;
};
