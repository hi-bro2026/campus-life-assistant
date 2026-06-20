document.addEventListener("DOMContentLoaded", function () {
    var serviceData = [
        {
            keywords: ["请假", "请假流程", "假条"],
            title: "请假流程",
            message: "请假流程可在校园办事页面整理为办理地点、材料和注意事项。"
        },
        {
            keywords: ["图书馆", "借书", "自习"],
            title: "图书馆",
            message: "图书馆入口后续可补充开放时间、借阅规则和座位预约说明。"
        },
        {
            keywords: ["新生", "报到", "宿舍", "入学"],
            title: "新生指南",
            message: "新生相关内容已放入新生指南页面，可查看报到、宿舍和生活服务信息。"
        },
        {
            keywords: ["校园卡", "饭卡", "挂失", "补办"],
            title: "校园卡",
            message: "校园卡挂失、补办等内容适合放在校园办事页面中统一展示。"
        },
        {
            keywords: ["校园网", "网络", "wifi"],
            title: "校园网",
            message: "校园网连接说明后续可加入新生指南，方便新同学入学后快速配置。"
        },
        {
            keywords: ["快递", "快递点", "取件"],
            title: "快递点",
            message: "快递点位置和取件提醒后续可补充到新生指南的生活服务分类。"
        },
        {
            keywords: ["地图", "校园地图", "地点"],
            title: "校园地图",
            message: "校园地图后续可加入教学楼、宿舍、食堂、快递点等常用地点。"
        }
    ];

    var searchForm = document.getElementById("serviceSearch");
    var searchInput = document.getElementById("searchInput");
    var searchResult = document.getElementById("searchResult");
    var welcomeText = document.getElementById("welcomeText");

    updateWelcomeText(welcomeText);
    bindSearch(searchForm, searchInput, searchResult, serviceData);
    bindNoticeButtons(searchResult);
    bindQuickButtons(searchResult, serviceData);
});

function updateWelcomeText(welcomeText) {
    if (!welcomeText) {
        return;
    }

    var user = readLoginUser();
    if (user) {
        welcomeText.textContent = user + "，欢迎回到校园生活助手，今天也一起把校园生活安排得清清楚楚。";
    }
}

function readLoginUser() {
    var keys = ["currentUser", "loginUser", "loggedInUser", "campusCurrentUser"];

    for (var i = 0; i < keys.length; i++) {
        var value = localStorage.getItem(keys[i]);
        var name = parseUserName(value);
        if (name) {
            return name;
        }
    }

    if (localStorage.getItem("isLogin") === "true" || localStorage.getItem("isLoggedIn") === "true") {
        return localStorage.getItem("username") || localStorage.getItem("studentName") || "同学";
    }

    return "";
}

function parseUserName(value) {
    if (!value) {
        return "";
    }

    try {
        var user = JSON.parse(value);
        return user.name || user.username || user.studentName || user.studentId || "";
    } catch (error) {
        return value;
    }
}

function bindSearch(form, input, result, serviceData) {
    if (!form || !input || !result) {
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var keyword = input.value.trim().toLowerCase();

        if (!keyword) {
            showMessage(result, "先输入一个想找的服务名称，例如：请假流程、图书馆或校园卡。");
            input.focus();
            return;
        }

        var matched = findService(keyword, serviceData);
        if (matched) {
            showMessage(result, "找到「" + matched.title + "」：" + matched.message);
            return;
        }

        showMessage(result, "暂时没有找到「" + input.value.trim() + "」，可以先从新生指南或校园办事入口看看。");
    });
}

function bindNoticeButtons(result) {
    var buttons = document.querySelectorAll("[data-notice]");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
            var name = this.getAttribute("data-notice");
            showMessage(result, "已查看「" + name + "」提醒，详细内容后续会整理到对应页面。");
        });
    }
}

function bindQuickButtons(result, serviceData) {
    var buttons = document.querySelectorAll("[data-service]");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
            var name = this.getAttribute("data-service");
            var matched = findService(name.toLowerCase(), serviceData);
            var message = matched ? matched.message : "该入口后续完善。";
            showMessage(result, "快捷入口「" + name + "」：" + message);
        });
    }
}

function findService(keyword, serviceData) {
    for (var i = 0; i < serviceData.length; i++) {
        var service = serviceData[i];
        for (var j = 0; j < service.keywords.length; j++) {
            if (keyword.indexOf(service.keywords[j].toLowerCase()) !== -1) {
                return service;
            }
        }
    }

    return null;
}

function showMessage(target, message) {
    if (!target) {
        alert(message);
        return;
    }

    target.textContent = message;
    target.scrollIntoView({ behavior: "smooth", block: "nearest" });
}
