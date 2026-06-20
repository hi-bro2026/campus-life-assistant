document.addEventListener("DOMContentLoaded", function () {
    var loginForm = document.getElementById("loginForm");
    var registerForm = document.getElementById("registerForm");
    var fillDemoButton = document.getElementById("fillDemoAccount");

    if (loginForm) {
        initLoginPage(loginForm);
    }

    if (registerForm) {
        initRegisterPage(registerForm);
    }

    if (fillDemoButton) {
        fillDemoButton.addEventListener("click", fillDemoAccount);
    }

    initPhoneLoginPage();
});

var DEMO_USER = {
    name: "校园体验同学",
    username: "202500001",
    studentId: "202500001",
    password: "123456"
};

function initLoginPage(form) {
    var accountInput = document.getElementById("loginAccount");
    var passwordInput = document.getElementById("loginPassword");
    var rememberInput = document.getElementById("rememberLogin");
    var rememberedAccount = localStorage.getItem("campusRememberedAccount");

    if (rememberedAccount && accountInput && rememberInput) {
        accountInput.value = rememberedAccount;
        rememberInput.checked = true;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var account = accountInput.value.trim();
        var password = passwordInput.value;

        clearLoginState();

        if (!validateLoginForm(accountInput, passwordInput)) {
            return;
        }

        var user = findUser(account);
        if (!user) {
            showFormMessage("没有找到这个账号，可以先使用体验账号登录。", "error");
            accountInput.focus();
            return;
        }

        if (user.password !== password) {
            showFieldError(passwordInput, "密码不正确，请重新输入。");
            passwordInput.focus();
            return;
        }

        saveLoginState(user, rememberInput.checked, account);
        showFormMessage("登录成功，正在回到首页。", "success");

        window.setTimeout(function () {
            window.location.href = "index.html";
        }, 600);
    });
}

function initPhoneLoginPage() {
    var accountForm = document.getElementById("loginForm");
    var phoneForm = document.getElementById("phoneLoginForm");
    var accountPanel = document.getElementById("accountLoginPanel");
    var phonePanel = document.getElementById("phoneLoginPanel");
    var accountTab = document.getElementById("accountLoginTab");
    var phoneTab = document.getElementById("phoneLoginTab");
    var phoneInput = document.getElementById("phoneLoginNumber");
    var codeInput = document.getElementById("phoneLoginCode");
    var sendButton = document.getElementById("sendLoginCode");
    var rememberInput = document.getElementById("rememberPhoneLogin");

    if (!accountForm || !phoneForm || !accountPanel || !phonePanel || !accountTab || !phoneTab) {
        return;
    }

    accountTab.addEventListener("click", function () {
        switchLoginMode("account");
    });

    phoneTab.addEventListener("click", function () {
        switchLoginMode("phone");
    });

    if (sendButton) {
        sendButton.addEventListener("click", function () {
            sendPhoneLoginCode(phoneInput);
        });
    }

    phoneForm.addEventListener("submit", function (event) {
        event.preventDefault();
        clearPhoneLoginState();

        var phone = phoneInput.value.trim();
        var code = codeInput.value.trim();
        if (!validatePhoneLoginForm(phoneInput, codeInput)) {
            return;
        }

        var user = findUserByPhone(phone);
        if (!user) {
            showPhoneLoginMessage("没有找到绑定该手机号的账号，请先在个人中心绑定手机。", "error");
            phoneInput.focus();
            return;
        }

        if (!verifyPhoneLoginCode(phone, code)) {
            showPhoneFieldError(codeInput, "验证码不正确或已过期。");
            codeInput.focus();
            return;
        }

        localStorage.removeItem("campusSmsLoginCode");
        saveLoginState(user, rememberInput && rememberInput.checked, phone);
        showPhoneLoginMessage("验证码登录成功，正在回到首页。", "success");
        window.setTimeout(function () {
            window.location.href = "index.html";
        }, 600);
    });
}

