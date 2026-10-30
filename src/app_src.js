(function () {
  var $ = function (id) { return document.getElementById(id); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  // mobile menu
  var burger = $("burger"), mob = $("mobileNav");
  if (burger && mob) burger.addEventListener("click", function () {
    var open = mob.hidden; mob.hidden = !open; burger.setAttribute("aria-expanded", String(open));
  });

  // insight of the day
  var tips = [
    ["Security", "Your UPI PIN is only for sending money. Never for receiving it.", "If anyone asks you to scan a QR code or enter your PIN to receive money, it is a scam."],
    ["Security", "New number plus an urgent money request? Call the old number first.", "Scammers pretend to be family on WhatsApp. One call to the number you saved ends the scam."],
    ["AI", "Agree on a family code word.", "AI can copy a voice from a few seconds of audio. It can't copy a secret only your family knows."],
    ["Cloud", "Start with the official free learning paths.", "Microsoft Learn offers free beginner paths for Azure Fundamentals, with hands-on sandboxes."],
    ["Careers", "Show your work, not just your certificates.", "One small project on GitHub with a short write-up says more than a list of course badges."],
    ["Security", "Police never arrest anyone over a video call.", "There is no 'digital arrest'. Hang up, tell your family and report it."],
    ["Learning", "Teach what you learn.", "Explaining an idea to someone else is the fastest way to understand it yourself."]
  ];
  if ($("tipText")) {
    var ti = 0;
    var show = function (n) {
      ti = (n + tips.length) % tips.length;
      $("tipTopic").textContent = tips[ti][0]; $("tipText").textContent = tips[ti][1]; $("tipWhy").textContent = tips[ti][2];
      $("tipCount").textContent = String(ti + 1).padStart(2, "0") + " / " + String(tips.length).padStart(2, "0");
    };
    $("tipPrev").onclick = function () { show(ti - 1); };
    $("tipNext").onclick = function () { show(ti + 1); };
    show(Math.floor(Date.now() / 864e5) % tips.length);
  }

  // search
  function wireSearch(id) {
    var input = $(id), box = $(id + "-results");
    if (!input || !box || !window.GY_INDEX) return;
    var render = function () {
      var q = input.value.trim().toLowerCase();
      box.innerHTML = "";
      if (q.length < 2) { box.hidden = true; return; }
      var terms = q.split(/\s+/);
      var hits = window.GY_INDEX.map(function (r) {
        var hay = (r.t + " " + r.s).toLowerCase() + " " + r.k, score = 0;
        for (var i = 0; i < terms.length; i++) {
          if (hay.indexOf(terms[i]) < 0) return null;
          if (r.t.toLowerCase().indexOf(terms[i]) >= 0) score += 3; else score += 1;
        }
        return { r: r, s: score };
      }).filter(Boolean).sort(function (a, b) { return b.s - a.s; }).slice(0, 7);
      if (!hits.length) {
        var none = document.createElement("p"); none.className = "noresult";
        none.textContent = "No lessons match “" + input.value.trim() + "”. Try another word, like scam, cloud or prompts.";
        box.appendChild(none);
      }
      hits.forEach(function (h) {
        var a = document.createElement("a"); a.href = h.r.u;
        var b = document.createElement("b"); b.textContent = h.r.t;
        var s = document.createElement("span"); s.textContent = h.r.s;
        a.appendChild(b); a.appendChild(s); box.appendChild(a);
      });
      box.hidden = false;
    };
    input.addEventListener("input", render);
    input.addEventListener("focus", render);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { box.hidden = true; input.blur(); }
      if (e.key === "Enter") { var f = box.querySelector("a"); if (f) location.href = f.href; }
    });
    document.addEventListener("click", function (e) { if (!e.target.closest(".search")) box.hidden = true; });
  }
  wireSearch("homeSearch"); wireSearch("pathSearch");

  // catalog filters
  var grid = $("pathGrid");
  if (grid) {
    var state = { topic: "all", query: "" };
    var hash = decodeURIComponent(location.hash.slice(1));
    var cardMatchesSearch = function (card) {
      if (!state.query) return true;
      var terms = state.query.split(/\s+/), path = card.getAttribute("href");
      var cardText = card.textContent.toLowerCase();
      if (terms.every(function (term) { return cardText.indexOf(term) >= 0; })) return true;
      return (window.GY_INDEX || []).some(function (record) {
        if (record.u.split("#")[0] !== path) return false;
        var text = (record.t + " " + record.s + " " + record.k).toLowerCase();
        return terms.every(function (term) { return text.indexOf(term) >= 0; });
      });
    };
    var apply = function () {
      var n = 0;
      grid.querySelectorAll(".pcard").forEach(function (c) {
        var ok = (state.topic === "all" || c.dataset.topic === state.topic) && cardMatchesSearch(c);
        c.hidden = !ok; if (ok) n++;
      });
      $("pathCount").textContent = n + (n === 1 ? " path" : " paths");
      $("pathEmpty").hidden = n > 0;
    };
    var pathSearch = $("pathSearch");
    if (pathSearch) pathSearch.addEventListener("input", function () { state.query = pathSearch.value.trim().toLowerCase(); apply(); });
    var wrap = $("fTopic");
    if (wrap) {
      wrap.addEventListener("click", function (e) {
        var b = e.target.closest(".f"); if (!b) return;
        wrap.querySelectorAll(".f").forEach(function (x) { x.classList.toggle("on", x === b); });
        state.topic = b.dataset.v; apply();
      });
      if (hash) {
        var match = wrap.querySelector('.f[data-v="' + hash.replace(/"/g, "") + '"]');
        if (match) match.click();
      }
    }
    apply();
  }

  // assessment catalog filters
  var assessmentGrid = $("assessmentGrid");
  if (assessmentGrid) {
    var assessmentSelects = [
      ["assessmentSubject", "subject"],
      ["assessmentTopic", "topics"],
      ["assessmentType", "type"]
    ];
    assessmentSelects.forEach(function (entry) {
      var select = $(entry[0]), values = [];
      assessmentGrid.querySelectorAll(".assessment-card").forEach(function (card) {
        var items = entry[1] === "topics" ? card.dataset.topics.split("|") : [card.dataset[entry[1]]];
        items.forEach(function (value) { if (value && values.indexOf(value) < 0) values.push(value); });
      });
      values.sort().forEach(function (value) {
        var option = document.createElement("option"); option.value = value; option.textContent = value; select.appendChild(option);
      });
    });
    var filterAssessments = function () {
      var query = $("assessmentSearch").value.trim().toLowerCase(), count = 0;
      assessmentGrid.querySelectorAll(".assessment-card").forEach(function (card) {
        var topics = card.dataset.topics.split("|");
        var visible = (!query || (card.dataset.title + " " + card.dataset.subject).toLowerCase().indexOf(query) >= 0)
          && ($("assessmentSubject").value === "all" || card.dataset.subject === $("assessmentSubject").value)
          && ($("assessmentTopic").value === "all" || topics.indexOf($("assessmentTopic").value) >= 0)
          && ($("assessmentType").value === "all" || card.dataset.type === $("assessmentType").value);
        card.hidden = !visible; if (visible) count++;
      });
      $("assessmentCount").textContent = count + (count === 1 ? " assessment" : " assessments");
      $("assessmentEmpty").hidden = count > 0;
    };
    $("assessmentSearch").addEventListener("input", filterAssessments);
    assessmentSelects.forEach(function (entry) { $(entry[0]).addEventListener("change", filterAssessments); });
    filterAssessments();
  }

  // multiple-choice assessments are scored from their authored answer keys.
  var assessmentSection = $("assessment");
  if (assessmentSection && location.search) {
    var assessmentId = new URLSearchParams(location.search).get("assessment");
    if (assessmentId) {
      $("testCatalog").hidden = true;
      assessmentSection.hidden = false;
      var assessment = (window.GY_ASSESSMENTS || []).find(function (item) { return item.id === assessmentId; });
      if (!assessment) {
        $("assessmentError").hidden = false;
      } else {
        $("assessmentTake").hidden = false;
        $("takeSubject").textContent = assessment.subject + " · " + assessment.type;
        $("takeTitle").textContent = assessment.title;
        $("takeDescription").textContent = assessment.description;
        var answers = new Array(assessment.questions.length).fill(null), current = 0, reviewing = false;
        var questionArea = $("questionArea"), questionNav = $("questionNav");

        function answeredCount() {
          return answers.filter(function (answer) { return answer !== null; }).length;
        }
        function renderQuestion() {
          var question = assessment.questions[current];
          $("questionCounter").textContent = "Question " + (current + 1) + " of " + assessment.questions.length;
          $("answerCounter").textContent = answeredCount() + " answered";
          var percent = answeredCount() / assessment.questions.length * 100;
          $("questionProgress").setAttribute("aria-valuenow", String(Math.round(percent)));
          $("questionProgress").querySelector("i").style.width = percent + "%";
          $("previousQuestion").disabled = current === 0;
          $("nextQuestion").disabled = current === assessment.questions.length - 1;
          questionNav.querySelectorAll("button").forEach(function (button, index) {
            button.classList.toggle("is-current", index === current);
            button.classList.toggle("is-answered", answers[index] !== null);
            if (index === current) button.setAttribute("aria-current", "step");
            else button.removeAttribute("aria-current");
          });
          questionArea.replaceChildren();
          if (reviewing) {
            var review = document.createElement("div"); review.className = "review-list";
            var heading = document.createElement("h2"); heading.textContent = "Review your answers";
            var intro = document.createElement("p"); intro.textContent = "Select a question to check or change your answer. Unanswered questions are marked.";
            review.append(heading, intro);
            assessment.questions.forEach(function (item, index) {
              var row = document.createElement("button"); row.type = "button"; row.className = "review-row";
              row.textContent = "Question " + (index + 1) + ": " + (answers[index] === null ? "Unanswered" : "Answered") + " — " + item.prompt;
              row.addEventListener("click", function () { current = index; reviewing = false; renderQuestion(); });
              review.appendChild(row);
            });
            questionArea.appendChild(review);
            return;
          }
          var fieldset = document.createElement("fieldset"); fieldset.className = "question-card";
          var legend = document.createElement("legend"); legend.textContent = question.prompt;
          fieldset.appendChild(legend);
          var topic = document.createElement("p"); topic.className = "question-topic";
          topic.textContent = question.topic + " · " + (question.type === "scenario" ? "Scenario" : "Concept");
          fieldset.appendChild(topic);
          question.options.forEach(function (option, index) {
            var label = document.createElement("label"); label.className = "answer-option";
            var input = document.createElement("input"); input.type = "radio"; input.name = "assessmentAnswer"; input.value = String(index); input.checked = answers[current] === index;
            input.addEventListener("change", function () { answers[current] = index; renderQuestion(); });
            var text = document.createElement("span"); text.textContent = option;
            label.append(input, text); fieldset.appendChild(label);
          });
          questionArea.appendChild(fieldset);
        }
        assessment.questions.forEach(function (_, index) {
          var button = document.createElement("button"); button.type = "button"; button.textContent = String(index + 1);
          button.setAttribute("aria-label", "Go to question " + (index + 1));
          button.addEventListener("click", function () { current = index; reviewing = false; renderQuestion(); });
          questionNav.appendChild(button);
        });
        $("previousQuestion").addEventListener("click", function () { if (current > 0) { current--; reviewing = false; renderQuestion(); } });
        $("nextQuestion").addEventListener("click", function () { if (current < assessment.questions.length - 1) { current++; reviewing = false; renderQuestion(); } });
        $("reviewAssessment").addEventListener("click", function () { reviewing = !reviewing; renderQuestion(); });
        $("submitAssessment").addEventListener("click", function () {
          var unanswered = assessment.questions.length - answeredCount();
          var message = unanswered
            ? "You have " + unanswered + " unanswered " + (unanswered === 1 ? "question" : "questions") + ". Submit anyway?"
            : "Submit your assessment and see your results?";
          if (!window.confirm(message)) return;
          showAssessmentResults();
        });
        function showAssessmentResults() {
          var correct = 0, incorrect = 0, topicScores = {};
          assessment.questions.forEach(function (question, index) {
            if (!topicScores[question.topic]) topicScores[question.topic] = { correct: 0, total: 0 };
            topicScores[question.topic].total++;
            if (answers[index] === question.answer) { correct++; topicScores[question.topic].correct++; }
            else if (answers[index] !== null) incorrect++;
          });
          var unanswered = assessment.questions.length - correct - incorrect;
          var percentage = Math.round(correct / assessment.questions.length * 100);
          $("assessmentTake").hidden = true;
          var result = $("assessmentResult"); result.hidden = false; result.replaceChildren();
          var heading = document.createElement("h1"); heading.textContent = "Your results";
          var title = document.createElement("p"); title.className = "lede"; title.textContent = assessment.title;
          var score = document.createElement("div"); score.className = "score-summary";
          var scoreValue = document.createElement("strong"); scoreValue.textContent = correct + " / " + assessment.questions.length + " marks";
          var scoreCaption = document.createElement("span"); scoreCaption.textContent = "Maximum possible: " + assessment.questions.length + " marks · " + percentage + "% · " + correct + " correct, " + incorrect + " incorrect, " + unanswered + " unanswered";
          score.append(scoreValue, scoreCaption);
          result.append(heading, title, score);
          var topicHeading = document.createElement("h2"); topicHeading.textContent = "Topic performance";
          result.appendChild(topicHeading);
          var topicList = document.createElement("ul"); topicList.className = "topic-results";
          Object.keys(topicScores).forEach(function (topicName) {
            var item = topicScores[topicName], li = document.createElement("li");
            li.textContent = topicName + ": " + item.correct + " of " + item.total + " correct";
            topicList.appendChild(li);
          });
          result.appendChild(topicList);
          var missedTopics = Object.keys(topicScores).filter(function (topicName) { return topicScores[topicName].correct < topicScores[topicName].total; });
          var suggestions = document.createElement("p"); suggestions.className = "local-note";
          suggestions.textContent = missedTopics.length ? "Suggested revision: " + missedTopics.join(", ") + ". Revisit the linked lessons below." : "Great work. Revisit the linked lessons to reinforce these concepts.";
          result.appendChild(suggestions);
          var explanationHeading = document.createElement("h2"); explanationHeading.textContent = "Answer review";
          result.appendChild(explanationHeading);
          assessment.questions.forEach(function (question, index) {
            var item = document.createElement("article"); item.className = "result-answer";
            var questionHeading = document.createElement("h3"); questionHeading.textContent = "Question " + (index + 1) + " · " + question.topic;
            var response = document.createElement("p");
            response.textContent = answers[index] === null ? "Unanswered" : (answers[index] === question.answer ? "Correct: " : "Your answer: ") + question.options[answers[index]];
            var correctAnswer = document.createElement("p");
            correctAnswer.textContent = "Correct answer: " + question.options[question.answer];
            var explanation = document.createElement("p"); explanation.textContent = question.explanation;
            var lesson = document.createElement("a"); lesson.className = "more"; lesson.href = question.lesson; lesson.textContent = "Review related lesson";
            item.append(questionHeading, response, correctAnswer, explanation, lesson); result.appendChild(item);
          });
          var actions = document.createElement("div"); actions.className = "assessment-actions";
          var retry = document.createElement("button"); retry.type = "button"; retry.className = "btn dark"; retry.textContent = "Retry assessment";
          retry.addEventListener("click", function () { location.reload(); });
          var back = document.createElement("a"); back.className = "btn outline"; back.href = "test.html"; back.textContent = "Browse assessments";
          actions.append(retry, back); result.appendChild(actions);
          result.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        renderQuestion();
      }
    }
  }

  // resource tabs
  var tabs = $("resTabs");
  if (tabs) tabs.addEventListener("click", function (e) {
    var b = e.target.closest(".f"); if (!b) return;
    tabs.querySelectorAll(".f").forEach(function (x) { x.classList.toggle("on", x === b); });
    document.querySelectorAll("#resList .row").forEach(function (r) { r.hidden = !(b.dataset.v === "all" || r.dataset.cat === b.dataset.v); });
  });

  // lesson progress
  var layout = document.querySelector(".path-layout");
  if (layout) {
    var slug = layout.dataset.path, total = +layout.dataset.total;
    var boxes = layout.querySelectorAll(".done input");
    var update = function () {
      var done = 0;
      boxes.forEach(function (b) {
        var link = layout.querySelector('.toc a[data-lesson="' + b.dataset.lesson + '"]');
        if (link) link.classList.toggle("is-done", b.checked);
        if (b.checked) done++;
      });
      $("progText").textContent = done + " / " + total;
      $("progBar").style.width = (done / total * 100) + "%";
    };
    boxes.forEach(function (b) {
      b.checked = store.get("gy:" + slug + ":" + b.dataset.lesson) === "1";
      b.addEventListener("change", function () { store.set("gy:" + slug + ":" + b.dataset.lesson, b.checked ? "1" : "0"); update(); });
    });
    update();
    // highlight current lesson
    if ("IntersectionObserver" in window) {
      var links = layout.querySelectorAll(".toc a");
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            var n = en.target.id.split("-")[1];
            links.forEach(function (l) { l.classList.toggle("is-current", l.dataset.lesson === n); });
          }
        });
      }, { rootMargin: "-30% 0px -60% 0px" });
      layout.querySelectorAll(".lesson").forEach(function (s) { io.observe(s); });
    }
  }
})();

