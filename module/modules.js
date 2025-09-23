// main.js
import byuiCourse from './course.mjs';
import { setSectionSelection } from './section.js';
import { setTitle, renderSections } from './output.js';

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#enrollStudent").addEventListener("click", function () {
    const sectionNum = Number(document.querySelector("#sectionNumber").value);
    byuiCourse.changeEnrollment(sectionNum);
    renderSections(byuiCourse.sections);
  });

  document.querySelector("#dropStudent").addEventListener("click", function () {
    const sectionNum = Number(document.querySelector("#sectionNumber").value);
    byuiCourse.changeEnrollment(sectionNum, false);
    renderSections(byuiCourse.sections);
  });

  // these WILL work if imported correctly
  setTitle(byuiCourse);
  setSectionSelection(byuiCourse.sections);
  renderSections(byuiCourse.sections);
});
