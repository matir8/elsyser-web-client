import { requester } from '../../utils/requster.js';
import { templates } from '../../utils/templates.js';

export function HomeworksController() {
    let examsUrl = 'http://127.0.0.1:8000/api/homeworks/',
        getData = requester.getJSON(examsUrl),
        getTemplate = templates.get('homeworks');

    Promise.all([getData, getTemplate])
        .then((result) => {
            let data = result[0],
                hbTemplate = Handlebars.compile(result[1]);

            data.forEach((el) => {
                if (el.details.length > 150) {
                    el.details = el.details.slice(0, 149) + '...';
                }
            });

            let template = hbTemplate(data);
            $('#content').html(template);
        }).catch((err) => {
            console.log(err);
        });
}