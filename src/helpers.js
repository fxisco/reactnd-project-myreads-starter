export const orderByStars = (a, b) => {
    const ratingA = a.averageRating ? a.averageRating : 0;
    const ratingB = b.averageRating ? b.averageRating : 0;

    if (ratingA > ratingB) {
        return -1;
    }

    if (ratingA < ratingB) {
        return 1;
    }

    return 0;
};

export const orderByName = (a, b) => {
    if (a.title > b.title) {
        return 1;
    }

    if (a.title < b.title) {
        return -1;
    }

    return 0;
};

export const orderByPage = (a, b) => {
    const pagesA = a.pageCount ? a.pageCount : 0;
    const pagesB = b.pageCount ? b.pageCount : 0;

    if (pagesA > pagesB) {
        return -1;
    }

    if (pagesA < pagesB) {
        return 1;
    }

    return 0;
};
