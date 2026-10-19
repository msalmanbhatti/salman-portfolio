/* ══ DARK MODE TOGGLE ══ */
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('themeToggle');
  var KEY = 'sb-theme';

  function applyTheme(theme) {
    root.classList.toggle('dark', theme === 'dark');
  }

  var saved = localStorage.getItem(KEY);
  applyTheme(saved || 'dark');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var next = root.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(KEY, next);
  });
})();

/* ══ NAV: rolling labels, scroll hide/reveal, active section, email copy ══ */
(function () {
  var nav = document.getElementById('main-nav');
  if (!nav) return;

  var links = Array.prototype.slice.call(nav.querySelectorAll('.sb-nav-links li a'));

  /* Rolling label: clone each link's span so hover can slide the
     original up and the accent clone in from below. */
  links.forEach(function (a) {
    var span = a.querySelector('span');
    if (!span) return;
    var clone = span.cloneNode(true);
    clone.classList.add('roll-clone');
    clone.setAttribute('aria-hidden', 'true');
    a.appendChild(clone);
  });

  /* Scroll: lift the shadow once scrolled, hide on scroll-down, reveal on scroll-up. */
  var lastY = window.scrollY;
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 8);
    if (y > lastY && y > 160) nav.classList.add('is-hidden');
    else nav.classList.remove('is-hidden');
    lastY = y;
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  /* Email chip: click copies the address instead of opening a mail client. */
  var email = document.getElementById('emailChip');
  if (email && navigator.clipboard) {
    var addr = email.href.replace('mailto:', '');
    var label = email.querySelector('span');
    email.addEventListener('click', function (ev) {
      ev.preventDefault();
      navigator.clipboard.writeText(addr).then(function () {
        email.classList.add('is-copied');
        var prev = label.textContent;
        label.textContent = 'copied ✓';
        setTimeout(function () {
          label.textContent = prev;
          email.classList.remove('is-copied');
        }, 1400);
      });
    });
  }
})();

/* ══ CUSTOM CURSOR ══ */
(function () {
  var cursor = document.getElementById('customCursor');
  if (!cursor) return;

  document.addEventListener('mousemove', function (e) {
    cursor.style.transform = 'translate(' + (e.clientX - 2) + 'px,' + (e.clientY - 2) + 'px)';
    cursor.classList.add('visible');
  });

  document.addEventListener('mouseleave', function () {
    cursor.classList.remove('visible');
  });
})();

/* ══ HERO IMAGE HOVER SOUNDS ══ */
(function () {
  document.querySelectorAll('.img-swap').forEach(function (el) {
    var audio = el.querySelector('.img-audio');
    if (!audio) return;
    el.addEventListener('mouseenter', function () {
      audio.currentTime = 0;
      audio.play().catch(function () {});
    });
    el.addEventListener('mouseleave', function () {
      audio.pause();
    });
  });
})();

/* ══ TRAVEL LOG: unmute reel video on hover ══ */
(function () {
  document.querySelectorAll('.reel-card').forEach(function (card) {
    var video = card.querySelector('video');
    if (!video) return;
    card.addEventListener('mouseenter', function () {
      video.muted = false;
    });
    card.addEventListener('mouseleave', function () {
      video.muted = true;
    });
  });
})();

/* ══ HERO LIVE CLOCK ══ */
(function(){
  var el = document.getElementById('heroClock');
  if(!el) return;

  function update(){
    var now = new Date();
    var time = new Intl.DateTimeFormat('en-US', {
      hour:'numeric', minute:'2-digit', hour12:true,
      timeZone:'Europe/Berlin'
    }).format(now).toLowerCase();
    var zone = 'cet';
    try {
      var part = new Intl.DateTimeFormat('en-GB', { timeZone:'Europe/Berlin', timeZoneName:'short' })
        .formatToParts(now).find(function(p){ return p.type === 'timeZoneName'; });
      if (part && /^CES?T$/.test(part.value)) zone = part.value.toLowerCase();
    } catch(e) {}
    el.textContent = 'germany · ' + time + ' ' + zone;
  }
  update();
  setInterval(update, 30000);
})();

