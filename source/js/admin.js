//Загрузка картинки

import fileUpload from './upload';
import prepareSend from './prepareSend';

const formUpload = document.querySelector('#works');
const formBlog = document.querySelector('#blog');
const formSkills = document.querySelector('#skills');

formUpload.addEventListener('submit', prepareSendFile);
formBlog.addEventListener('submit', prepareSendPost);
formSkills.addEventListener('submit', prepareSendSkills);

function prepareSendFile(e) {
    e.preventDefault();
    let resultContainer = document.querySelector('#work-status');
    let formData = new FormData();
    let file = document
        .querySelector('#file-select')
        .files[0];
    let name = document
        .querySelector('#file-desc')
        .value;
    let teh = document
        .querySelector('#file-teh')
        .value;
    let link = document
        .querySelector('#file-link')
        .value;
    if(file) {
        formData.append('photo', file, file.name);
        formData.append('name', name);
        formData.append('teh', teh);
        formData.append('link', link);
    }else{
        resultContainer.innerHTML = 'Выберите файл';
        return;
    }
    resultContainer.innerHTML = 'Загрузка...';
    fileUpload('/admin.html/upload', formData, function (data) {
        formUpload.reset();
        resultContainer.innerHTML = data;
    });
}

function prepareSendPost(e) {
    e.preventDefault();
    let data = {
        title: formBlog.title.value,
        date: formBlog.date.value,
        text: formBlog.text.value
    };
    prepareSend('/admin.html/addpost', formBlog, data);
}

function prepareSendSkills(e) {
    e.preventDefault();
    let data = {};
    const itemsElement = document.querySelectorAll('.admin-skills__title');
    itemsElement.forEach(i => {
        let inputs = i.parentNode.querySelectorAll('INPUT');
        data[i.textContent] = [];
        inputs.forEach(input => {
            data[i.textContent].push({name: input.name, value: input.value });
        });
    });

    prepareSend('/admin.html/update',formSkills, data);
}
console.log('admin run run');
