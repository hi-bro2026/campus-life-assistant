document.addEventListener("DOMContentLoaded", function () {
    var filterButtons = document.querySelectorAll("[data-map-type]");
    var cards = document.querySelectorAll("[data-place-type]");
    var routePanels = document.querySelectorAll("[data-route-panel]");
    var previewButtons = document.querySelectorAll("[data-preview-src]");

    for (var i = 0; i < filterButtons.length; i++) {
        filterButtons[i].addEventListener("click", function () {
            var type = this.getAttribute("data-map-type") || "all";
            updateActiveButtons(filterButtons, type);
            filterPlaceCards(cards, type);
            switchRoutePanel(routePanels, type);
        });
    }

    var initialRoute = getInitialGuideRoute();
    if (initialRoute) {
        updateActiveButtons(filterButtons, initialRoute);
        filterPlaceCards(cards, initialRoute);
        switchRoutePanel(routePanels, initialRoute);
        window.setTimeout(function () {
            var target = document.querySelector('[data-guide-route="' + initialRoute + '"]') || document.getElementById("campus-map");
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, 80);
    }

    bindRoutePreview(previewButtons);
    bindLifeGuideImagePreview();
    bindGuideDownloads();
});

function getInitialGuideRoute() {
    var params = new URLSearchParams(window.location.search || "");
    var route = params.get("route") || "";
    var allowedRoutes = ["library", "activity", "canteen", "gym", "express", "teaching", "dorm", "print"];
    return allowedRoutes.indexOf(route) !== -1 ? route : "";
}

function updateActiveButtons(buttons, type) {
    for (var i = 0; i < buttons.length; i++) {
        var buttonType = buttons[i].getAttribute("data-map-type") || "all";
        buttons[i].classList.toggle("active", buttonType === type);
    }
}

function filterPlaceCards(cards, type) {
    for (var i = 0; i < cards.length; i++) {
        var cardType = cards[i].getAttribute("data-place-type");
        cards[i].classList.toggle("is-hidden", type !== "all" && cardType !== type);
    }
}

function switchRoutePanel(panels, type) {
    var targetType = type === "all" ? "all" : "map";

    if (type === "print" || type === "library" || type === "activity" || type === "canteen" || type === "gym" || type === "express" || type === "teaching" || type === "dorm") {
        targetType = type;
    }

    for (var i = 0; i < panels.length; i++) {
        var panelType = panels[i].getAttribute("data-route-panel");
        panels[i].classList.toggle("is-hidden", panelType !== targetType);
    }
}

function bindRoutePreview(buttons) {
    var preview = document.getElementById("routePreview");
    var previewImage = document.getElementById("routePreviewImage");
    var previewTitle = document.getElementById("routePreviewTitle");

    if (!preview || !previewImage || !previewTitle) {
        return;
    }

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
            var src = this.getAttribute("data-preview-src");
            var title = this.getAttribute("data-preview-title") || "路线照片";
            openRoutePreview(preview, previewImage, previewTitle, src, title);
        });
    }

    var closeButtons = preview.querySelectorAll("[data-preview-close]");
    for (var j = 0; j < closeButtons.length; j++) {
        closeButtons[j].addEventListener("click", function () {
            closeRoutePreview(preview, previewImage);
        });
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && preview.classList.contains("is-open")) {
            closeRoutePreview(preview, previewImage);
        }
    });
}

function bindLifeGuideImagePreview() {
    var previewItems = document.querySelectorAll("[data-life-preview-src]");
    var preview = document.getElementById("routePreview");
    var previewImage = document.getElementById("routePreviewImage");
    var previewTitle = document.getElementById("routePreviewTitle");

    if (!preview || !previewImage || !previewTitle) {
        return;
    }

    for (var i = 0; i < previewItems.length; i++) {
        previewItems[i].addEventListener("dblclick", function () {
            openLifeGuidePreview(this, preview, previewImage, previewTitle);
        });

        previewItems[i].addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openLifeGuidePreview(this, preview, previewImage, previewTitle);
            }
        });
    }
}

function openLifeGuidePreview(item, preview, image, titleTarget) {
    var src = item.getAttribute("data-life-preview-src");
    var title = item.getAttribute("data-life-preview-title") || "生活指南图片";
    openRoutePreview(preview, image, titleTarget, src, title);
}

function openRoutePreview(preview, image, titleTarget, src, title) {
    if (!src) {
        return;
    }

    image.src = src;
    image.alt = title;
    titleTarget.textContent = title;
    preview.classList.add("is-open");
    preview.setAttribute("aria-hidden", "false");
}