function switchLoginMode(mode) {
    var accountPanel = document.getElementById("accountLoginPanel");
    var phonePanel = document.getElementById("phoneLoginPanel");
    var accountTab = document.getElementById("accountLoginTab");
    var phoneTab = document.getElementById("phoneLoginTab");
    var isPhone = mode === "phone";

    accountPanel.hidden = isPhone;
    phonePanel.hidden = !isPhone;
    accountPanel.classList.toggle("active", !isPhone);
    phonePanel.classList.toggle("active", isPhone);
    accountTab.classList.toggle("active", !isPhone);
    phoneTab.classList.toggle("active", isPhone);
}

function sendPhoneLoginCode(phoneInput) {
    var phone = phoneInput.value.trim();
    clearPhoneLoginState();

    if (!/^1\d{10}$/.test(phone)) {
        showPhoneFieldError(phoneInput, "请输入 11 位手机号。");
        return;
    }

    if (!findUserByPhone(phone)) {
        showPhoneLoginMessage("这个手机号还没有绑定账号。", "error");
        return;
    }

    var code = String(Math.floor(100000 + Math.random() * 900000));
    localStorage.setItem("campusSmsLoginCode", JSON.stringify({
        phone: phone,
        code: code,
        expiresAt: Date.now() + 5 * 60 * 1000
    }));
    showPhoneLoginMessage("模拟验证码已发送：" + code + "，5 分钟内有效。", "success");
}

function validatePhoneLoginForm(phoneInput, codeInput) {
    var isValid = true;
    var phone = phoneInput.value.trim();
    var code = codeInput.value.trim();

    if (!/^1\d{10}$/.test(phone)) {
        showPhoneFieldError(phoneInput, "请输入 11 位手机号。");
        isValid = false;
    }

    if (!/^\d{6}$/.test(code)) {
        showPhoneFieldError(codeInput, "请输入 6 位验证码。");
        isValid = false;
    }

    if (!isValid) {
        showPhoneLoginMessage("验证码不正确或已过期。", "error");
    }

    return isValid;
}

function verifyPhoneLoginCode(phone, code) {
    try {
        var data = JSON.parse(localStorage.getItem("campusSmsLoginCode") || "null");
        return data && data.phone === phone && data.code === code && Date.now() <= data.expiresAt;
    } catch (error) {
        return false;
    }
}

function findUserByPhone(phone) {
    var demoProfile = findSavedProfile(DEMO_USER, phone);
    if (demoProfile && String(demoProfile.phone || demoProfile.mobile || "") === phone) {
        return Object.assign({}, DEMO_USER, demoProfile);
    }

    var users = readStoredUsers();
    for (var i = 0; i < users.length; i++) {
        if (String(users[i].phone || users[i].mobile || "") === phone) {
            return users[i];
        }
    }

    return null;
}

function clearPhoneLoginState() {
    var fields = document.querySelectorAll("#phoneLoginForm input");
    for (var i = 0; i < fields.length; i++) {
        clearFieldError(fields[i]);
    }
    showPhoneLoginMessage("", "");
}

function showPhoneFieldError(input, message) {
    showFieldError(input, message);
}

function showPhoneLoginMessage(message, type) {
    var target = document.getElementById("phoneLoginMessage");
    if (!target) {
        return;
    }

    target.textContent = message;
    target.className = "form-message";
    if (type) {
        target.classList.add(type);
    }
}


function initRegisterPage(form) {
    var nameInput = document.getElementById("registerName");
    var studentIdInput = document.getElementById("registerStudentId");
    var phoneInput = document.getElementById("registerPhone");
    var passwordInput = document.getElementById("registerPassword");
    var confirmPasswordInput = document.getElementById("registerConfirmPassword");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        clearRegisterState();

        var formData = {
            name: nameInput.value.trim(),
            studentId: studentIdInput.value.trim(),
            phone: phoneInput.value.trim(),
            password: passwordInput.value,
            confirmPassword: confirmPasswordInput.value
        };

        if (!validateRegisterForm(formData, {
            name: nameInput,
            studentId: studentIdInput,
            phone: phoneInput,
            password: passwordInput,
            confirmPassword: confirmPasswordInput
        })) {
            return;
        }

        saveRegisteredUser(formData);
        localStorage.setItem("campusRememberedAccount", formData.studentId);
        showRegisterMessage("注册成功，正在前往登录页。", "success");

        window.setTimeout(function () {
            window.location.href = "login.html";
        }, 800);
    });
}