/* ══ EXPERIENCE: list / timeline toggle ══ */
(function(){
  var section = document.getElementById('experienceSection');
  if(!section) return;

  var toggleBtns = Array.prototype.slice.call(section.querySelectorAll('.exp-toggle-btn'));
  var listView = document.getElementById('expList');
  var timelineView = document.getElementById('expTimeline');

  toggleBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      toggleBtns.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var view = btn.dataset.view;
      listView.hidden = view !== 'list';
      timelineView.hidden = view !== 'timeline';
    });
  });

  /* Expand/collapse rows — opening one closes whichever was open before.
     At the 480px breakpoint every row opens its details in a bottom sheet
     on click, but the current row also stays permanently expanded inline
     (its "expanded" class is never removed in the mobile branch). */
  var expRows = Array.prototype.slice.call(section.querySelectorAll('.exp-row'));
  var mobileQuery = window.matchMedia('(max-width:480px)');

  var sheet = document.getElementById('expSheet');
  var sheetBackdrop = document.getElementById('expSheetBackdrop');
  var sheetRole = document.getElementById('expSheetRole');
  var sheetCompany = document.getElementById('expSheetCompany');
  var sheetDate = document.getElementById('expSheetDate');
  var sheetBody = document.getElementById('expSheetBody');

  function openSheet(row){
    var role = row.querySelector('.exp-role');
    var company = row.querySelector('.exp-company');
    var date = row.querySelector('.exp-date');
    var details = row.querySelector('.exp-row-details');
    sheetRole.textContent = role ? role.textContent : '';
    sheetCompany.textContent = company ? company.textContent : '';
    sheetDate.textContent = date ? date.textContent : '';
    sheetBody.innerHTML = details ? details.innerHTML : '';
    sheet.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeSheet(){
    sheet.classList.remove('open');
    document.body.style.overflow = '';
  }
  if(sheet){
    sheetBackdrop.addEventListener('click', closeSheet);
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') closeSheet();
    });
  }

  expRows.forEach(function(row){
    row.addEventListener('click', function(){
      if(sheet && mobileQuery.matches){
        openSheet(row);
        return;
      }
      var wasExpanded = row.classList.contains('expanded');
      expRows.forEach(function(r){ r.classList.remove('expanded'); });
      if(!wasExpanded) row.classList.add('expanded');
    });
  });

  /* Timeline drag-scroll */
  var scrollEl = document.getElementById('expTimelineScroll');
  if(scrollEl){
    var dragging = false, startX = 0, startScroll = 0;

    scrollEl.addEventListener('pointerdown', function(e){
      dragging = true;
      startX = e.clientX;
      startScroll = scrollEl.scrollLeft;
      scrollEl.classList.add('dragging');
      scrollEl.setPointerCapture(e.pointerId);
    });
    scrollEl.addEventListener('pointermove', function(e){
      if(!dragging) return;
      scrollEl.scrollLeft = startScroll - (e.clientX - startX);
    });
    function endTimelineDrag(){
      dragging = false;
      scrollEl.classList.remove('dragging');
    }
    scrollEl.addEventListener('pointerup', endTimelineDrag);
    scrollEl.addEventListener('pointercancel', endTimelineDrag);
  }
})();