function closeRoutePreview(preview, image) {
    preview.classList.remove("is-open");
    preview.setAttribute("aria-hidden", "true");
    image.removeAttribute("src");
    image.alt = "";
}

function bindGuideDownloads() {
    var downloadButtons = document.querySelectorAll("[data-download-guide]");

    for (var i = 0; i < downloadButtons.length; i++) {
        downloadButtons[i].addEventListener("click", function () {
            var type = this.getAttribute("data-download-guide");
            createGuidePrintPage(type);
        });
    }
}

function createGuidePrintPage(type) {
    if (!type) {
        return;
    }

    var routeSource = document.querySelector('[data-route-panel="' + type + '"] .print-route-panel');
    var infoSource = document.querySelector('[data-place-type="' + type + '"]');

    if (!routeSource || !infoSource) {
        console.warn("没有找到对应的导航内容：", type);
        return;
    }

    var routeClone = prepareGuidePrintClone(routeSource);
    var infoClone = prepareGuidePrintClone(infoSource);
    var title = getGuidePrintTitle(type, infoClone);
    var iframe = document.createElement("iframe");

    iframe.className = "guide-print-frame";
    iframe.setAttribute("aria-hidden", "true");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "1px";
    iframe.style.height = "1px";
    iframe.style.border = "0";
    iframe.style.opacity = "0";

    document.body.appendChild(iframe);

    var printDocument = iframe.contentDocument || iframe.contentWindow.document;
    printDocument.open();
    printDocument.write(buildGuidePrintHtml(title, routeClone.outerHTML, infoClone.outerHTML));
    printDocument.close();

    waitForGuidePrintImages(printDocument, function () {
        var printWindow = iframe.contentWindow;

        if (!printWindow) {
            iframe.remove();
            return;
        }

        printWindow.focus();
        printWindow.onafterprint = function () {
            iframe.remove();
        };
        printWindow.print();

        window.setTimeout(function () {
            if (iframe.parentNode) {
                iframe.remove();
            }
        }, 60000);
    });
}

function prepareGuidePrintClone(source) {
    var clone = source.cloneNode(true);
    clone.classList.remove("is-hidden");

    removeGuidePrintButtons(clone);
    convertPreviewButtonsForPrint(clone);

    return clone;
}

function removeGuidePrintButtons(container) {
    var buttons = container.querySelectorAll("[data-download-guide]");

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].remove();
    }
}

function convertPreviewButtonsForPrint(container) {
    var previewButtons = container.querySelectorAll("button[data-preview-src]");

    for (var i = 0; i < previewButtons.length; i++) {
        var button = previewButtons[i];
        var replacement = document.createElement("div");
        replacement.className = "route-photo-print";

        while (button.firstChild) {
            replacement.appendChild(button.firstChild);
        }

        button.replaceWith(replacement);
    }
}

function getGuidePrintTitle(type, infoClone) {
    var titleTarget = infoClone.querySelector("h3");
    var fallbackTitles = {
        library: "图书馆",
        activity: "大学生活动中心",
        teaching: "教学楼",
        dorm: "宿舍",
        canteen: "五味斋",
        gym: "体育馆",
        express: "快递点",
        print: "打印店"
    };

    if (titleTarget && titleTarget.textContent.trim()) {
        return titleTarget.textContent.trim();
    }

    return fallbackTitles[type] || "地点导航";
}

function buildGuidePrintHtml(title, routeHtml, infoHtml) {
    return '<!DOCTYPE html>' +
        '<html lang="zh-CN">' +
        '<head>' +
        '<meta charset="UTF-8">' +
        '<title>' + escapeGuideHtml(title) + '导航</title>' +
        '<base href="' + escapeGuideHtml(document.baseURI) + '">' +
        '<style>' + getGuidePrintStyles() + '</style>' +
        '</head>' +
        '<body>' +
        '<main class="guide-print-page">' +
        '<header class="guide-print-cover">' +
        '<p>校园地图路线导航</p>' +
        '<h1>' + escapeGuideHtml(title) + '</h1>' +
        '<span>图片路线 + 地点说明 + 小 Tips</span>' +
        '</header>' +
        '<section class="guide-print-section">' +
        '<h2>路线导航</h2>' +
        routeHtml +
        '</section>' +
        '<section class="guide-print-section">' +
        '<h2>地点说明</h2>' +
        infoHtml +
        '</section>' +
        '</main>' +
        '</body>' +
        '</html>';
}