function validateLoginForm(accountInput, passwordInput) {
    var isValid = true;
    var account = accountInput.value.trim();
    var password = passwordInput.value;

    if (!account) {
        showFieldError(accountInput, "学号不能为空。");
        isValid = false;
    } else if (!/^\d{9}$/.test(account)) {
        showFieldError(accountInput, "学号必须是 9 位数字。");
        isValid = false;
    }

    if (!password) {
        showFieldError(passwordInput, "密码不能为空。");
        isValid = false;
    } else if (password.length < 6) {
        showFieldError(passwordInput, "密码长度不能少于 6 位。");
        isValid = false;
    }

    if (!isValid) {
        showFormMessage("请先检查表单里的提示。", "error");
    }

    return isValid;
}

function validateRegisterForm(data, fields) {
    var isValid = true;
    var phonePattern = /^1\d{10}$/;

    if (!data.name) {
        showFieldError(fields.name, "姓名不能为空。");
        isValid = false;
    }

    if (!data.studentId) {
        showFieldError(fields.studentId, "学号不能为空。");
        isValid = false;
    } else if (findUser(data.studentId)) {
        showFieldError(fields.studentId, "这个学号已经注册过了。");
        isValid = false;
    }

    if (!data.phone) {
        showFieldError(fields.phone, "手机号不能为空。");
        isValid = false;
    } else if (!phonePattern.test(data.phone)) {
        showFieldError(fields.phone, "请输入 11 位手机号。");
        isValid = false;
    } else if (findUser(data.phone)) {
        showFieldError(fields.phone, "这个手机号已经注册过了。");
        isValid = false;
    }

    if (!data.password) {
        showFieldError(fields.password, "密码不能为空。");
        isValid = false;
    } else if (data.password.length < 6) {
        showFieldError(fields.password, "密码长度不能少于 6 位。");
        isValid = false;
    } else if (!/^[A-Za-z0-9]+$/.test(data.password)) {
        showFieldError(fields.password, "密码只能使用英文字母或数字。");
        isValid = false;
    }

    if (!data.confirmPassword) {
        showFieldError(fields.confirmPassword, "请再次输入密码。");
        isValid = false;
    } else if (data.password !== data.confirmPassword) {
        showFieldError(fields.confirmPassword, "两次输入的密码不一致。");
        isValid = false;
    }

    if (!isValid) {
        showRegisterMessage("请先检查表单里的提示。", "error");
    }

    return isValid;
}

function findUser(account) {
    if (matchesUser(DEMO_USER, account)) {
        return Object.assign({}, DEMO_USER, findSavedProfile(DEMO_USER, account) || {});
    }

    var users = readStoredUsers();
    for (var i = 0; i < users.length; i++) {
        if (matchesUser(users[i], account)) {
            return users[i];
        }
    }

    return null;
}

function readStoredUsers() {
    var keys = ["campusUsers", "users", "registeredUsers"];
    var users = [];

    for (var i = 0; i < keys.length; i++) {
        var raw = localStorage.getItem(keys[i]);
        var parsed = parseUsers(raw);
        if (parsed.length) {
            users = users.concat(parsed);
        }
    }

    return users;
}

function parseUsers(raw) {
    if (!raw) {
        return [];
    }

    try {
        var data = JSON.parse(raw);
        if (Array.isArray(data)) {
            return data;
        }

        if (typeof data === "object") {
            return Object.keys(data).map(function (key) {
                return data[key];
            });
        }
    } catch (error) {
        return [];
    }

    return [];
}

function matchesUser(user, account) {
    if (!user) {
        return false;
    }

    var fields = [user.username, user.studentId, user.account, user.phone, user.name, user.studentName];
    for (var i = 0; i < fields.length; i++) {
        if (String(fields[i] || "") === account) {
            return true;
        }
    }

    return false;
}