/* ══ OFF SCREEN: auto-scrolling + draggable travel polaroids ══ */
(function(){
  var wrap = document.getElementById('travelScroll');
  var track = document.getElementById('travelTrack');
  if(!wrap || !track) return;

  var currentX = 0;
  var targetX = 0;
  var isDragging = false;
  var dragStartX = 0;
  var dragStartOffset = 0;
  var speed = -0.4;

  /* Cache scrollWidth instead of reading it every animation frame —
     reading it inside the loop forces a synchronous layout recalc on
     every frame (~60x/sec), which is especially costly while the
     polaroid images are still loading/decoding and shifting layout. */
  var maxX = 0;
  function recalcMax(){ maxX = -(track.scrollWidth / 2); }
  recalcMax();
  window.addEventListener('resize', recalcMax);
  Array.prototype.slice.call(track.querySelectorAll('img')).forEach(function(img){
    if(!img.complete) img.addEventListener('load', recalcMax, { once:true });
  });

  function loop(){
    if(!isDragging){
      targetX += speed;
      if(targetX < maxX) targetX = 0;
    }
    currentX += (targetX - currentX) * 0.08;
    track.style.transform = 'translateX(' + currentX + 'px)';
    requestAnimationFrame(loop);
  }
  loop();

  wrap.addEventListener('pointerdown', function(e){
    isDragging = true;
    dragStartX = e.clientX;
    dragStartOffset = targetX;
    wrap.classList.add('dragging');
    wrap.setPointerCapture(e.pointerId);
  });
  wrap.addEventListener('pointermove', function(e){
    if(!isDragging) return;
    targetX = Math.min(0, dragStartOffset + (e.clientX - dragStartX));
  });
  function endTravelDrag(){
    isDragging = false;
    wrap.classList.remove('dragging');
  }
  wrap.addEventListener('pointerup', endTravelDrag);
  wrap.addEventListener('pointercancel', endTravelDrag);

  /* pause on hover */
  wrap.addEventListener('mouseenter', function(){ if(!isDragging) targetX = currentX; });
})();

/* ══ TESTIMONIALS AUTO SCROLL ══ */
(function(){
  const wrap = document.getElementById('testTicker');
  const track = document.getElementById('testTrack');
  if(!wrap || !track) return;

  let currentX = 0;
  let targetX = 0;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartOffset = 0;
  const speed = -0.6;

  /* Cache scrollWidth instead of reading it every animation frame — see
     the travel carousel above for why. */
  let maxX = 0;
  function recalcMax(){ maxX = -(track.scrollWidth / 2); }
  recalcMax();
  window.addEventListener('resize', recalcMax);
  Array.prototype.slice.call(track.querySelectorAll('img')).forEach(function(img){
    if(!img.complete) img.addEventListener('load', recalcMax, { once:true });
  });

  function loop(){
    if(!isDragging){
      targetX += speed;
      if(targetX < maxX) targetX = 0;
    }
    currentX += (targetX - currentX) * 0.06;
    track.style.transform = `translateX(${currentX}px)`;
    requestAnimationFrame(loop);
  }
  loop();

  wrap.addEventListener('mousedown', function(e){
    isDragging = true;
    dragStartX = e.pageX;
    dragStartOffset = targetX;
    wrap.style.cursor = 'grabbing';
  });
  window.addEventListener('mouseup', function(){
    isDragging = false;
    wrap.style.cursor = 'grab';
  });
  window.addEventListener('mousemove', function(e){
    if(!isDragging) return;
    const walk = (e.pageX - dragStartX) * 1.5;
    targetX = Math.min(0, dragStartOffset + walk);
  });

  /* pause on hover */
  wrap.addEventListener('mouseenter', function(){ if(!isDragging) targetX = currentX; });
})();

