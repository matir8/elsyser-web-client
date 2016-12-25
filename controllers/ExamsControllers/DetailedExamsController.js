import { requester } from '../../utils/requster.js';
import { templates } from '../../utils/templates.js';
import { EditExamController } from './EditExamController.js';
import { DeleteExamController } from './DeleteExamController.js';

export function DetailedExamsController(id) {
    let examUrl = `https://elsyser.herokuapp.com/api/exams/${id}/`,
        getData = requester.getJSON(examUrl),
        getTemplate = templates.get('detailed-exam');

    Promise.all([getData, getTemplate])
        .then((result) => {
            let data = result[0],
                currentUser = window.localStorage.getItem('elsyser-username');

            if (currentUser === data.author.username) {
                data.editable = true;
            }

            let hbTemplate = Handlebars.compile(result[1]),
                template = hbTemplate(data);

            $('#content').html(template);

            $(`#exam-${id}-edit`).on('click', () => {
                EditExamController(id);
            })

            $(`#exam-${id}-delete`).on('click', () => {
                DeleteExamController(id);
            })
        })
}