function getGuidePrintStyles() {
    return [
        '@page { size: A4; margin: 14mm; }',
        '* { box-sizing: border-box; }',
        'body { margin: 0; color: #4b2e24; background: #ffffff; font-family: "Microsoft YaHei", "PingFang SC", Arial, sans-serif; line-height: 1.65; }',
        '.guide-print-page { width: 100%; }',
        '.guide-print-cover { padding: 18px 20px; color: #5a3327; background: #fff5e8; border: 1px solid #f3d2b7; border-radius: 16px; }',
        '.guide-print-cover p { margin: 0 0 6px; color: #ff7b4a; font-size: 13px; font-weight: 900; }',
        '.guide-print-cover h1 { margin: 0; font-size: 28px; line-height: 1.25; }',
        '.guide-print-cover span { display: block; margin-top: 6px; color: #8a6a5c; font-size: 13px; font-weight: 800; }',
        '.guide-print-section { margin-top: 16px; }',
        '.guide-print-section h2 { margin: 0 0 10px; color: #5a3327; font-size: 18px; }',
        '.print-route-panel, .all-route-card, .map-place-card { display: grid; gap: 12px; }',
        '.print-route-heading, .print-route-title, .route-card-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }',
        '.print-route-heading-copy { display: grid; gap: 4px; }',
        '.print-route-heading strong, .print-route-title h4, .all-route-card h4, .map-place-card h3 { margin: 0; color: #5a3327; }',
        '.print-route-heading span, .print-route-title p, .all-route-card p, .map-place-card p { margin: 0; color: #765d52; }',
        '.place-tag { display: inline-flex; width: fit-content; min-height: 26px; padding: 0 10px; align-items: center; color: #ffffff; background: #ff7b4a; border-radius: 999px; font-size: 12px; font-weight: 900; }',
        '.place-tag.green { background: #68b36b; } .place-tag.warm { background: #f7a23c; } .place-tag.blue { background: #6ba6ff; }',
        '.place-tag.purple { background: #9a7cf1; } .place-tag.gold { background: #d9a12f; } .place-tag.orange { background: #f59d3d; } .place-tag.teal { background: #35a7a0; }',
        '.guide-download-button { display: none !important; }',
        '.print-route-group, .dorm-building-card, .library-tip-box, .print-tip-box, .map-place-card { padding: 12px; background: #fffaf4; border: 1px solid #f3d2b7; border-radius: 14px; }',
        '.print-route-title { margin-bottom: 10px; }',
        '.all-route-subtitle, .library-tip-box strong, .print-tip-box strong, .dorm-building-card h5 { display: block; margin: 0 0 8px; color: #5a3327; font-weight: 900; }',
        '.dorm-route-list { display: grid; grid-template-columns: 1fr; gap: 10px; }',
        '.route-photo-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }',
        '.route-photo-print { padding: 8px; display: grid; gap: 6px; color: #6b4133; background: #ffffff; border: 1px solid #f3d2b7; border-radius: 12px; font-size: 12px; font-weight: 900; break-inside: avoid; page-break-inside: avoid; }',
        '.route-photo-print img { width: 100%; max-height: 220px; display: block; object-fit: contain; border-radius: 9px; background: #f6f8fb; }',
        '.route-photo-print span { display: block; text-align: center; }',
        'ul { margin: 8px 0 0; padding-left: 1.25em; }',
        'li { margin: 4px 0; }',
        'img { max-width: 100%; height: auto; }',
        '@media print { .guide-print-cover, .guide-print-section, .route-photo-print, .dorm-building-card, .library-tip-box, .print-tip-box { break-inside: avoid; page-break-inside: avoid; } }'
    ].join("");
}

function waitForGuidePrintImages(printDocument, callback) {
    var images = printDocument.images;
    var pending = images.length;
    var finished = false;

    if (!pending) {
        callback();
        return;
    }

    function finish() {
        if (finished) {
            return;
        }

        finished = true;
        callback();
    }

    function markLoaded() {
        pending -= 1;

        if (pending <= 0) {
            finish();
        }
    }

    for (var i = 0; i < images.length; i++) {
        if (images[i].complete) {
            markLoaded();
        } else {
            images[i].addEventListener("load", markLoaded);
            images[i].addEventListener("error", markLoaded);
        }
    }

    window.setTimeout(finish, 4000);
}

function escapeGuideHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