/* ══ TESTIMONIAL OVERLAY: click a card to read the full quote ══ */
(function(){
  const overlay = document.getElementById('testOverlay');
  const closeBtn = document.getElementById('testOverlayClose');
  const overlayPhoto = document.getElementById('testOverlayPhoto');
  const overlayName = document.getElementById('testOverlayName');
  const overlayRole = document.getElementById('testOverlayRole');
  const overlayQuote = document.getElementById('testOverlayQuote');
  if(!overlay) return;

  function openOverlay(card){
    const photo = card.querySelector('.sb-test-photo');
    const name = card.querySelector('.sb-test-name');
    const role = card.querySelector('.sb-test-role');
    const quote = card.querySelector('.sb-test-quote p');
    if(photo){ overlayPhoto.src = photo.src; overlayPhoto.alt = photo.alt; }
    if(name) overlayName.textContent = name.textContent;
    if(role) overlayRole.textContent = role.textContent;
    if(quote) overlayQuote.textContent = quote.textContent;
    overlay.classList.add('visible');
  }
  function closeOverlay(){
    overlay.classList.remove('visible');
  }

  /* Distinguish a click from a ticker drag by movement distance,
     and flag cards whose quote is actually clamped so the "view more"
     hint only shows up where there's more to read. */
  document.querySelectorAll('.sb-test-card').forEach(function(card){
    let startX = 0, startY = 0;
    card.addEventListener('pointerdown', function(e){
      startX = e.clientX;
      startY = e.clientY;
    });
    card.addEventListener('pointerup', function(e){
      const moved = Math.abs(e.clientX - startX) + Math.abs(e.clientY - startY);
      if(moved < 6) openOverlay(card);
    });

    const quoteEl = card.querySelector('.sb-test-quote');
    const quoteP = quoteEl ? quoteEl.querySelector('p') : null;
    if(quoteP && quoteP.scrollHeight > quoteP.clientHeight + 1){
      card.classList.add('has-more');
      const hint = document.createElement('span');
      hint.className = 'sb-test-more';
      hint.innerHTML = 'view more <svg width="22" height="14" viewBox="0 0 30 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 2 Q14 4 20 14"/><path d="M13 12 L20 14 L19 7"/></svg>';
      quoteEl.appendChild(hint);
    }
  });

  if(closeBtn) closeBtn.addEventListener('click', closeOverlay);
  overlay.addEventListener('click', function(e){
    if(e.target === overlay) closeOverlay();
  });
  window.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeOverlay();
  });
})();

/* ══ NDA PROJECT OVERLAY: intercept click on NDA-protected project cards ══ */
(function(){
  const overlay = document.getElementById('ndaOverlay');
  const closeBtn = document.getElementById('ndaOverlayClose');
  if(!overlay) return;

  function openOverlay(){ overlay.classList.add('visible'); }
  function closeOverlay(){ overlay.classList.remove('visible'); }

  document.querySelectorAll('.project-card[data-nda]').forEach(function(card){
    card.addEventListener('click', function(e){
      e.preventDefault();
      openOverlay();
    });
  });

  if(closeBtn) closeBtn.addEventListener('click', closeOverlay);
  overlay.addEventListener('click', function(e){
    if(e.target === overlay) closeOverlay();
  });
  window.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeOverlay();
  });
})();


