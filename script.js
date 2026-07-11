(function () {
  'use strict';

  var landing = document.getElementById('view-landing');
  var grid = document.getElementById('view-grid');
  var btnEnter = document.getElementById('btn-enter');
  var btnBack = document.getElementById('btn-back');
  var gridTitle = document.querySelector('#view-grid .grid-title h2');

  function showGrid(updateHash) {
    landing.classList.remove('is-active');
    landing.setAttribute('aria-hidden', 'true');
    grid.classList.add('is-active');
    grid.setAttribute('aria-hidden', 'false');

    if (updateHash !== false && window.location.hash !== '#grid') {
      history.pushState(null, '', '#grid');
    }
    document.title = 'S10 Studio — The Grid';

    // send keyboard/screen-reader focus to the new view's heading
    if (gridTitle) {
      gridTitle.setAttribute('tabindex', '-1');
      gridTitle.focus();
    }
  }

  function showLanding(updateHash) {
    grid.classList.remove('is-active');
    grid.setAttribute('aria-hidden', 'true');
    landing.classList.add('is-active');
    landing.setAttribute('aria-hidden', 'false');

    if (updateHash !== false && window.location.hash) {
      history.pushState(null, '', window.location.pathname);
    }
    document.title = 'S10 Studio';

    if (btnEnter) btnEnter.focus();
  }

  if (btnEnter) {
    btnEnter.addEventListener('click', function () {
      showGrid();
    });
  }

  if (btnBack) {
    btnBack.addEventListener('click', function () {
      showLanding();
    });
  }

  // support browser back/forward between the two views
  window.addEventListener('hashchange', function () {
    if (window.location.hash === '#grid') {
      showGrid(false);
    } else {
      showLanding(false);
    }
  });

  // deep link straight into the grid if the page loads with #grid
  if (window.location.hash === '#grid') {
    showGrid(false);
  }

  // Escape returns to the landing view from the grid
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && grid.classList.contains('is-active')) {
      showLanding();
    }
  });
})();
