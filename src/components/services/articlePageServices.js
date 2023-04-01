import {baseUrl} from "../../redux/features/BaseUrl";

export  // Удаляем статью
const onClickRemove = (navigate,article) => {
    if (window.confirm('Вы действительно хотите удалить статью?')) {
        fetch(`${baseUrl}/articles/${article.slug}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + window.localStorage.getItem('token'),
            },
        })
            .then(res => navigate("/"))
            .catch((error) => {
                console.warn(error)
            })
    }
}