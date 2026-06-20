<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>个人中心 - 江财现经管校园生活助手</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="icon" type="image/png" href="images/favicon.png">
</head>
<body>
    <header class="site-header">
        <nav class="navbar" aria-label="主导航">
            <a class="brand" href="index.html" aria-label="江财现经管校园生活助手首页">
                <img src="images/校徽.jpg" alt="江财现经管校徽" class="brand-logo">
                <span class="brand-text">江财现经管校园生活助手</span>
            </a>

            <div class="nav-links">
                <a href="index.html">首页</a>
                <a href="guide.html">新生指南</a>
                <a href="service.html">校园办事</a>
                <a href="about.html">关于项目</a>
            </div>

            <div class="nav-actions">
                <a class="text-link" href="login.html">登录</a>
                <a class="btn btn-small" href="register.html">注册</a>
            </div>
        </nav>
    </header>

    <main class="profile-main">
        <section class="profile-page" aria-labelledby="profile-title">
            <div class="profile-card">
                <div class="profile-heading">
                    <p class="eyebrow">个人中心</p>
                    <h1 id="profile-title">个人中心</h1>
                </div>

                <div class="profile-avatar-panel">
                    <div class="profile-avatar" id="profileAvatar" aria-hidden="true">校</div>
                    <div>
                        <strong>头像</strong>
                        <p>当前使用默认头像，后续可升级为点击头像上传更换。</p>
                    </div>
                </div>

                <form class="profile-form" id="profileForm">
                    <div class="form-group">
                        <label for="profileNickname">昵称</label>
                        <input id="profileNickname" name="nickname" type="text" placeholder="请输入昵称">
                    </div>

                    <div class="form-group">
                        <label for="profileStudentId">学号</label>
                        <input id="profileStudentId" name="studentId" type="text" placeholder="请输入学号">
                    </div>

                    <div class="form-group">
                        <label for="profilePhone">手机号</label>
                        <input id="profilePhone" name="phone" type="tel" placeholder="请输入手机号">
                    </div>

                    <div class="form-group">
                        <span class="form-label">性别</span>
                        <div class="choice-row" role="radiogroup" aria-label="性别">
                            <label class="choice-pill">
                                <input type="radio" name="gender" value="男">
                                <span>男</span>
                            </label>
                            <label class="choice-pill">
                                <input type="radio" name="gender" value="女">
                                <span>女</span>
                            </label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="profileCollege">学院</label>
                        <select id="profileCollege" name="college">
                            <option value="会计学院">会计学院</option>
                            <option value="经济学院">经济学院</option>
                            <option value="商学院">商学院</option>
                            <option value="设计与传播学院">设计与传播学院</option>
                            <option value="数据科学与人工智能学院">数据科学与人工智能学院</option>
                            <option value="法学院">法学院</option>
                            <option value="国际教育学院">国际教育学院</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="profileRole">身份</label>
                        <select id="profileRole" name="role">
                            <option value="学生">学生</option>
                            <option value="老师">老师</option>
                        </select>
                    </div>

                    <p class="form-message" id="profileMessage" role="status" aria-live="polite"></p>

                    <div class="profile-actions">
                        <button class="btn" type="submit">保存资料</button>
                        <button class="btn btn-secondary" id="logoutButton" type="button">退出登录</button>
                    </div>
                </form>

            </div>
        </section>
    </main>

    <footer class="site-footer">
        <p>江财现经管校园生活助手 · V1.0 前端模拟版</p>
        <p>面向本校学生的一站式校园生活服务平台</p>
    </footer>

    <script src="js/common.js"></script>
</body>
</html>
