/* ══ PROJECT DETAIL MODAL ══
   Each project card with data-project="<id>" opens its case study in a modal.
   Content lives in PROJECTS below; images live in /projects. */
(function(){
  'use strict';

  var IMG = 'projects/';

  /* ── helpers that return HTML strings ── */
  function fig(src, alt, caption){
    return '<figure class="pm-fig"><button type="button" data-zoom="' + IMG + src + '" aria-label="Enlarge image: ' + alt + '">' +
      '<img src="' + IMG + src + '" alt="' + alt + '" loading="lazy" decoding="async"></button>' +
      (caption ? '<figcaption>' + caption + '</figcaption>' : '') + '</figure>';
  }
  function grid(cols, items, extra){
    return '<div class="pm-grid ' + cols + (extra ? ' ' + extra : '') + '">' + items.join('') + '</div>';
  }
  function section(title, text, inner){
    return '<section class="pm-section"><h3 class="pm-h2">' + title + '</h3>' +
      (text ? '<p class="pm-text">' + text + '</p>' : '') + (inner || '') + '</section>';
  }
  function list(items, cols){
    return '<ul class="pm-list' + (cols ? ' ' + cols : '') + '">' + items.map(function(i){ return '<li>' + i + '</li>'; }).join('') + '</ul>';
  }
  function cards(cols, items){
    return '<div class="pm-cards ' + cols + '">' + items.map(function(c){
      return '<div class="pm-card">' + (c.img ? '<img src="' + IMG + c.img + '" alt="" loading="lazy">' : '') +
        (c.tag ? '<span class="tag">' + c.tag + '</span>' : '') +
        (c.title ? '<h4>' + c.title + '</h4>' : '') + '<p>' + c.text + '</p></div>';
    }).join('') + '</div>';
  }
  function pair(title, before, after){
    return '<div class="pm-pair-row"><p class="pm-text">' + title + '</p><div class="pm-pair">' +
      fig(before[0], before[1]) + fig(after[0], after[1]) + '</div></div>';
  }

  /* ── project content (kept consistent with CV and portfolio) ── */
  var PROJECTS = {
    muq: {
      num: '03',
      eyebrow: 'IoT · Mobile app',
      title: 'muq.: Portable Smart Coffee Brewing App',
      lede: 'A companion Android app for a Bluetooth smart mug. I designed the app within the muq. brand system, from wireframes to final UI, as part of a student team supporting the muq. founders.',
      meta: [
        ['Role', 'App designer'],
        ['Context', 'University collaboration with the muq. founders, Saarbrücken'],
        ['Timeline', 'Apr – Jun 2026'],
        ['Tools', 'Figma, Figma MCP, Claude Code, Android, BLE']
      ],
      hero: ['muq_render.jpg', 'Render of the muq. smart mug', '<b>The muq. device.</b> A portable coffee system with a temperature sensor and heating element, controlled over Bluetooth from the app. Product and render by the muq. founders.'],
      story: [
        ['Problem', 'Coffee goes cold before you finish it, and existing heated mugs are either expensive or don’t connect to the phone people already carry.'],
        ['What I did', 'In a 4-person student team, I designed the companion Android app from wireframes to final UI, and used Figma MCP + Claude Code to speed up handoff into the Android build.'],
        ['Result', 'A working prototype (mug, firmware and app) that the team tested for sensing accuracy and BLE stability and presented live to an audience.']
      ],
      impact: [['4', 'team members across hardware, software and design'], ['5', 'core app screens designed end-to-end'], ['1', 'working prototype presented live']],
      sections: function(){
        return section('How we got there', 'We started broad, including a deliberate “worst idea” round, then tested form and grip with a rough physical prototype before designing the app.',
            grid('c3', [
              fig('muq_brainstorm.jpg', 'Brainstorm board', '<b>Ideation.</b> Brainstorm board, including a “worst idea” round.'),
              fig('muq_lofi.jpg', 'Low-fidelity physical prototype', '<b>Lo-fi prototype</b> to test form and grip.'),
              fig('muq_team.jpg', 'Team at the final presentation', '<b>Final presentation</b> with the founders and student team.')
            ])) +
          section('Wireframes', 'Five screens cover the full flow: welcome, pairing, setting the temperature, heating and ready.',
            grid('c5', [
              fig('muq_wf_splash.jpg', 'Welcome wireframe', '1 · Welcome'),
              fig('muq_wf_scan.jpg', 'Pair device wireframe', '2 · Pair device'),
              fig('muq_wf_control.jpg', 'Set temperature wireframe', '3 · Set temperature'),
              fig('muq_wf_heating.jpg', 'Heating wireframe', '4 · Heating'),
              fig('muq_wf_ready.jpg', 'Ready wireframe', '5 · Ready')
            ], 'phones')) +
          section('Final UI', 'A dark, warm palette from muq.’s brand system, with gold for values and green reserved for success states.',
            grid('c5', [
              fig('muq_ui_splash.jpg', 'Welcome screen', 'Welcome'),
              fig('muq_ui_scan.jpg', 'Pair device screen', 'Pair device'),
              fig('muq_ui_control.jpg', 'Set temperature screen', 'Set temperature'),
              fig('muq_ui_heating.jpg', 'Heating screen showing the 92° target', 'Heating'),
              fig('muq_ui_ready.jpg', 'Coffee ready screen', 'Ready')
            ], 'phones')) +
          section('Key design decisions', '', list([
            '<b>The number that matters is the biggest thing on screen:</b> temperature is set at hero size so it reads at arm’s length.',
            '<b>Status is always visible:</b> a connection pill, the heating element’s state and a progress ring show what the device is doing.',
            '<b>One primary action per screen:</b> Start Heating, then Stop Heating in red as the only destructive action.',
            '<b>Pairing made obvious:</b> signal strength shown per device, with Connect offered only for a muq. device that’s ready.',
            '<b>A clear finish:</b> the Ready screen confirms the target was reached and shows target and measured temperature side by side.'
          ], 'c2'));
      }
    },

    sumato: {
      num: '01',
      eyebrow: 'Enterprise SaaS',
      title: 'Sumato ERP: POS Module & Platform UX',
      live: ['https://sumatoerp.com/', 'Visit Sumato ERP'],
      lede: 'Sole UX/UI designer on a live, data-heavy ERP platform used by non-technical staff. I designed a new point-of-sale module from scratch and made the core modules consistent and easier to use.',
      meta: [
        ['Role', 'Sole UX/UI designer'],
        ['Company', 'Sumato Solutions, Lahore'],
        ['Timeline', 'Jun 2024 – May 2025'],
        ['Tools', 'Figma, Azure DevOps']
      ],
      hero: ['pos.jpg', 'Point of Sale screen', '<b>Point of Sale.</b> Category tabs with item counts, availability on every item, and a persistent order summary that ends in one primary action. Data shown is mock data.'],
      story: [
        ['Problem', 'A live ERP platform that was hard to read and risky to use: dashboards repeated the same tables, numbers had no context, list views made deleting records too easy, and there was no point-of-sale module for retail clients.'],
        ['What I did', 'Designed the POS module end-to-end and improved usability across core modules, working within the existing front-end so changes stayed safe to ship.'],
        ['Result', 'The POS module is now live across 10+ client deployments, and core modules share one consistent set of interaction patterns.']
      ],
      impact: [['10+', 'client deployments of the new POS module'], ['5', 'core ERP modules redesigned for non-technical users'], ['Sole', 'UX/UI designer, working closely with developers']],
      sections: function(){
        return section('Before and after', 'How two core screens looked before I joined, and after the redesign.',
            '<div class="pm-pair-head"><span>Before</span><span>After</span></div><div style="height:16px"></div>' +
            pair('<b>Sales dashboard.</b> Three tables repeated the same rows, and every KPI card looked the same with no sense of change. The redesign leads with four KPIs, each with a 30-day trend and % change, adds a date range, and keeps one table for top products.', ['sumato_before_dashboard.jpg', 'Old sales dashboard'], ['dashboard.jpg', 'Redesigned sales overview']) +
            pair('<b>Customers list.</b> Every row was pre-selected, with a red Delete button in the toolbar and a delete icon on every row, so one wrong click could remove records. The redesign starts with nothing selected and moves delete behind a confirmation dialog.', ['sumato_before_customers.jpg', 'Old customers list'], ['cust_table.jpg', 'Redesigned customers list'])) +
          section('Built for speed at the counter', '', list([
            '<b>Large tap targets and one-tap “Add to Cart”,</b> with the quantity shown on the button once an item is in the order.',
            '<b>Errors prevented, not reported:</b> unavailable items are greyed out and can’t be added.',
            '<b>Order always visible:</b> items, sizes and notes stay on screen with inline edit and remove.',
            '<b>One clear finish:</b> dine-in/take-away and discounts are toggles, and checkout is a single green action.'
          ], 'c2')) +
          section('Sales overview', 'Summary before detail, so managers see the state of the business at a glance.',
            fig('dashboard.jpg', 'Sales overview dashboard', '<b>Sales Overview.</b> KPI cards with 30-day trends, followed by charts for detail.')) +
          section('Customers module: one pattern for every action', 'Every record action (add, edit, filter, import and delete) uses the same modal and side-panel patterns, with the same button order and placement. Users learn one flow and reuse it across every ERP module.',
            fig('cust_table.jpg', 'Customers list view', '<b>List view.</b> Search, print, export and filters grouped above the table, with pagination and page size below.') +
            '<div style="height:20px"></div>' +
            grid('c2', [
              fig('cust_edit.jpg', 'Add or edit customer form', '<b>Add / Edit.</b> One shared three-column form for both actions.'),
              fig('cust_filter.jpg', 'Filter side panel', '<b>Filter.</b> A side panel keeps the table in view while filtering.'),
              fig('cust_import.jpg', 'Import customers dialog', '<b>Import.</b> Drag-and-drop CSV upload with size limit and file preview.'),
              fig('cust_delete.jpg', 'Delete confirmation dialog', '<b>Delete.</b> Destructive actions ask for confirmation in red.')
            ]));
      }
    },

    ar: {
      num: '02',
      eyebrow: 'AR interaction design · User research',
      title: 'ARound the Market: AR Guide for Christmas Markets',
      lede: 'An AR-glasses concept that helps first-time visitors find stalls, avoid crowds and read German menus, hands-free. I designed the entire UI; the team shared the research, personas, storyboards and study.',
      meta: [
        ['Role', 'UI design (lo-fi to hi-fi), shared research'],
        ['Context', 'HCI course project, Saarland University'],
        ['Timeline', 'Oct 2025 – Feb 2026'],
        ['Team', '3 students · Figma']
      ],
      hero: ['ar_hi_ar.jpg', 'AR navigation view with a glowing path', '<b>AR navigation.</b> A glowing path on the ground, with distance and crowd density for the target stall.'],
      story: [
        ['Problem', 'First-time visitors at crowded Christmas markets can’t find the stall they want, can’t tell good stalls from bad ones, and often can’t read German menus.'],
        ['My role', 'I designed the entire UI, from lo-fi sketches to the hi-fi Figma prototype, for voice search, gaze-selected navigation and menu translation.'],
        ['Evaluation', 'A Wizard-of-Oz usability study with think-aloud, interviews and NASA-TLX. All 4 participants completed the task, and the study pinpointed one clear problem: starting navigation.']
      ],
      impact: [['5', 'market visitors interviewed during research'], ['3', 'personas built from the research'], ['4 / 4', 'usability participants completed the full task']],
      sections: function(){
        return section('Research: field observation and 5 visitor interviews', 'We observed visitors at the Saarbrücken Christmas market and interviewed 5 visitors aged 19–45 (German, Italian, French, Indian), from low to high comfort with digital tools.',
            cards('c3', [
              {tag: '5 of 5', title: 'Navigation is stressful', text: 'Stalls look alike and the layout has no logic, so visitors navigate by landmarks such as the tree or the Ferris wheel.'},
              {tag: 'Hands are full', title: 'It has to be hands-free', text: 'Cold, gloves, and food or drinks in hand make phones impractical.'},
              {tag: 'Crowds & language', title: 'Queues and menus slow people down', text: 'Three of 5 would wait 10–15 minutes at most, 2 skip busy stalls, and German-only menus slow down newcomers.'}
            ])) +
          section('Personas', 'These led to the must-have requirements: hands-free interaction, stall-level navigation, crowd information and translation.',
            cards('c3', [
              {img: 'ar_p_vera.jpg', title: 'Vera, 23', tag: 'Local visitor', text: '“Spending time with my family is the best part, but it gets stressful when the crowd is too much.”'},
              {img: 'ar_p_mark.jpg', title: 'Mark, 24', tag: 'Tech-savvy navigator', text: '“I want to try everything without wasting half the evening standing in lines.”'},
              {img: 'ar_p_keith.jpg', title: 'Keith, 22', tag: 'International visitor', text: '“Everything is new to me — beautiful, but a bit disorienting.”'}
            ])) +
          section('Storyboard: finding a stall with AR navigation', 'We storyboarded alternative interaction concepts for each task (e.g. selecting by gaze and blinking vs. voice commands) before choosing what to prototype.',
            grid('c5', [
              fig('ar_sb1.jpg', 'Storyboard panel 1', '1 · Can’t work out where to go.'),
              fig('ar_sb2.jpg', 'Storyboard panel 2', '2 · Puts on the AR glasses.'),
              fig('ar_sb3.jpg', 'Storyboard panel 3', '3 · Says “open navigation”.'),
              fig('ar_sb4.jpg', 'Storyboard panel 4', '4 · Asks for a stall; a path appears.'),
              fig('ar_sb5.jpg', 'Storyboard panel 5', '5 · Follows the path to the stall.')
            ])) +
          section('From sketch to hi-fi prototype', '',
            '<div class="pm-pair-head"><span>Lo-fi</span><span>Hi-fi</span></div><div style="height:16px"></div>' +
            pair('<b>Main menu.</b> Three large targets, each labelled with its input mode (voice or gaze).', ['ar_lo_menu.jpg', 'Lo-fi main menu'], ['ar_hi_menu.jpg', 'Hi-fi main menu']) +
            pair('<b>Voice search.</b> Speak an item name, or narrow results with category chips.', ['ar_lo_search.jpg', 'Lo-fi voice search'], ['ar_hi_search.jpg', 'Hi-fi voice search']) +
            pair('<b>AR navigation.</b> A path on the ground with distance and crowd density.', ['ar_lo_ar.jpg', 'Lo-fi AR navigation'], ['ar_hi_ar.jpg', 'Hi-fi AR navigation'])) +
          section('More of the hi-fi flow', '',
            grid('c3', [
              fig('ar_hi_results.jpg', 'Search results', '<b>Search results</b> with ratings, plus “More Info” or “Navigate” on each stall.'),
              fig('ar_hi_info.jpg', 'Stall details overlay', '<b>Stall details</b> in an overlay, without leaving the list.'),
              fig('ar_hi_map.jpg', 'Market map', '<b>Market map</b> with “You are here”, toilets and stall categories.')
            ])) +
          section('Usability study · January 2026', 'Wizard-of-Oz: voice and gaze input were simulated by clicking the hi-fi Figma prototype. Task: find a hot-chocolate stall by voice, check its info, navigate to it, translate the menu, then find yourself on the map. 4 international students, ~45 min per session, with informed consent and pseudonymised data.',
            '<h4 class="pm-h3" style="margin-top:8px">NASA-TLX workload (mean, scale 0–20)</h4><div class="pm-bars">' +
            [['Effort', 9.25], ['Mental demand', 7.5], ['Frustration', 7.25], ['Temporal demand', 6.75], ['Performance*', 4.5], ['Physical demand', 3.25]].map(function(r){
              return '<div class="pm-bar-row"><span>' + r[0] + '</span><div class="pm-bar-track"><div class="pm-bar-fill" style="width:' + (r[1] / 20 * 100) + '%"></div></div><b>' + r[1] + '</b></div>';
            }).join('') + '</div><p class="pm-note">*For Performance, lower means more successful. n = 4. Overall workload was moderate: effort was highest, physical demand was low.</p>') +
          section('Key findings', '',
            cards('c4', [
              {tag: 'Main issue · 4 of 4', title: 'Starting navigation was unclear', text: 'All participants hesitated over how to begin. Two paused once the AR path appeared, unsure that they should start walking.'},
              {tag: 'Worked · 4 of 4', title: 'Voice search felt efficient', text: 'Three of 4 asked for more filters.'},
              {tag: 'Worked, with a caveat', title: 'Translation was clear', text: 'Slightly cluttered for one user. All 4 wanted audio translation to reduce visual load.'},
              {tag: 'Smaller issue', title: 'Search vs. Navigation', text: 'One user hesitated between “Search” and “Navigation” on the main menu.'}
            ])) +
          section('What the next iteration changes', '', list([
            '<b>Explicit “start” cue:</b> a clear prompt and directional arrows when the path appears.',
            '<b>Audio feedback:</b> spoken directions and optional audio translation.',
            '<b>Clearer entry points:</b> rename and explain Search vs. Navigation, plus a short onboarding.',
            '<b>Bookmarks & filters:</b> save stalls to revisit and filter results further.'
          ], 'c2'));
      }
    },

    eden: {
      num: '05',
      eyebrow: 'IoT · Dashboard UI · Evaluation',
      title: 'EDEN: A Smart Dual-Zone Terrarium',
      live: ['https://eden-terrarium.vercel.app/', 'Try the live demo'],
      lede: 'An autonomous terrarium that monitors and cares for two plant zones with different needs, and tells its owner how the plants are doing at a glance.',
      meta: [
        ['Role', 'Dashboard UI design, evaluation lead, documentation and demo'],
        ['Team', '5 students'],
        ['Hardware', 'ESP32-S3, ESP32 touchscreen, sensors, pumps, fan, grow light'],
        ['Interfaces', 'Web dashboard + on-device touchscreen']
      ],
      hero: ['eden_demo.jpg', 'EDEN prototype next to a laptop showing the live dashboard', '<b>The working prototype</b> with the live web dashboard: temperature, humidity and light trends, plus the plant mood score.'],
      story: [
        ['Problem', 'Houseplant owners struggle to keep plants alive because sensors only notify, and they assume one ideal climate for every plant.'],
        ['What EDEN does', 'It reads temperature, humidity, light and soil moisture, then drives pumps, a fan and a grow light per zone, with alerts and manual override.'],
        ['My part', 'I designed the dashboard UI, led the evaluation, and produced the documentation and demo.']
      ],
      impact: [['4.1/5', 'trust rating for sensing and status feedback'], ['6/6', 'correct soil-classification results in evaluation'], ['Low', 'workload on alert resolution, which shaped dashboard alerts and actions']],
      sections: function(){
        return section('Glanceable status: the mood score', 'Instead of raw numbers alone, each zone gets a mood score from 0 to 100, so the owner knows in one look whether to act.',
            cards('c4', [
              {tag: '76–100', title: 'Happy', text: 'Everything is within range.'},
              {tag: '51–75', title: 'Okay', text: 'Something is drifting; worth a look.'},
              {tag: '26–50', title: 'Struggling', text: 'The plant needs attention soon.'},
              {tag: '0–25', title: 'Dying', text: 'Act now.'}
            ])) +
          section('The dashboard', 'Every part of the web dashboard leads with a plain-language status, then the numbers, then the trend, so the owner knows whether to act before reading any data.',
            grid('c2', [
              fig('eden_dash_home.jpg', 'EDEN dashboard home screen with greeting, health score, humidity, soil moisture and reservoir level', '<b>Home.</b> A greeting and one-line status (“Happy · all parameters within range”), then health score, humidity and soil moisture, with the reservoir level as a single bar.'),
              fig('eden_dash_trends.jpg', 'Trend cards for temperature, humidity and light over the last 30 minutes', '<b>Trends.</b> One card per sensor with the current value, change over the last 30 minutes, and min and max labels so spikes are easy to spot.'),
              fig('eden_dash_zones.jpg', 'Reservoir trend and the two watering zone cards with soil moisture', '<b>Watering zones.</b> Zone A and Zone B side by side, each with soil moisture, a moisture trend and a status.'),
              fig('eden_dash_env.jpg', 'Environment grid showing temperature, air humidity, ambient light and reservoir with status labels', '<b>Environment.</b> Each reading gets a coloured status word (Hot, Optimal, Dark, Filled), and a warning such as “Check temperature” rises to the section header.')
            ])) +
          section('How it works', 'Sensors feed an ESP32-S3 control node that runs watering and ventilation automatically. A second ESP32 with a touchscreen acts as the local display and web gateway for the dashboard, settings and overrides.',
            fig('eden_architecture.jpg', 'EDEN system architecture diagram', '<b>System architecture.</b> Sensor and actuator hub, local Wi-Fi, and the touchscreen display and web gateway.')) +
          section('Demo day', 'The prototype validated all sensors and actuators, closed-loop watering and ventilation, and the live dashboard with mood score.',
            grid('c2', [
              fig('eden_booth.jpg', 'EDEN demo booth', '<b>Demo booth</b> with the terrarium, dashboard and poster.'),
              fig('eden_poster.jpg', 'EDEN project poster', '<b>Project poster.</b> The terrarium render on it is a conceptual visualisation.')
            ]));
      }
    },

    allinone: {
      num: '04',
      eyebrow: 'Website redesign · Client project',
      title: 'All In One Electric: Website Redesign',
      lede: 'A freelance redesign for a family-run electrical contractor in Dallas, TX, built around two clear actions and one consistent quote form.',
      meta: [
        ['Role', 'UI/UX designer'],
        ['Client', 'All In One Electric, Dallas, TX'],
        ['Year', '2025'],
        ['Tools', 'Figma']
      ],
      hero: ['web_after_hero.jpg', 'Redesigned homepage hero', '<b>New homepage.</b> A readable logo, the company’s own slogan as the headline, and a clear call to action.'],
      story: [
        ['Problem', 'The old site made it hard to act: an unreadable logo, six different names for the main action, two quote forms that asked for different things, and trust signals buried at the bottom.'],
        ['What I did', 'Redesigned the Home, About, Services and EV Charging pages. I met with the owners regularly and revised the design after every review.'],
        ['Result', 'A clearer site built around Get a Quote and Schedule an Appointment, with one consistent quote form and new Team and FAQ sections.']
      ],
      impact: [['4', 'pages redesigned: home, about, services, EV charging'], ['6 → 2', 'calls to action'], ['2 → 1', 'quote forms merged into one']],
      sections: function(){
        return section('Before and after', '',
          '<div class="pm-pair-head"><span>Before</span><span>After</span></div><div style="height:16px"></div>' +
          pair('<b>First screen.</b> A readable logo, the slogan as headline, and one clear call to action.', ['web_before_hero.jpg', 'Old homepage hero'], ['web_after_hero.jpg', 'New homepage hero']) +
          pair('<b>Services.</b> Six icon cards in one consistent grid replace three stock photos and dense paragraphs.', ['web_before_services.jpg', 'Old services section'], ['web_after_services.jpg', 'New services section']) +
          pair('<b>Quote form.</b> One form with clear labels and required markers, next to the contact details and service-area map.', ['web_before_form.jpg', 'Old quote form'], ['web_after_form.jpg', 'New quote form']));
      }
    }
  };

  var ORDER = ['sumato', 'ar', 'muq', 'allinone', 'eden'];

  /* ── build the modal shell once ── */
  var modal = document.createElement('div');
  modal.className = 'pm';
  modal.id = 'projectModal';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML =
    '<div class="pm-backdrop" data-close></div>' +
    '<div class="pm-panel" role="dialog" aria-modal="true" aria-labelledby="pmTitle">' +
      '<div class="pm-bar"><span class="pm-bar-num" id="pmBarNum"></span><span class="pm-bar-title" id="pmBarTitle"></span>' +
      '<button type="button" class="pm-btn" data-close aria-label="Close project">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg></button></div>' +
      '<div class="pm-scroll" id="pmScroll"><article class="pm-body" id="pmBody"></article></div>' +
    '</div>';
  document.body.appendChild(modal);

  var zoom = document.createElement('div');
  zoom.className = 'pm-zoom';
  zoom.setAttribute('aria-hidden', 'true');
  zoom.innerHTML = '<button type="button" class="pm-btn" aria-label="Close image">' +
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg></button><img alt="">';
  document.body.appendChild(zoom);
  var zoomImg = zoom.querySelector('img');

  var body = modal.querySelector('#pmBody');
  var scroller = modal.querySelector('#pmScroll');
  var panel = modal.querySelector('.pm-panel');
  var lastFocus = null;
  var current = null;

  function render(id){
    var p = PROJECTS[id];
    var i = ORDER.indexOf(id);
    var prev = PROJECTS[ORDER[(i - 1 + ORDER.length) % ORDER.length]];
    var next = PROJECTS[ORDER[(i + 1) % ORDER.length]];
    var prevId = ORDER[(i - 1 + ORDER.length) % ORDER.length];
    var nextId = ORDER[(i + 1) % ORDER.length];

    modal.querySelector('#pmBarNum').textContent = p.num;
    modal.querySelector('#pmBarTitle').textContent = p.title;

    body.innerHTML =
      '<p class="pm-eyebrow">' + p.eyebrow + '</p>' +
      '<h2 class="pm-title" id="pmTitle">' + p.title + '</h2>' +
      '<p class="pm-lede">' + p.lede + '</p>' +
      (p.live ? '<a class="pm-live" href="' + p.live[0] + '" target="_blank" rel="noopener noreferrer">' + p.live[1] + ' <span aria-hidden="true">↗</span></a>' : '') +
      '<dl class="pm-meta">' + p.meta.map(function(m){ return '<div><dt>' + m[0] + '</dt><dd>' + m[1] + '</dd></div>'; }).join('') + '</dl>' +
      '<div class="pm-hero">' + fig(p.hero[0], p.hero[1], p.hero[2]) + '</div>' +
      '<div class="pm-story">' + p.story.map(function(s){ return '<div><h3>' + s[0] + '</h3><p>' + s[1] + '</p></div>'; }).join('') + '</div>' +
      '<div class="pm-impact">' + p.impact.map(function(m){ return '<div><strong>' + m[0] + '</strong><span>' + m[1] + '</span></div>'; }).join('') + '</div>' +
      p.sections() +
      '<nav class="pm-nav" aria-label="More projects">' +
        '<a href="#project-' + prevId + '" data-goto="' + prevId + '"><small>← Previous</small><span>' + prev.title + '</span></a>' +
        '<a href="#project-' + nextId + '" data-goto="' + nextId + '"><small>Next →</small><span>' + next.title + '</span></a>' +
      '</nav>';
    scroller.scrollTop = 0;
  }

  function open(id, opts){
    if(!PROJECTS[id]) return;
    opts = opts || {};
    if(!current) lastFocus = document.activeElement;
    current = id;
    render(id);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('pm-lock');
    if(!opts.fromHash && location.hash !== '#project-' + id){
      try { history.replaceState(null, '', '#project-' + id); } catch(e) {}
    }
    setTimeout(function(){ modal.querySelector('.pm-bar .pm-btn').focus({ preventScroll: true }); }, 30);
  }

  function close(){
    if(!current) return;
    closeZoom();
    current = null;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('pm-lock');
    if(/^#project-/.test(location.hash)){
      try { history.replaceState(null, '', location.pathname + location.search + '#projects'); } catch(e) {}
    }
    if(lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  function openZoom(src, alt){
    zoomImg.src = src;
    zoomImg.alt = alt || '';
    zoom.classList.add('open');
    zoom.setAttribute('aria-hidden', 'false');
    zoom.querySelector('.pm-btn').focus({ preventScroll: true });
  }
  function closeZoom(){
    if(!zoom.classList.contains('open')) return false;
    zoom.classList.remove('open');
    zoom.setAttribute('aria-hidden', 'true');
    return true;
  }

  /* cards → modal */
  document.querySelectorAll('.project-card[data-project]').forEach(function(card){
    card.addEventListener('click', function(e){
      if(e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      open(card.getAttribute('data-project'));
    });
  });

  modal.addEventListener('click', function(e){
    if(e.target.closest('[data-close]')){ close(); return; }
    var go = e.target.closest('[data-goto]');
    if(go){ e.preventDefault(); open(go.getAttribute('data-goto')); return; }
    var z = e.target.closest('[data-zoom]');
    if(z){ var im = z.querySelector('img'); openZoom(z.getAttribute('data-zoom'), im ? im.alt : ''); }
  });

  zoom.addEventListener('click', function(){
    var opener = null;
    closeZoom();
    opener = modal.querySelector('[data-zoom="' + zoomImg.getAttribute('src') + '"]');
    if(opener) opener.focus({ preventScroll: true });
  });

  document.addEventListener('keydown', function(e){
    if(!current) return;
    if(e.key === 'Escape'){
      e.stopPropagation();
      if(!closeZoom()) close();
      return;
    }
    if(e.key === 'Tab' && !zoom.classList.contains('open')){
      var f = panel.querySelectorAll('a[href], button:not([disabled])');
      if(!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
      else if(!panel.contains(document.activeElement)){ e.preventDefault(); first.focus(); }
    } else if(e.key === 'Tab'){
      e.preventDefault();
    }
  }, true);

  /* deep links: index.html#project-sumato opens that case study */
  function fromHash(){
    var m = location.hash.match(/^#project-([a-z]+)$/);
    if(m && PROJECTS[m[1]]) open(m[1], { fromHash: true });
    else if(current) close();
  }
  window.addEventListener('hashchange', fromHash);
  if(/^#project-/.test(location.hash)) fromHash();
})();
