import {createSiteMenuTemplate} from './components/site-menu.js';
import {createSortingTemplate} from './components/sorting.js';
import {createFilterTemplate} from './components/filter.js';
import {createBoardTemplate} from './components/board.js';
import {createTaskEditTemplate} from './components/task-edit.js';
import {createTaskTemplate} from './components/task.js';
import {createLoadMoreButtonTemplate} from './components/load-more-btn.js';
import {generateTasks} from "./components/mock-task.js";
import {generateFilters} from './components/mock-filter.js';

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const appMain = document.querySelector(`.main`);
const appHeader = appMain.querySelector(`.main__control`);

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

render(appHeader, createSiteMenuTemplate());
render(appMain, createFilterTemplate(filters));
render(appMain, createBoardTemplate());

const boardBlock = appMain.querySelector(`.board`);
const taskListBlock = appMain.querySelector(`.board__tasks`);

render(boardBlock, createSortingTemplate(), `afterbegin`);
render(taskListBlock, createTaskEditTemplate(tasks[0]));

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

tasks.slice(1, showingTasksCount).forEach((task) => render(taskListBlock, createTaskTemplate(task)));

render(boardBlock, createLoadMoreButtonTemplate());

const loadMoreButton = boardBlock.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount).forEach((task) => render(taskListBlock, createTaskTemplate(task)));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