/* ══ GALLERY ══ */
(function(){

  /* ══ CANVAS PAN ══ */
  const canvas = document.getElementById('pgCanvas');
  const world  = document.getElementById('pgWorld');
  if(!canvas || !world) return;
  let panX = -800, panY = -300;
  let isPanning = false;
  let panStartX, panStartY;

  // start centered
  world.style.transform = `translate(${panX}px,${panY}px)`;

  canvas.addEventListener('mousedown', function(e){
    if(e.target.closest('.pg-item')) return; // don't pan when dragging item
    isPanning = true;
    panStartX = e.clientX - panX;
    panStartY = e.clientY - panY;
    canvas.style.cursor = 'grabbing';
  });
  window.addEventListener('mouseup', function(){
    isPanning = false;
    canvas.style.cursor = 'grab';
  });
  window.addEventListener('mousemove', function(e){
    if(!isPanning) return;
    panX = e.clientX - panStartX;
    panY = e.clientY - panStartY;
    world.style.transform = `translate(${panX}px,${panY}px)`;
  });

  /* touch pan */
  let touchPanStart = null;
  canvas.addEventListener('touchstart', function(e){
    if(e.target.closest('.pg-item')) return;
    const t = e.touches[0];
    touchPanStart = { x: t.clientX - panX, y: t.clientY - panY };
  },{passive:true});
  canvas.addEventListener('touchmove', function(e){
    if(!touchPanStart) return;
    const t = e.touches[0];
    panX = t.clientX - touchPanStart.x;
    panY = t.clientY - touchPanStart.y;
    world.style.transform = `translate(${panX}px,${panY}px)`;
  },{passive:true});
  canvas.addEventListener('touchend', function(){ touchPanStart = null });

  /* ══ ITEM DRAG ══ */
  document.querySelectorAll('.pg-item').forEach(function(item){
    let dragging = false;
    let startX, startY, origLeft, origTop;

    item.addEventListener('mousedown', function(e){
      e.stopPropagation();
      dragging = true;
      startX = e.clientX;
      startY = e.clientY;
      origLeft = parseInt(item.style.left) || 0;
      origTop  = parseInt(item.style.top)  || 0;
      item.style.zIndex = 500;
      item.style.transition = 'none';
    });
    window.addEventListener('mouseup', function(){
      if(!dragging) return;
      dragging = false;
      item.style.zIndex = '';
      item.style.transition = '';
    });
    window.addEventListener('mousemove', function(e){
      if(!dragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      item.style.left = (origLeft + dx) + 'px';
      item.style.top  = (origTop  + dy) + 'px';
    });
  });

  /* ══ NAV EMAIL COPY ══ */
  const navEmail = document.getElementById('navEmailBtn');
  if(navEmail){
    navEmail.addEventListener('click', function(e){
      e.preventDefault();
      navigator.clipboard.writeText('salman.ashraff20@gmail.com').then(()=>{
        const tip = document.createElement('div');
        tip.textContent = '✓ Copied!';
        tip.style.cssText = 'position:fixed;top:72px;left:50%;transform:translateX(-50%);background:#111;color:#fff;font-size:12px;font-weight:600;padding:6px 16px;border-radius:999px;z-index:9999;font-family:sans-serif;pointer-events:none;';
        document.body.appendChild(tip);
        setTimeout(()=> tip.remove(), 2000);
      });
    });
  }

})();

/* ══ SITE FOOTER: click-to-copy email ══ */
(function(){
  const btn = document.getElementById('footerEmailCopy');
  if(!btn) return;
  btn.addEventListener('click', function(e){
    e.preventDefault();
    navigator.clipboard.writeText('salman.ashraff20@gmail.com').then(()=>{
      const rect = btn.getBoundingClientRect();
      const tip = document.createElement('div');
      tip.textContent = '✓ Copied!';
      tip.style.cssText = 'position:fixed;left:'+(rect.left+rect.width/2)+'px;top:'+rect.top+'px;transform:translate(-50%,-100%) translateY(-8px);background:#111;color:#fff;font-size:12px;font-weight:600;padding:6px 16px;border-radius:999px;z-index:9999;font-family:sans-serif;pointer-events:none;white-space:nowrap;';
      document.body.appendChild(tip);
      setTimeout(()=> tip.remove(), 2000);
    });
  });
})();

/* ══ SITE FOOTER: cycling headline word ══ */
(function(){
  const el = document.getElementById('footerCyclingWord');
  if(!el) return;

  const words = ['concept','idea','vision','dream'];
  let i = 0;

  setInterval(function(){
    el.classList.add('fading');
    setTimeout(function(){
      i = (i + 1) % words.length;
      el.textContent = words[i];
      el.classList.remove('fading');
    }, 300);
  }, 2600);
})();

/* ══ SITE FOOTER: eyes follow the cursor ══ */
(function(){
  const pupils = document.querySelectorAll('.eye .pupil');
  if (!pupils.length) return;

  document.addEventListener('mousemove', function(e){
    pupils.forEach(function(pupil){
      const rect = pupil.ownerSVGElement.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height * 0.55;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.min(14, Math.hypot(dx, dy) / 12);
      const angle = Math.atan2(dy, dx);
      pupil.setAttribute('transform', 'translate(' + (Math.cos(angle) * dist) + ',' + (Math.sin(angle) * dist) + ')');
    });
  });

  // On touch devices there's no cursor — give the eyes a lazy idle wander instead
  if (window.matchMedia('(hover: none)').matches) {
    let t = 0;
    setInterval(function(){
      t += 0.05;
      pupils.forEach(function(pupil, i){
        const x = Math.cos(t + i) * 8;
        const y = Math.sin(t * 0.7 + i) * 6;
        pupil.setAttribute('transform', 'translate(' + x + ',' + y + ')');
      });
    }, 50);
  }
})();

/* ══ SITE FOOTER: live local time ══ */
(function(){
  const el = document.getElementById('footerLocalTime');
  if(!el) return;

  function update(){
    el.textContent = 'local time: ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }
  update();
  setInterval(update, 1000);
})();

/* ══ LINKS PAGE: click-to-copy email ══ */
(function(){
  var link = document.getElementById('linksEmailCopy');
  var arrow = document.getElementById('linksEmailArrow');
  if(!link || !arrow) return;

  var EMAIL = 'salman.ashraff20@gmail.com';
  var defaultArrow = arrow.innerHTML;

  link.addEventListener('click', function(e){
    e.preventDefault();
    navigator.clipboard.writeText(EMAIL).then(function(){
      arrow.textContent = 'copied';
      setTimeout(function(){
        arrow.innerHTML = defaultArrow;
      }, 2000);
    });
  });
})();

/* ══ BRAND FOOTER EMAIL COPY  ══ */
(function(){
  const btn = document.querySelector('.bf-email');
  const tooltip = document.getElementById('navCopyTooltip');
  if(!btn) return;
  let timer;
  btn.addEventListener('click', function(e){
    e.preventDefault();
    navigator.clipboard.writeText('salman.ashraff20@gmail.com').then(()=>{
      if(tooltip){ tooltip.classList.add('show'); clearTimeout(timer); timer=setTimeout(()=>tooltip.classList.remove('show'),2000); }
    });
  });
})();

/* ══ LINKS HERO PROFILE CARD  ══ */
(function(){
  var scene = document.querySelector(".profile-card .scene");
  var clip = document.querySelector(".profile-card .clip");
  if (!scene || !clip) return;

  clip.setAttribute("role", "button");
  clip.setAttribute("tabindex", "0");
  clip.setAttribute("aria-label", "Show photos");

  function toggleFan(){
    scene.classList.toggle("open");
  }

  clip.addEventListener("click", toggleFan);
  clip.addEventListener("keydown", function(e){
    if (e.key === "Enter" || e.key === " "){
      e.preventDefault();
      toggleFan();
    }
  });

  // ---------- Photo lightbox: click any profile-card photo to pop it out ----------
  var lightbox = document.getElementById("photoLightbox");
  var lightboxImg = document.getElementById("photoLightboxImg");
  var lightboxClose = document.getElementById("photoLightboxClose");
  if (!lightbox || !lightboxImg || !lightboxClose) return;

  var photos = document.querySelectorAll(".profile-card .photo, .profile-card .fan-card img");
  photos.forEach(function(img){
    img.addEventListener("click", function(e){
      e.stopPropagation();
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || "";
      lightbox.classList.add("open");
    });
  });

  function closeLightbox(){
    lightbox.classList.remove("open");
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function(e){
    if (e.target === lightbox) closeLightbox();
  });
  window.addEventListener("keydown", function(e){
    if (e.key === "Escape") closeLightbox();
  });
})();

/* ══ SCROLL TO TOP BUTTON ══ */
(function(){
  var btn = document.getElementById('scrollTopBtn');
  if (!btn) return;

  function onScroll(){
    btn.classList.toggle('visible', window.scrollY > window.innerHeight / 2);
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  btn.addEventListener('click', function(){
    window.scrollTo({ top:0, behavior:'smooth' });
  });
})();
