import {createSiteMenuTemplate} from './components/site-menu.js';
import {createFilterTemplate} from './components/filter.js';
import {createBoardTemplate} from './components/board.js';
import {createTaskEditTemplate} from './components/task-edit.js';
import {createTaskTemplate} from './components/task.js';
import {createLoadMoreButtonTemplate} from './components/load-more-btn.js';

const TASK_COUNT = 3;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const appMain = document.querySelector(`.main`);
const appHeader = appMain.querySelector(`.main__control`);


render(appHeader, createSiteMenuTemplate());
render(appMain, createFilterTemplate());
render(appMain, createBoardTemplate());

const boardBlock = appMain.querySelector(`.board`);
const taskListBlock = appMain.querySelector(`.board__tasks`);

render(taskListBlock, createTaskEditTemplate());

for (let i = 0; i < TASK_COUNT; i++) {
  render(taskListBlock, createTaskTemplate());
}

render(boardBlock, createLoadMoreButtonTemplate());
