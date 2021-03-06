import { requester } from '../../utils/requster.js';
import { templates } from '../../utils/templates.js';
import { validator } from '../../utils/validator.js';
import { NewsController } from './NewsController.js';

export function AddNewsController() {
    templates.get('NewsTemplates/add-news')
        .then((res) => {
            let hbTemplate = Handlebars.compile(res),
                template = hbTemplate();

            $('#content').html(template);

            $('#add-news').on('click', () => {
                postNews();
            });
        });
}

function getDataFromTemplate() {
    let body = {
        title: '',
        content: ''
    };

    if (validator.title($('#news-title').val())) {
        body.title = $('#news-title').val();
    }
    else {
        toastr.error('Title shoud be between 3 and 100 characters long!');
        return;
    }

    if (validator.content($('#news-content').val())) {
        body.content = $('#news-content').val();
    }
    else {
        toastr.error('Content shoud be between 5 and 10000 characters long!');
        return;
    }

    return body;
}

function postNews() {
    let newsUrl = 'https://elsyser.herokuapp.com/api/news/';
    let data = getDataFromTemplate();
    if (data) {
        requester.postJSON(newsUrl, data)
            .then((result) => {
                if (result) {
                    toastr.success('News added!');
                    NewsController();
                }
            }).catch(() => {
                toastr.error('Couldn\'t add the news Please check for errors!');
            });
    }
}
