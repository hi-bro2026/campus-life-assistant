(function () {
    document.addEventListener("DOMContentLoaded", function () {
        var services = [
            {
                title: "校园卡挂失",
                category: "证件卡务",
                summary: "校园卡丢失后可通过微信入口快速挂失，也可以按同一入口进行解挂。",
                location: "微信搜索“江财现经管校园卡”，进入校园卡服务入口。",
                materials: ["微信账号", "校园卡绑定信息", "学号或统一身份认证信息", "需要解挂时确认卡片已找回"],
                time: "发现校园卡丢失后建议立即在微信端挂失；找回后再按流程解挂。",
                steps: ["打开微信并搜索“江财现经管校园卡”", "进入校园卡服务入口后点击“挂失/解挂”", "进入挂失/解挂页面后点击右上角的锁形图标完成操作", "操作后检查校园卡状态，确认是否已挂失或解挂成功"],
                notes: ["挂失后如果找回旧卡，不要直接继续使用，先按同一入口确认是否可以解挂。", "如果微信端无法处理，可再联系校园卡服务点或智慧校园中心。", "具体以微信入口展示和学校最新通知为准。"],
                keywords: ["校园卡", "饭卡", "挂失", "解挂", "微信", "江财现经管校园卡", "锁", "补卡", "门禁"],
                visualGuide: {
                    title: "微信挂失图片指引",
                    images: [
                        {
                            src: "images/vercel-assets/asset-013.jpg",
                            alt: "微信搜索江财现经管校园卡示意图",
                            caption: "第 1 步：在微信搜索“江财现经管校园卡”。"
                        },
                        {
                            src: "images/vercel-assets/asset-014.jpg",
                            alt: "校园卡服务入口挂失解挂示意图",
                            caption: "第 2 步：进入后点击“挂失/解挂”。"
                        },
                        {
                            src: "images/vercel-assets/asset-015.jpg",
                            alt: "校园卡挂失解挂锁形按钮示意图",
                            caption: "第 3 步：点击右上角的锁形图标完成挂失或解挂。"
                        }
                    ]
                }
            },
            {
                title: "请假流程",
                category: "生活事务",
                summary: "请假必须在掌上学工提交申请，并提前和班主任说明原因，审核通过后再同步截图给学委或老师。",
                location: "微信搜索“江财现经管学工”，进入后点击“掌上学工”，再点击“请假申请”。",
                materials: ["微信账号", "请假原因说明", "请假起止时间", "必要时提供病历、车票或其他证明材料", "审核通过后的请假截图"],
                time: "原则上提前在掌上学工申请；突发情况应第一时间和班主任说明，再尽快补齐线上申请。",
                steps: ["打开微信并搜索“江财现经管学工”", "进入后点击“掌上学工”", "在掌上学工中点击“请假申请”并填写请假信息", "提交前和班主任说清楚请假原因、时间和去向", "等待审核通过后，将请假截图发给学委或者老师留存"],
                notes: ["请假必须在掌上学工申请，不能只口头说明。", "请假前要和班主任说清楚，避免信息不同步。", "审核通过后及时把截图发给学委或者老师，方便考勤和课堂记录。", "具体以学院和班级最新要求为准。"],
                keywords: ["请假", "假条", "掌上学工", "江财现经管学工", "班主任", "学委", "审核", "截图", "病假", "事假", "离校"],
                visualGuide: {
                    title: "掌上学工请假图片指引",
                    images: [
                        {
                            src: "images/vercel-assets/asset-016.jpg",
                            alt: "微信搜索江财现经管学工并进入掌上学工示意图",
                            caption: "第 1 步：在微信搜索“江财现经管学工”，进入后点击“掌上学工”。"
                        },
                        {
                            src: "images/vercel-assets/asset-017.jpg",
                            alt: "掌上学工请假申请入口示意图",
                            caption: "第 2 步：在掌上学工中点击“请假申请”。"
                        }
                    ]
                }
            },
            {
                title: "电费/复电流程",
                category: "生活事务",
                summary: "宿舍断电先判断原因：电费不足断电只需要充值电费；因大功率电器或其他原因断电，才需要提交复电申请。",
                location: "复电申请入口：微信搜索“江财现经管学工”并进入掌上学工；电费充值需先在中国建设银行 APP 给校园卡充值余额，再到“江财现经管校园卡”公众号用校园卡余额充值电费。",
                materials: ["宿舍楼栋", "宿舍号", "校园卡头像下方的一卡通充值账号", "断电原因说明", "必要时准备充值或复电申请截图"],
                time: "电费不足时充值完成后等待几分钟通常即可来电；因大功率或其他原因断电时，按掌上学工复电申请审核结果处理。",
                steps: ["先判断断电原因：电费不足只充值电费，使用大功率或其他原因断电才申请复电", "复电申请：微信搜索“江财现经管学工”，点击“掌上学工”，再点击“复电申请”", "电费充值第 1 步：在中国建设银行 APP 搜索“校园卡充值”，点击“江西财大经管学院一卡通”，先为校园卡充值余额", "电费充值第 2 步：微信搜索“江财现经管校园卡”，点击“校园卡”进入，再点击“电费”，使用校园卡余额为宿舍电费充值", "充值时填写一卡通账号，一卡通账号在校园卡头像下方的充值账号位置", "电费充值完成后等待几分钟，通常即可恢复来电"],
                notes: ["只有因为使用大功率电器或其他非欠费原因断电时，才需要走复电申请。", "电费不足导致断电时，不需要申请复电；先在中国建设银行 APP 为校园卡充值余额，再到公众号用校园卡余额充值电费。", "电费充值消耗的是校园卡余额，所以校园卡余额不足时要先完成校园卡充值。", "不要自行打开配电箱或私自接线，避免触电和安全事故。", "具体以掌上学工、校园卡入口和学校最新通知为准。"],
                keywords: ["电费", "复电", "断电", "停电", "宿舍电", "充值", "掌上学工", "江财现经管学工", "复电申请", "中国建设银行", "校园卡充值", "一卡通", "充值账号", "大功率"],
                visualGuide: {
                    title: "电费充值与复电图片指引",
                    images: [
                        {
                            src: "images/vercel-assets/asset-018.jpg",
                            alt: "微信搜索江财现经管学工进入掌上学工示意图",
                            caption: "复电申请第 1 步：微信搜索“江财现经管学工”，点击“掌上学工”。"
                        },
                        {
                            src: "images/vercel-assets/asset-019.jpg",
                            alt: "掌上学工复电申请入口示意图",
                            caption: "复电申请第 2 步：在掌上学工中点击“复电申请”。"
                        },
                        {
                            src: "images/vercel-assets/asset-020.jpg",
                            alt: "中国建设银行 APP 校园卡充值示意图",
                            caption: "电费充值第 1 步：在中国建设银行 APP 搜索“校园卡充值”，点击“江西财大经管学院一卡通”，先为校园卡充值余额。"
                        },
                        {
                            src: "images/vercel-assets/asset-021.jpg",
                            alt: "江财现经管校园卡微信电费充值示意图",
                            caption: "电费充值第 2 步：微信搜索“江财现经管校园卡”，点击“校园卡”，再点击“电费”，用校园卡余额充值电费。"
                        }
                    ]
                }
            },
            {
                title: "公寓报修",
                category: "生活事务",
                summary: "宿舍设施有任何问题都可以通过掌上学工提交公寓报修，方便后续维修人员联系和处理。",
                location: "微信搜索“江财现经管学工”公众号，点击“掌上学工”，再点击“公寓报修”。",
                materials: ["宿舍楼栋和宿舍号", "报修人姓名与联系方式", "故障位置和问题描述", "现场照片或视频"],
                time: "宿舍设施出现问题后可及时提交报修；漏水、断电等紧急情况也要同步联系宿管或值班人员。",
                steps: ["打开微信并搜索“江财现经管学工”公众号", "进入公众号后点击“掌上学工”", "在掌上学工中点击“公寓报修”", "填写宿舍楼栋、宿舍号、联系方式和故障说明", "提交后保持手机畅通，等待维修人员联系或上门处理"],
                notes: ["宿舍设施有任何问题都能报修，例如门锁、水电、家具、空调、漏水等。", "报修描述尽量具体，最好补充现场照片或视频，方便维修人员判断问题。", "紧急安全问题要第一时间联系宿管，不要只等待线上反馈。", "具体以掌上学工和公寓管理要求为准。"],
                keywords: ["公寓报修", "报修", "掌上学工", "江财现经管学工", "宿舍设施", "宿舍维修", "维修", "门锁", "漏水", "空调", "家具", "水电"],
                visualGuide: {
                    title: "掌上学工公寓报修图片指引",
                    images: [
                        {
                            src: "images/vercel-assets/asset-022.jpg",
                            alt: "微信搜索江财现经管学工并进入掌上学工示意图",
                            caption: "第 1 步：在微信搜索“江财现经管学工”公众号，进入后点击“掌上学工”。"
                        },
                        {
                            src: "images/vercel-assets/asset-023.jpg",
                            alt: "掌上学工公寓报修入口示意图",
                            caption: "第 2 步：在掌上学工中点击“公寓报修”。"
                        }
                    ]
                }
            },
            {
                title: "成绩查询",
                category: "学习事务",
                summary: "成绩查询需在电脑端进入学院官网的教务系统，登录后从课程管理中的“我的成绩”查看，打印预览页面信息更全面。",
                location: "电脑端搜索“江西财经大学现代经济管理学院官网”，点击官网右上角“教务系统”，登录后进入左侧“课程管理”下的“我的成绩”。",
                materials: ["电脑设备", "校园网或 VPN 连接", "教务系统账号", "教务系统密码", "必要时准备验证码或统一身份认证信息"],
                time: "成绩发布时间以任课教师录入和教务通知为准；系统访问人数较多时可错峰查询。",
                steps: ["先确认电脑已连接校园网；不在校园网环境时需先连接 VPN", "在电脑端搜索“江西财经大学现代经济管理学院官网”并进入官网", "点击官网右上角“教务系统”", "登录教务系统后，在左侧菜单找到“课程管理”", "点击“课程管理”下的“我的成绩”查看成绩", "如需查看更完整信息，可点击“打印预览”", "如对成绩有疑问，按学校规定时间申请复核"],
                notes: ["登录教务系统需要连接校园网或者 VPN，否则可能无法进入。", "“打印预览”页面显示的信息通常更全面，查询或截图时可以优先查看。", "成绩刚发布时系统可能访问人数较多，可错峰查询。", "具体以教务系统、学院官网和学校最新通知为准。"],
                keywords: ["成绩", "查分", "教务系统", "课程管理", "我的成绩", "打印预览", "江西财经大学现代经济管理学院", "学院官网", "校园网", "VPN", "vpn", "绩点", "补考"],
                visualGuide: {
                    title: "电脑端成绩查询图片指引",
                    images: [
                        {
                            src: "images/vercel-assets/asset-024.jpg",
                            alt: "学院官网右上角教务系统入口示意图",
                            caption: "第 1 步：电脑端搜索“江西财经大学现代经济管理学院官网”，进入后点击右上角“教务系统”。"
                        },
                        {
                            src: "images/vercel-assets/asset-025.jpg",
                            alt: "教务系统课程管理我的成绩入口示意图",
                            caption: "第 2 步：登录后点击左侧“课程管理”下的“我的成绩”，点击“打印预览”可查看更全面信息。"
                        }
                    ]
                }
            },
            {
                title: "二课学分申请/查询",
                category: "学习事务",
                summary: "二课学分可在掌上学工应用中心申请和查询，提交时要选好学分类型、填写分值，并上传符合要求的截图材料。",
                location: "微信搜索“江财现经管学工”公众号，点击“掌上学工”，进入后点击“应用中心”，再点击“二课学分申请”。",
                materials: ["微信账号", "学分类型", "申请分值", "活动或证明截图", "下发 Excel 表格中筛选出的本人记录截图"],
                time: "建议在学院通知或活动材料下发后及时申请；审核、查询和补正时间以掌上学工、学院通知和负责老师要求为准。",
                steps: ["打开微信并搜索“江财现经管学工”公众号", "进入公众号后点击“掌上学工”", "进入掌上学工后点击“应用中心”", "在应用中心点击“二课学分申请”", "按要求选择学分类型，填写申请分值，并上传截图材料", "在下发的 Excel 表格中使用筛选功能筛出自己的那一项，截图只需要截到表头和自己的那一行", "提交后留意审核状态，必要时按老师要求补充或修改材料"],
                notes: ["学分申请必须写清楚学分类型和分值，截图材料要能对应本人记录。", "Excel 截图不要截整张表，只截表头和自己的那一行，方便审核老师快速核对。", "本科需要修满二课学分总 4 分：思想政治与道德素养（必修）1 学分，劳动教育（必修）1 学分，其他学分 2 学分。", "具体以掌上学工、学院通知和负责老师要求为准。"],
                keywords: ["二课", "二课学分", "第二课堂", "学分申请", "学分查询", "掌上学工", "江财现经管学工", "应用中心", "Excel", "筛选", "截图", "思想政治", "道德素养", "劳动教育"],
                visualGuide: {
                    title: "掌上学工二课学分图片指引",
                    images: [
                        {
                            src: "images/vercel-assets/asset-026.jpg",
                            alt: "微信搜索江财现经管学工并进入掌上学工示意图",
                            caption: "第 1 步：在微信搜索“江财现经管学工”公众号，进入后点击“掌上学工”。"
                        },
                        {
                            src: "images/vercel-assets/asset-027.jpg",
                            alt: "掌上学工应用中心二课学分申请入口示意图",
                            caption: "第 2 步：进入掌上学工后点击“应用中心”，再点击“二课学分申请”。"
                        }
                    ]
                }
            },
            {
                title: "校园网/VPN",
                category: "学习事务",
                summary: "校园网可通过 GiWiFi 校园助手连接寝室 WiFi；VPN 可按教务系统登录页下方提示或学校客户端说明连接，用于进入教务系统等校内资源。",
                location: "校园网：下载并登录 GiWiFi 校园助手，连接带有自己寝室号的 WiFi；VPN：查看教务系统登录页下方连接步骤，或访问 https://218.65.6.122:4433、下载客户端使用。",
                materials: ["手机或电脑设备", "GiWiFi 校园助手", "学号或一卡通账号", "校园网套餐或按天充值费用", "VPN 账号密码", "学校 VPN 客户端安装包"],
                time: "评教、下载考条、查询成绩等需要进入教务系统时可按需使用校园网或 VPN；VPN 主要用于校外访问校内资源。",
                steps: ["下载安装 GiWiFi 校园助手，图标可参考右侧图片", "登录后将 WiFi 连接到带有自己寝室号的 WiFi 名称，例如 GiWiFi5G-SXA-111 表示尚信楼 A 栋 111 号", "确认连接的是自己寝室对应的 WiFi，不要随意连接其他寝室 WiFi", "如果手机卡没有校园网套餐，可在 GiWiFi 校园助手内按需充值，一天 2 元", "需要进入教务系统但不在校园网环境时，先打开教务系统登录页面，查看登录框下方的连接 VPN 具体步骤", "按教务系统登录页下方提示完成 VPN 连接后，再登录教务系统", "也可以访问 VPN 网页地址 https://218.65.6.122:4433，遇到证书提示可继续浏览；账号一般为本人一卡通账号或学号，初始密码默认六个 0", "如使用客户端方式，可下载本页提供的 VPN 客户端安装包，安装后填写 VPN 地址和端口，登录成功后再访问教务系统链接"],
                notes: ["一个学期通常只有评教、下载考条、查看成绩等少数场景需要进入教务系统，需要时按天购买校园网会比较方便。", "校园网要连接自己寝室号对应的 WiFi，例如 WiFi 名 GiWiFi5G-SXA-111 对应尚信楼 A 栋 111 号。", "教务系统登录页下方有连接 VPN 的具体步骤，遇到不会连接时优先看该页面提示。", "VPN 是校外访问校内资源时使用；在办公区域或已连校园网时，一般可直接访问校内资源，不需要开启 VPN。", "账号和密码不要外借；首次使用或登录失败时，按学校 VPN 说明或网络信息管理中心要求处理。", "具体以 GiWiFi 校园助手、教务系统登录页、学校 VPN 系统和学校最新通知为准。"],
                keywords: ["校园网", "VPN", "vpn", "GiWiFi", "WiFi校园助手", "校园助手", "寝室号", "尚信楼", "校园网套餐", "一天2元", "2元", "评教", "考条", "成绩", "教务系统", "登录页面", "连接VPN", "一卡通", "SecSetup"],
                downloads: [
                    {
                        label: "下载学校 VPN 客户端（SecSetup_5.3.3.30.exe）",
                        href: "downloads/SecSetup_5.3.3.30.exe",
                        filename: "SecSetup_5.3.3.30.exe",
                        note: "用于客户端方式访问学院 VPN，安装后按说明填写 VPN 地址和端口。"
                    }
                ],
                visualGuide: {
                    title: "校园网与 VPN 图片指引",
                    images: [
                        {
                            src: "images/vercel-assets/asset-028.jpg",
                            alt: "GiWiFi 校园助手图标示意图",
                            caption: "第 1 步：下载并打开 GiWiFi 校园助手，登录后连接自己寝室号对应的 WiFi。"
                        },
                        {
                            src: "images/vercel-assets/asset-029.jpg",
                            alt: "教务系统登录页面 VPN 连接步骤示意图",
                            caption: "第 2 步：教务系统登录页面下方有连接 VPN 的具体步骤，需要进入教务系统时可按页面提示操作。"
                        }
                    ]
                }
            }
        ];

        var state = {
            category: "全部",
            selectedTitle: services[0].title,
            visualIndex: 0
        };
        var cardList = document.getElementById("serviceCardList");
        var emptyBox = document.getElementById("serviceEmpty");
        var status = document.getElementById("serviceFilterStatus");
        var detailPanel = document.getElementById("serviceDetailPanel");
        var categoryTabs = document.getElementById("serviceCategoryTabs");

        if (!cardList || !detailPanel) {
            return;
        }
        bindCategoryTabs(categoryTabs, state, services, render);
        var targetFromUrl = getRequestedServiceTitle(services);
        if (targetFromUrl) {
            state.selectedTitle = targetFromUrl;
        }
        render();
        if (targetFromUrl) {
            window.setTimeout(function () {
                detailPanel.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 80);
        }
        var targetFromPet = sessionStorage.getItem("campusPetTargetService");
        if (targetFromPet && findByTitle(services, targetFromPet)) {
            state.selectedTitle = targetFromPet;
            sessionStorage.removeItem("campusPetTargetService");
            render();
        }

        window.campusOpenServiceByTitle = function (title) {
            if (!findByTitle(services, title)) {
                return;
            }

            state.category = "全部";
            state.selectedTitle = title;
            state.visualIndex = 0;
            var buttons = categoryTabs ? categoryTabs.querySelectorAll("button[data-category]") : [];
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].classList.toggle("active", buttons[i].getAttribute("data-category") === "全部");
            }
            render();
            detailPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
        };
        function getRequestedServiceTitle(data) {
            var params = new URLSearchParams(window.location.search || "");
            var title = params.get("service");
            if (!title) {
                return "";
            }

            var normalizedTitle = title.trim();
            if (findByTitle(data, normalizedTitle)) {
                return normalizedTitle;
            }

            if (normalizedTitle === "校园网") {
                return "校园网/VPN";
            }

            return "";
        }

        function initPetAssistant(data, currentState, onRender, tabs, detailTarget) {
            var assistant = document.getElementById("campusPetAssistant");
            var petButton = document.getElementById("campusPetToggle");
            var petImage = document.getElementById("campusPetImage");
            var chatPanel = document.getElementById("campusPetChat");
            var chatHeader = document.getElementById("petChatHeader");
            var closeButton = document.getElementById("petChatClose");
            var messages = document.getElementById("petChatMessages");
            var form = document.getElementById("petChatForm");
            var input = document.getElementById("petChatInput");
            var suggestions = assistant ? assistant.querySelector(".pet-chat-suggestions") : null;
            var resizeHandles = assistant ? assistant.querySelectorAll(".pet-resize-handle") : [];

            if (!assistant || !petButton || !petImage || !chatPanel || !chatHeader || !messages || !form || !input) {
                return;
            }

            var petImages = {
                idle: "images/vercel-assets/asset-012.png",
                hover: "images/vercel-assets/asset-030.png",
                active: "images/vercel-assets/asset-031.png"
            };
            var dragState = null;
            var resizeState = null;
            var chatDragState = null;
            var suppressClick = false;
            var currentConversationId = localStorage.getItem("campusPetConversationId") || "";

            petButton.addEventListener("click", function (event) {
                if (suppressClick) {
                    event.preventDefault();
                    suppressClick = false;
                    return;
                }

                toggleChat();
            });

            restoreChatSize();
            restoreChatPosition();
            restorePetPosition();
            bindResizeHandles();
            bindChatDrag();
            setPetMode("idle");
            updateChatPlacement();

            petButton.addEventListener("mouseenter", function () {
                if (!assistant.classList.contains("is-open") && !dragState) {
                    setPetMode("hover");
                }
            });

            petButton.addEventListener("mouseleave", function () {
                if (!assistant.classList.contains("is-open") && !dragState) {
                    setPetMode("idle");
                }
            });

            petButton.addEventListener("pointerdown", function (event) {
                if (event.button !== undefined && event.button !== 0) {
                    return;
                }

                var rect = assistant.getBoundingClientRect();
                dragState = {
                    pointerId: event.pointerId,
                    startX: event.clientX,
                    startY: event.clientY,
                    left: rect.left,
                    top: rect.top,
                    moved: false
                };
                assistant.classList.add("is-pressing");

                if (petButton.setPointerCapture) {
                    petButton.setPointerCapture(event.pointerId);
                }
            });

            petButton.addEventListener("pointermove", function (event) {
                if (!dragState) {
                    return;
                }

                var dx = event.clientX - dragState.startX;
                var dy = event.clientY - dragState.startY;
                if (!dragState.moved && Math.abs(dx) + Math.abs(dy) < 6) {
                    return;
                }

                dragState.moved = true;
                assistant.classList.add("is-dragging");
                event.preventDefault();
                movePetTo(dragState.left + dx, dragState.top + dy);
                updateChatPlacement();
            });

            petButton.addEventListener("pointerup", endPetDrag);
            petButton.addEventListener("pointercancel", endPetDrag);

            if (closeButton) {
                closeButton.addEventListener("click", closeChat);
            }

            form.addEventListener("submit", function (event) {
                event.preventDefault();
                submitPetQuestion(input.value);
            });

            if (suggestions) {
                suggestions.addEventListener("click", function (event) {
                    var button = event.target.closest("button[data-pet-question]");
                    if (button) {
                        submitPetQuestion(button.getAttribute("data-pet-question"));
                    }
                });
            }

            messages.addEventListener("click", function (event) {
                var button = event.target.closest("button[data-pet-service]");
                if (button) {
                    openServiceFromChat(button.getAttribute("data-pet-service"));
                }
            });

            window.addEventListener("resize", function () {
                clampStoredPetPosition();
                clampChatSizeToViewport();
                clampDetachedChatPosition();
                updateChatPlacement();
            });

            function bindResizeHandles() {
                for (var i = 0; i < resizeHandles.length; i++) {
                    resizeHandles[i].addEventListener("pointerdown", startChatResize);
                }
            }

            function bindChatDrag() {
                chatHeader.addEventListener("pointerdown", function (event) {
                    if (event.button !== undefined && event.button !== 0) {
                        return;
                    }
                    if (event.target.closest("button")) {
                        return;
                    }

                    detachChatFromCurrentRect();
                    var rect = chatPanel.getBoundingClientRect();
                    chatDragState = {
                        startX: event.clientX,
                        startY: event.clientY,
                        left: rect.left,
                        top: rect.top
                    };
                    assistant.classList.add("is-chat-dragging");
                    event.preventDefault();
                    if (chatHeader.setPointerCapture) {
                        try {
                            chatHeader.setPointerCapture(event.pointerId);
                        } catch (error) {
                            // Pointer capture may already be unavailable.
                        }
                    }
                    document.addEventListener("pointermove", dragChat);
                    document.addEventListener("pointerup", endChatDrag);
                    document.addEventListener("pointercancel", endChatDrag);
                });
            }

            function dragChat(event) {
                if (!chatDragState) {
                    return;
                }
                applyChatPosition(
                    chatDragState.left + event.clientX - chatDragState.startX,
                    chatDragState.top + event.clientY - chatDragState.startY
                );
            }

            function endChatDrag() {
                if (!chatDragState) {
                    return;
                }
                chatDragState = null;
                assistant.classList.remove("is-chat-dragging");
                document.removeEventListener("pointermove", dragChat);
                document.removeEventListener("pointerup", endChatDrag);
                document.removeEventListener("pointercancel", endChatDrag);
                saveChatPosition();
            }

            function startChatResize(event) {
                var edge = event.currentTarget.getAttribute("data-resize-edge") || "se";
                detachChatFromCurrentRect();
                var rect = chatPanel.getBoundingClientRect();
                resizeState = {
                    edge: edge,
                    startX: event.clientX,
                    startY: event.clientY,
                    left: rect.left,
                    top: rect.top,
                    width: rect.width,
                    height: rect.height
                };
                assistant.classList.add("is-resizing");
                event.preventDefault();
                event.stopPropagation();
                if (event.currentTarget.setPointerCapture) {
                    try {
                        event.currentTarget.setPointerCapture(event.pointerId);
                    } catch (error) {
                        // Pointer capture may already be unavailable.
                    }
                }
                document.addEventListener("pointermove", resizeChat);
                document.addEventListener("pointerup", endChatResize);
                document.addEventListener("pointercancel", endChatResize);
            }

            function resizeChat(event) {
                if (!resizeState) {
                    return;
                }

                var dx = event.clientX - resizeState.startX;
                var dy = event.clientY - resizeState.startY;
                var width = resizeState.width;
                var height = resizeState.height;
                var left = resizeState.left;
                var top = resizeState.top;

                if (resizeState.edge.indexOf("e") !== -1) {
                    width += dx;
                }
                if (resizeState.edge.indexOf("w") !== -1) {
                    width -= dx;
                }
                if (resizeState.edge.indexOf("s") !== -1) {
                    height += dy;
                }
                if (resizeState.edge.indexOf("n") !== -1) {
                    height -= dy;
                }

                var size = applyChatSize(width, height);
                if (resizeState.edge.indexOf("w") !== -1) {
                    left = resizeState.left + resizeState.width - size.width;
                }
                if (resizeState.edge.indexOf("n") !== -1) {
                    top = resizeState.top + resizeState.height - size.height;
                }
                applyChatPosition(left, top);
            }

            function endChatResize() {
                if (!resizeState) {
                    return;
                }
                resizeState = null;
                assistant.classList.remove("is-resizing");
                document.removeEventListener("pointermove", resizeChat);
                document.removeEventListener("pointerup", endChatResize);
                document.removeEventListener("pointercancel", endChatResize);
                saveChatSize();
                saveChatPosition();
                updateChatPlacement();
            }

            function toggleChat() {
                if (assistant.classList.contains("is-open")) {
                    closeChat();
                } else {
                    openChat();
                }
            }

            function openChat() {
                assistant.classList.add("is-open");
                chatPanel.setAttribute("aria-hidden", "false");
                petButton.setAttribute("aria-label", "关闭小橘校园问答");
                setPetMode("active");
                updateChatPlacement();
                window.setTimeout(function () {
                    input.focus();
                }, 120);
            }

            function closeChat() {
                assistant.classList.remove("is-open");
                chatPanel.setAttribute("aria-hidden", "true");
                petButton.setAttribute("aria-label", "打开小橘校园问答");
                setPetMode("idle");
            }

            function setPetMode(mode) {
                if (assistant.classList.contains("is-open")) {
                    mode = "active";
                }
                assistant.classList.toggle("is-hovering", mode === "hover");
                petImage.src = petImages[mode] || petImages.idle;
            }

            function endPetDrag(event) {
                if (!dragState) {
                    return;
                }

                if (petButton.releasePointerCapture) {
                    try {
                        petButton.releasePointerCapture(event.pointerId);
                    } catch (error) {
                        // Pointer capture may already be released by the browser.
                    }
                }

                assistant.classList.remove("is-pressing", "is-dragging");
                if (dragState.moved) {
                    suppressClick = true;
                    savePetPosition();
                    updateChatPlacement();
                }
                dragState = null;
                if (!assistant.classList.contains("is-open")) {
                    setPetMode("idle");
                }
            }

            function movePetTo(left, top) {
                var width = petButton.offsetWidth || 95;
                var height = petButton.offsetHeight || 77;
                var maxLeft = Math.max(12, window.innerWidth - width - 12);
                var maxTop = Math.max(12, window.innerHeight - height - 12);
                var nextLeft = clamp(left, 12, maxLeft);
                var nextTop = clamp(top, 12, maxTop);
                assistant.style.left = nextLeft + "px";
                assistant.style.top = nextTop + "px";
                assistant.style.right = "auto";
                assistant.style.bottom = "auto";
            }

            function clampStoredPetPosition() {
                if (!assistant.style.left || !assistant.style.top) {
                    return;
                }
                movePetTo(parseFloat(assistant.style.left), parseFloat(assistant.style.top));
            }

            function savePetPosition() {
                try {
                    window.localStorage.setItem("campusPetPosition", JSON.stringify({
                        left: parseFloat(assistant.style.left),
                        top: parseFloat(assistant.style.top)
                    }));
                } catch (error) {
                    // LocalStorage can be unavailable in private or restricted modes.
                }
            }

            function restorePetPosition() {
                try {
                    var saved = JSON.parse(window.localStorage.getItem("campusPetPosition") || "null");
                    if (saved && typeof saved.left === "number" && typeof saved.top === "number") {
                        movePetTo(saved.left, saved.top);
                    }
                } catch (error) {
                    // Ignore invalid saved coordinates.
                }
            }

            function restoreChatSize() {
                try {
                    var saved = JSON.parse(window.localStorage.getItem("campusPetChatSize") || "null");
                    if (saved && typeof saved.width === "number" && typeof saved.height === "number") {
                        applyChatSize(saved.width, saved.height);
                    }
                } catch (error) {
                    // Ignore invalid saved size.
                }
            }

            function saveChatSize() {
                try {
                    window.localStorage.setItem("campusPetChatSize", JSON.stringify({
                        width: getChatWidth(),
                        height: getChatHeight()
                    }));
                } catch (error) {
                    // LocalStorage can be unavailable in private or restricted modes.
                }
            }

            function applyChatSize(width, height) {
                var maxWidth = Math.max(360, window.innerWidth - 48);
                var maxHeight = Math.max(360, window.innerHeight - 48);
                var nextWidth = clamp(width, 420, maxWidth);
                var nextHeight = clamp(height, 430, maxHeight);
                assistant.style.setProperty("--pet-chat-width", nextWidth + "px");
                assistant.style.setProperty("--pet-chat-height", nextHeight + "px");
                return { width: nextWidth, height: nextHeight };
            }

            function clampChatSizeToViewport() {
                applyChatSize(getChatWidth(), getChatHeight());
            }

            function getChatWidth() {
                var value = parseFloat(getComputedStyle(assistant).getPropertyValue("--pet-chat-width"));
                return Number.isFinite(value) ? value : 560;
            }

            function getChatHeight() {
                var value = parseFloat(getComputedStyle(assistant).getPropertyValue("--pet-chat-height"));
                return Number.isFinite(value) ? value : 640;
            }

            function detachChatFromCurrentRect() {
                if (assistant.classList.contains("chat-detached")) {
                    return;
                }
                var rect = chatPanel.getBoundingClientRect();
                assistant.classList.add("chat-detached");
                applyChatPosition(rect.left, rect.top);
            }

            function restoreChatPosition() {
                try {
                    var saved = JSON.parse(window.localStorage.getItem("campusPetChatPosition") || "null");
                    if (saved && typeof saved.left === "number" && typeof saved.top === "number") {
                        assistant.classList.add("chat-detached");
                        applyChatPosition(saved.left, saved.top);
                    }
                } catch (error) {
                    // Ignore invalid saved coordinates.
                }
            }

            function saveChatPosition() {
                if (!assistant.classList.contains("chat-detached")) {
                    return;
                }
                try {
                    window.localStorage.setItem("campusPetChatPosition", JSON.stringify({
                        left: getChatLeft(),
                        top: getChatTop()
                    }));
                } catch (error) {
                    // LocalStorage can be unavailable in private or restricted modes.
                }
            }

            function applyChatPosition(left, top) {
                var width = getChatWidth();
                var height = getChatHeight();
                var maxLeft = Math.max(12, window.innerWidth - width - 12);
                var maxTop = Math.max(12, window.innerHeight - height - 12);
                var nextLeft = clamp(left, 12, maxLeft);
                var nextTop = clamp(top, 12, maxTop);
                assistant.style.setProperty("--pet-chat-left", nextLeft + "px");
                assistant.style.setProperty("--pet-chat-top", nextTop + "px");
            }

            function clampDetachedChatPosition() {
                if (!assistant.classList.contains("chat-detached")) {
                    return;
                }
                applyChatPosition(getChatLeft(), getChatTop());
            }

            function getChatLeft() {
                var value = parseFloat(getComputedStyle(assistant).getPropertyValue("--pet-chat-left"));
                return Number.isFinite(value) ? value : 240;
            }

            function getChatTop() {
                var value = parseFloat(getComputedStyle(assistant).getPropertyValue("--pet-chat-top"));
                return Number.isFinite(value) ? value : 150;
            }

            function updateChatPlacement() {
                if (assistant.classList.contains("chat-detached")) {
                    return;
                }
                var rect = petButton.getBoundingClientRect();
                var chatWidth = getChatWidth();
                var chatHeight = getChatHeight();
                var shouldOpenLeft = window.innerWidth - rect.right < chatWidth + 36 && rect.left > chatWidth + 36;
                var shouldOpenBelow = rect.top < Math.min(chatHeight - rect.height, 420);
                assistant.classList.toggle("chat-left", shouldOpenLeft);
                assistant.classList.toggle("chat-below", shouldOpenBelow);
            }

            function submitPetQuestion(rawQuestion) {
                var question = String(rawQuestion || "").trim();
                if (!question) {
                    return;
                }

                openChat();
                addPetMessage("user", question);
                input.value = "";
                var thinking = addPetMessage("bot", "小橘学长正在思考中……", [], true);

                requestAgentReply(question, thinking).catch(function () {
                    updatePetMessage(thinking, "我这边暂时没有连上知识库，稍后再试试喵。");
                    thinking.classList.remove("pet-message-thinking");
                });
            }

            function requestAgentReply(message, botMessage) {
                var renderedText = "";
                var pendingText = "";
                var typingTimer = null;
                var streamFinished = false;
                var finishTyping = null;

                function typeNextCharacter() {
                    if (!pendingText) {
                        clearInterval(typingTimer);
                        typingTimer = null;
                        if (streamFinished && finishTyping) {
                            finishTyping();
                            finishTyping = null;
                        }
                        return;
                    }

                    renderedText += pendingText.charAt(0);
                    pendingText = pendingText.slice(1);
                    botMessage.classList.remove("pet-message-thinking");
                    updatePetMessage(botMessage, renderedText);
                }

                function queueText(text) {
                    pendingText += text;
                    if (!typingTimer) {
                        typingTimer = setInterval(typeNextCharacter, 22);
                    }
                }

                function finishTypewriter() {
                    streamFinished = true;
                    if (!typingTimer && !pendingText) {
                        return Promise.resolve();
                    }
                    return new Promise(function (resolve) {
                        finishTyping = resolve;
                    });
                }

                return fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: message,
                    conversationId: currentConversationId
                })
            }).then(function (response) {
                if (!response.ok) {
                    throw new Error("Chat request failed");
                }
                return response.json();
            }).then(function (data) {
                if (data.conversationId) {
                    currentConversationId = data.conversationId;
                    localStorage.setItem("campusPetConversationId", currentConversationId);
                }
                if (!data.reply) {
                    throw new Error("Chat response is empty");
                }
                queueText(data.reply);
                return finishTypewriter();
            });
            }
            function removePetMessage(message) {
                if (message && message.parentNode === messages) {
                    messages.removeChild(message);
                }
            }

            function getPetReply(question) {
                if (typeof window.campusPetAskAgent === "function") {
                    return Promise.resolve(window.campusPetAskAgent(question, { services: data })).then(function (answer) {
                        return normalizeAgentAnswer(answer, question);
                    });
                }

                return Promise.resolve(buildLocalPetReply(question, data));
            }

            function normalizeAgentAnswer(answer, question) {
                if (typeof answer === "string") {
                    return { text: answer, matches: [] };
                }

                if (answer && typeof answer.text === "string") {
                    return {
                        text: answer.text,
                        matches: resolveAgentMatches(answer.matches || answer.services || [])
                    };
                }

                return buildLocalPetReply(question, data);
            }

            function resolveAgentMatches(items) {
                var result = [];
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var title = typeof item === "string" ? item : item && item.title;
                    var service = title ? findByTitle(data, title) : null;
                    if (service) {
                        result.push(service);
                    }
                }
                return result.slice(0, 3);
            }

            function buildLocalPetReply(question, sourceData) {
                var matches = searchServices(question, sourceData).slice(0, 3);
                var greetings = ["你好", "hi", "hello", "哈喽", "小橘"];
                if (greetings.indexOf(question.trim().toLowerCase()) !== -1) {
                    return {
                        text: "你好呀，我是小橘。你可以直接问我校园卡、请假、电费、报修、成绩、二课或校园网/VPN 的问题。",
                        matches: []
                    };
                }

                if (matches.length) {
                    var top = matches[0];
                    var service = top.service;
                    var materials = service.materials.slice(0, 3).join("、");
                    var text = "我在校园办事里找到「" + service.title + "」。\n" + service.summary + "\n办理地点：" + service.location + "\n建议先准备：" + materials + "。";
                    if (matches.length > 1) {
                        text += "\n还可能相关：" + matches.slice(1).map(function (item) {
                            return "「" + item.service.title + "」";
                        }).join("、") + "。";
                    }
                    return {
                        text: text,
                        matches: matches.map(function (item) {
                            return item.service;
                        })
                    };
                }

                return {
                    text: "我暂时没在校园办事数据里找到特别匹配的事项。可以换成“请假”“电费”“成绩”“VPN”“二课”等关键词试试。",
                    matches: []
                };
            }

            function searchServices(question, sourceData) {
                var query = normalizePetText(question);
                var results = [];

                if (!query) {
                    return results;
                }

                for (var i = 0; i < sourceData.length; i++) {
                    var service = sourceData[i];
                    var score = 0;
                    var title = normalizePetText(service.title);
                    var category = normalizePetText(service.category);
                    var keywords = service.keywords || [];
                    var haystack = normalizePetText([
                        service.summary,
                        service.location,
                        service.time,
                        service.materials.join(" "),
                        service.steps.join(" "),
                        service.notes.join(" ")
                    ].join(" "));

                    if (title.indexOf(query) !== -1 || query.indexOf(title) !== -1) {
                        score += 32;
                    }
                    if (category.indexOf(query) !== -1 || query.indexOf(category) !== -1) {
                        score += 6;
                    }
                    if (haystack.indexOf(query) !== -1) {
                        score += 10;
                    }

                    for (var j = 0; j < keywords.length; j++) {
                        var keyword = normalizePetText(keywords[j]);
                        if (!keyword) {
                            continue;
                        }
                        if (query.indexOf(keyword) !== -1 || keyword.indexOf(query) !== -1) {
                            score += keyword.length > 2 ? 14 : 8;
                        } else if (haystack.indexOf(keyword) !== -1 && querySharesText(query, keyword)) {
                            score += 5;
                        }
                    }

                    if (score > 0) {
                        results.push({ service: service, score: score });
                    }
                }

                results.sort(function (a, b) {
                    return b.score - a.score;
                });
                return results;
            }

            function querySharesText(query, keyword) {
                if (keyword.length < 2) {
                    return false;
                }
                for (var i = 0; i <= keyword.length - 2; i++) {
                    if (query.indexOf(keyword.slice(i, i + 2)) !== -1) {
                        return true;
                    }
                }
                return false;
            }

            function normalizePetText(value) {
                return String(value || "").toLowerCase().replace(/[^\u4e00-\u9fa5a-z0-9]+/g, "");
            }

            function addPetMessage(type, text, matches, isThinking) {
                var message = document.createElement("div");
                message.className = "pet-message pet-message-" + type + (isThinking ? " pet-message-thinking" : "");
                if (type === "bot") {
                    var avatar = document.createElement("img");
                    avatar.className = "pet-message-avatar";
                    avatar.src = "images/vercel-assets/asset-011.png";
                    avatar.alt = "小橘学长头像";
                    message.appendChild(avatar);
                }
                var body = document.createElement("div");
                body.className = "pet-message-body";
                message.appendChild(body);
                renderPetMessageContent(message, text);

                if (matches && matches.length) {
                    var actions = document.createElement("div");
                    actions.className = "pet-result-actions";
                    for (var j = 0; j < matches.length; j++) {
                        var button = document.createElement("button");
                        button.type = "button";
                        button.setAttribute("data-pet-service", matches[j].title);
                        button.textContent = "查看：" + matches[j].title;
                        actions.appendChild(button);
                    }
                    body.appendChild(actions);
                }

                messages.appendChild(message);
                messages.scrollTop = messages.scrollHeight;
                return message;
            }

            function updatePetMessage(message, text) {
                if (!message) return;
                renderPetMessageContent(message, text);
                messages.scrollTop = messages.scrollHeight;
            }

            function renderPetMessageContent(message, text) {
                var contentTarget = message.querySelector(".pet-message-body") || message;
                contentTarget.textContent = "";
                var lines = String(text || "").split(/\r?\n/);
                var currentList = null;
                var currentListType = "";

                for (var i = 0; i < lines.length; i++) {
                    var line = lines[i];
                    var bullet = line.match(/^\s*[-*+]\s+(.+)$/);
                    var numbered = line.match(/^\s*\d+[.、]\s+(.+)$/);

                    if (bullet || numbered) {
                        var listType = numbered ? "ol" : "ul";
                        if (!currentList || currentListType !== listType) {
                            currentList = document.createElement(listType);
                            currentListType = listType;
                            contentTarget.appendChild(currentList);
                        }
                        var item = document.createElement("li");
                        appendInlineMarkdown(item, bullet ? bullet[1] : numbered[1]);
                        currentList.appendChild(item);
                        continue;
                    }

                    currentList = null;
                    currentListType = "";
                    var paragraph = document.createElement("p");
                    appendInlineMarkdown(paragraph, line);
                    contentTarget.appendChild(paragraph);
                }
            }

            function appendInlineMarkdown(target, text) {
                var source = String(text || "");
                var pattern = /(\*\*|__)(.+?)\1/g;
                var lastIndex = 0;
                var match;
                while ((match = pattern.exec(source)) !== null) {
                    if (match.index > lastIndex) {
                        target.appendChild(document.createTextNode(source.slice(lastIndex, match.index)));
                    }
                    var strong = document.createElement("strong");
                    strong.textContent = match[2];
                    target.appendChild(strong);
                    lastIndex = pattern.lastIndex;
                }
                if (lastIndex < source.length) {
                    target.appendChild(document.createTextNode(source.slice(lastIndex)));
                }
            }

            function readPetChatStream(response, onEvent) {
                var reader = response.body.getReader();
                var decoder = new TextDecoder();
                var buffer = "";

                function readNext() {
                    return reader.read().then(function (chunk) {
                        if (chunk.done) {
                            buffer += decoder.decode();
                            flushPetStreamBuffer(buffer, onEvent);
                            return;
                        }
                        buffer += decoder.decode(chunk.value, { stream: true });
                        var blocks = buffer.split(/\n\n+/);
                        buffer = blocks.pop() || "";
                        flushPetStreamBuffer(blocks.join("\n\n"), onEvent);
                        return readNext();
                    });
                }

                return readNext();
            }

            function flushPetStreamBuffer(text, onEvent) {
                var blocks = String(text || "").split(/\n\n+/);
                for (var i = 0; i < blocks.length; i++) {
                    var block = blocks[i];
                    if (!block) continue;
                    var eventName = "message";
                    var dataText = "";
                    var lines = block.split(/\r?\n/);
                    for (var j = 0; j < lines.length; j++) {
                        if (lines[j].indexOf("event:") === 0) {
                            eventName = lines[j].slice(6).trim();
                        } else if (lines[j].indexOf("data:") === 0) {
                            dataText += lines[j].slice(5).trim();
                        }
                    }
                    if (!dataText) continue;
                    onEvent(eventName, JSON.parse(dataText));
                }
            }
            function openServiceFromChat(title) {
                var service = findByTitle(data, title);
                if (!service) {
                    return;
                }

                currentState.category = "全部";
                currentState.selectedTitle = service.title;
                currentState.visualIndex = 0;
                updateServiceTabs(tabs);
                onRender();
                if (detailTarget) {
                    detailTarget.scrollIntoView({ behavior: "smooth", block: "nearest" });
                }
            }

            function updateServiceTabs(tabsNode) {
                if (!tabsNode) {
                    return;
                }
                var buttons = tabsNode.querySelectorAll("button[data-category]");
                for (var i = 0; i < buttons.length; i++) {
                    buttons[i].classList.toggle("active", buttons[i].getAttribute("data-category") === currentState.category);
                }
            }

            function clamp(value, min, max) {
                return Math.min(Math.max(value, min), max);
            }
        }

        initPetAssistant(services, state, render, categoryTabs, detailPanel);

        function render() {
            var filtered = getFilteredServices(services, state);
            if (!findByTitle(filtered, state.selectedTitle)) {
                state.selectedTitle = filtered.length ? filtered[0].title : "";
            }

            renderCards(cardList, filtered, state);
            renderEmpty(emptyBox, filtered);
            renderStatus(status, filtered, state);
            renderDetail(detailPanel, findByTitle(services, state.selectedTitle), state);
        }

        function bindCategoryTabs(tabs, currentState, data, onRender) {
            if (!tabs) {
                return;
            }

            tabs.addEventListener("click", function (event) {
                var button = event.target.closest("button[data-category]");
                if (!button) {
                    return;
                }

                currentState.category = button.getAttribute("data-category");
                var buttons = tabs.querySelectorAll("button[data-category]");
                for (var i = 0; i < buttons.length; i++) {
                    buttons[i].classList.toggle("active", buttons[i] === button);
                }

                var filtered = getFilteredServices(data, currentState);
                currentState.selectedTitle = filtered.length ? filtered[0].title : "";
                currentState.visualIndex = 0;
                onRender();
            });
        }

        function renderCards(target, data, currentState) {
            target.innerHTML = "";

            for (var i = 0; i < data.length; i++) {
                var service = data[i];
                var card = document.createElement("button");
                card.className = "service-card";
                card.type = "button";
                card.setAttribute("data-title", service.title);
                card.setAttribute("aria-pressed", service.title === currentState.selectedTitle ? "true" : "false");

                var prepare = service.materials.slice(0, 2).join("、");
                card.innerHTML =
                    '<span class="service-card-category">' + escapeHtml(service.category) + '</span>' +
                    '<strong>' + escapeHtml(service.title) + '</strong>' +
                    '<p>' + escapeHtml(service.summary) + '</p>' +
                    '<span class="service-card-prepare">推荐准备：' + escapeHtml(prepare) + '</span>';

                card.addEventListener("click", function () {
                    currentState.selectedTitle = this.getAttribute("data-title");
                    currentState.visualIndex = 0;
                    render();
                    detailPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
                });

                target.appendChild(card);
            }
        }

        function renderEmpty(target, data) {
            if (target) {
                target.hidden = data.length > 0;
            }
        }

        function renderStatus(target, data, currentState) {
            if (!target) {
                return;
            }

            var categoryText = currentState.category === "全部" ? "全部分类" : currentState.category;
            target.textContent = "当前显示 " + data.length + " 项，范围：" + categoryText + "。";
        }

        function renderDetail(target, service, currentState) {
            if (!service) {
                target.innerHTML =
                    '<p class="eyebrow">办理详情</p>' +
                    '<h2 id="serviceDetailTitle">未找到对应事项</h2>' +
                    '<p class="service-detail-summary">切换其他分类，再选择左侧办事卡片查看详情。</p>';
                return;
            }

            target.innerHTML =
                '<p class="eyebrow">' + escapeHtml(service.category) + '</p>' +
                '<h2 id="serviceDetailTitle">' + escapeHtml(service.title) + '</h2>' +
                '<p class="service-detail-summary">' + escapeHtml(service.summary) + '</p>' +
                renderVisualGuide(service, currentState) +
                '<div class="service-detail-block">' +
                    '<strong>办理地点</strong>' +
                    '<p>' + escapeHtml(service.location) + '</p>' +
                '</div>' +
                '<div class="service-detail-block">' +
                    '<strong>办理时间</strong>' +
                    '<p>' + escapeHtml(service.time) + '</p>' +
                '</div>' +
                '<div class="service-detail-block">' +
                    '<strong>所需材料</strong>' +
                    renderList(service.materials) +
                '</div>' +
                renderDownloads(service) +
                '<div class="service-detail-block">' +
                    '<strong>办理步骤</strong>' +
                    renderList(service.steps) +
                '</div>' +
                '<div class="service-detail-block service-note-block">' +
                    '<strong>注意事项</strong>' +
                    renderList(service.notes) +
                '</div>';

            bindVisualGuide(target, service, currentState);
        }

        function renderVisualGuide(service, currentState) {
            if (!service.visualGuide || !service.visualGuide.images || !service.visualGuide.images.length) {
                return "";
            }

            var images = service.visualGuide.images;
            var index = currentState.visualIndex || 0;
            if (index < 0 || index >= images.length) {
                index = 0;
                currentState.visualIndex = 0;
            }

            var current = images[index];
            var hasMultipleImages = images.length > 1;
            return '<div class="service-visual-guide" aria-label="' + escapeHtml(service.visualGuide.title) + '">' +
                    '<div class="service-visual-heading">' +
                        '<strong>' + escapeHtml(service.visualGuide.title) + '</strong>' +
                        '<span>' + (index + 1) + ' / ' + images.length + '</span>' +
                    '</div>' +
                    '<div class="wechat-fold-gallery">' +
                        (hasMultipleImages ? '<button class="wechat-fold-arrow prev" type="button" data-visual-step="prev" aria-label="上一张图片">‹</button>' : '') +
                        '<figure class="wechat-fold-card">' +
                            '<img src="' + escapeHtml(current.src) + '" alt="' + escapeHtml(current.alt) + '">' +
                            '<figcaption>' + escapeHtml(current.caption) + '</figcaption>' +
                        '</figure>' +
                        (hasMultipleImages ? '<button class="wechat-fold-arrow next" type="button" data-visual-step="next" aria-label="下一张图片">›</button>' : '') +
                    '</div>' +
                '</div>';
        }

        function bindVisualGuide(target, service, currentState) {
            if (!service.visualGuide || !service.visualGuide.images || service.visualGuide.images.length < 2) {
                return;
            }

            var buttons = target.querySelectorAll('[data-visual-step]');
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].addEventListener("click", function () {
                    var images = service.visualGuide.images;
                    var direction = this.getAttribute("data-visual-step");
                    var delta = direction === "prev" ? -1 : 1;
                    currentState.visualIndex = (currentState.visualIndex + delta + images.length) % images.length;
                    renderDetail(target, service, currentState);
                });
            }
        }

        function renderDownloads(service) {
            if (!service.downloads || !service.downloads.length) {
                return "";
            }

            var html = '<div class="service-detail-block service-download-block">' +
                '<strong>附件下载</strong>' +
                '<div class="service-download-list">';

            for (var i = 0; i < service.downloads.length; i++) {
                var item = service.downloads[i];
                html += '<a class="service-download-link" href="' + escapeHtml(item.href) + '" download="' + escapeHtml(item.filename || '') + '">' +
                    '<span>' + escapeHtml(item.label) + '</span>' +
                    '<small>' + escapeHtml(item.note || '点击下载附件') + '</small>' +
                '</a>';
            }

            html += '</div></div>';
            return html;
        }

        function getFilteredServices(data, currentState) {
            var result = [];

            for (var i = 0; i < data.length; i++) {
                var service = data[i];
                if (currentState.category === "全部" || service.category === currentState.category) {
                    result.push(service);
                }
            }

            return result;
        }

        function findByTitle(data, title) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].title === title) {
                    return data[i];
                }
            }

            return null;
        }

        function renderList(items) {
            var html = '<ul>';
            for (var i = 0; i < items.length; i++) {
                html += '<li>' + escapeHtml(items[i]) + '</li>';
            }
            html += '</ul>';
            return html;
        }

        function escapeHtml(value) {
            return String(value)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }
    });
})();