function saveRegisteredUser(data) {
    var users = readStoredUsers();
    var newUser = {
        name: data.name,
        username: data.studentId,
        studentId: data.studentId,
        phone: data.phone,
        password: data.password,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem("campusUsers", JSON.stringify(users));
}

function saveLoginState(user, remember, account) {
    var savedProfile = findSavedProfile(user, account);
    var loginUser = Object.assign({}, user, savedProfile || {});
    var accountKey = user.accountKey || user.studentId || user.username || user.account || account;

    var currentUser = {
        name: loginUser.name || loginUser.studentName || loginUser.username || loginUser.studentId || "同学",
        nickname: loginUser.nickname || loginUser.name || loginUser.studentName || "",
        username: loginUser.username || loginUser.studentId || loginUser.account || "",
        studentId: loginUser.studentId || "",
        phone: loginUser.phone || loginUser.mobile || "",
        gender: loginUser.gender || "",
        college: loginUser.college || "",
        role: loginUser.role || loginUser.identity || "",
        status: loginUser.status || "",
        avatar: loginUser.avatar || loginUser.avatarData || "",
        password: loginUser.password || "",
        accountKey: accountKey,
        loginAt: new Date().toISOString()
    };

    localStorage.setItem("campusCurrentUser", JSON.stringify(currentUser));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("username", currentUser.name);

    if (remember) {
        localStorage.setItem("campusRememberedAccount", currentUser.username || currentUser.studentId || account);
    } else {
        localStorage.removeItem("campusRememberedAccount");
    }
}

function findSavedProfile(user, account) {
    var profiles = readSavedProfiles();
    var keys = [
        user.accountKey,
        user.studentId,
        user.username,
        user.account,
        user.phone,
        account
    ];

    for (var i = 0; i < keys.length; i++) {
        var key = String(keys[i] || "");
        if (key && profiles[key]) {
            return profiles[key];
        }
    }

    return null;
}

function readSavedProfiles() {
    var raw = localStorage.getItem("campusProfiles");
    if (!raw) {
        return {};
    }

    try {
        return JSON.parse(raw) || {};
    } catch (error) {
        return {};
    }
}

function fillDemoAccount() {
    var accountInput = document.getElementById("loginAccount");
    var passwordInput = document.getElementById("loginPassword");

    if (accountInput) {
        accountInput.value = DEMO_USER.username;
        clearFieldError(accountInput);
    }

    if (passwordInput) {
        passwordInput.value = DEMO_USER.password;
        clearFieldError(passwordInput);
    }

    showFormMessage("已填入体验账号，可以直接登录。", "success");
}

function clearRegisterState() {
    var fields = document.querySelectorAll("#registerForm input");
    for (var i = 0; i < fields.length; i++) {
        clearFieldError(fields[i]);
    }

    showRegisterMessage("", "");
}

function clearLoginState() {
    var fields = document.querySelectorAll(".auth-form input");
    for (var i = 0; i < fields.length; i++) {
        clearFieldError(fields[i]);
    }

    showFormMessage("", "");
}

function showFieldError(input, message) {
    if (!input) {
        return;
    }

    input.setAttribute("aria-invalid", "true");
    var error = document.querySelector("[data-error-for='" + input.id + "']");
    if (error) {
        error.textContent = message;
    }
}

function clearFieldError(input) {
    if (!input) {
        return;
    }

    input.removeAttribute("aria-invalid");
    var error = document.querySelector("[data-error-for='" + input.id + "']");
    if (error) {
        error.textContent = "";
    }
}

function showFormMessage(message, type) {
    var target = document.getElementById("loginMessage");
    if (!target) {
        return;
    }

    target.textContent = message;
    target.className = "form-message";

    if (type) {
        target.classList.add(type);
    }
}

function showRegisterMessage(message, type) {
    var target = document.getElementById("registerMessage");
    if (!target) {
        return;
    }

    target.textContent = message;
    target.className = "form-message";

    if (type) {
        target.classList.add(type);
    }
}