// ---------- theme toggle ----------
(function () {
  var btn = document.getElementById("themeBtn");
  if (!btn) return;
  btn.addEventListener("click", function () {
    var root = document.documentElement;
    var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    if (next === "dark") root.removeAttribute("data-theme"); else root.setAttribute("data-theme", "light");
    try { localStorage.setItem("gy-theme", next === "light" ? "light" : ""); } catch (e) {}
  });
})();

// ---------- practice checks ----------
(function () {
  document.querySelectorAll(".pcheck").forEach(function (box) {
    var ans = +box.dataset.answer, opts = box.querySelectorAll(".pc-opt");
    var res = box.querySelector(".pc-result"), why = box.querySelector(".pc-why"), retry = box.querySelector(".pc-retry");
    opts.forEach(function (o) {
      o.addEventListener("click", function () {
        var right = +o.dataset.i === ans;
        opts.forEach(function (x) { x.disabled = true; if (+x.dataset.i === ans) x.classList.add("is-right"); });
        if (!right) o.classList.add("is-wrong");
        res.textContent = right ? "Correct. Nice work!" : "Not quite. The correct answer is highlighted.";
        res.hidden = false; why.hidden = false; retry.hidden = right;
      });
    });
    retry.addEventListener("click", function () {
      opts.forEach(function (x) { x.disabled = false; x.classList.remove("is-right", "is-wrong"); });
      res.hidden = true; why.hidden = true; retry.hidden = true;
    });
  });
})();

