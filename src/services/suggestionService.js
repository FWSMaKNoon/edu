import axios from 'axios';

const API_URL = 'https://687557bc814c0dfa65384fe2.mockapi.io/api';

export const getSuggestions = async () => {
    try {
        const res = await axios.get(`${API_URL}/Courses`);
        const allCourses = res.data;

        // Lấy và convert về string luôn
        const favorites = (JSON.parse(localStorage.getItem('favorites')) || []).map(String);
        const viewed = (JSON.parse(localStorage.getItem('viewedCourses')) || []).map(String);

        // Gợi ý những khóa đã thích hoặc đã xem
        const suggestions = allCourses.filter(
            (course) =>
                (favorites.includes(course.id.toString()) && !viewed.includes(course.id.toString())) ||
                (!favorites.includes(course.id.toString()) && viewed.includes(course.id.toString())),
        );

        // Random 5 khóa
        return suggestions;
    } catch (err) {
        console.error(err);
        return [];
    }
};