// ---------- my learning ----------
(function () {
  var grid = document.getElementById("mlGrid");
  if (!grid || !window.GY_PATHS) return;
  var get = function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } };
  function render() {
    var totalDone = 0, totalAll = 0, started = 0;
    grid.innerHTML = "";
    window.GY_PATHS.forEach(function (p) {
      var done = 0, next = 0;
      for (var i = 1; i <= p.total; i++) {
        if (get("gy:" + p.slug + ":" + i) === "1") done++; else if (!next) next = i;
      }
      totalDone += done; totalAll += p.total; if (done) started++;
      var card = document.createElement("div"); card.className = "mlcard";
      var pct = Math.round(done / p.total * 100);
      var label = done === 0 ? "Start path" : done === p.total ? "Review path" : "Continue";
      var href = "path-" + p.slug + ".html" + (next && done ? "#lesson-" + next : "");
      card.innerHTML = '<div class="mlcard-top"><span class="level"></span><span class="eyebrow"></span></div><h3></h3><p></p>' +
        '<div class="bar"><i style="width:' + pct + '%"></i></div><div class="mlcard-top"><span class="ml-count">' + done + ' / ' + p.total + ' lessons</span>' +
        (done === p.total ? '<span class="ml-done">Completed</span>' : '') + '</div>' +
        (done && next ? '<p class="ml-next">Next: <b></b></p>' : '') + '<a class="btn outline"></a>';
      card.querySelector(".level").textContent = p.level;
      card.querySelector(".eyebrow").textContent = p.topic;
      card.querySelector("h3").textContent = p.title;
      card.querySelector("p").textContent = p.summary;
      if (done && next) card.querySelector(".ml-next b").textContent = p.lessons[next - 1];
      var a = card.querySelector("a.btn"); a.textContent = label; a.href = href;
      grid.appendChild(card);
    });
    document.getElementById("mlLessons").textContent = totalDone;
    document.getElementById("mlPaths").textContent = started;
    document.getElementById("mlPct").textContent = (totalAll ? Math.round(totalDone / totalAll * 100) : 0) + "%";
    document.getElementById("mlHint").textContent = totalDone ? "Great progress. Keep going where you left off." : "No lessons completed yet. Start with a path below.";
  }
  render();
  var reset = document.getElementById("mlReset"), conf = document.getElementById("mlConfirm");
  reset.addEventListener("click", function () { conf.hidden = false; });
  document.getElementById("mlNo").addEventListener("click", function () { conf.hidden = true; });
  document.getElementById("mlYes").addEventListener("click", function () {
    window.GY_PATHS.forEach(function (p) { for (var i = 1; i <= p.total; i++) { try { localStorage.removeItem("gy:" + p.slug + ":" + i); } catch (e) {} } });
    conf.hidden = true; render();
  });
})();
