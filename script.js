"use strict";

const htmlEditor = document.getElementById("html-code");
const cssEditor = document.getElementById("css-code");
const jsEditor = document.getElementById("js-code");
const preview = document.getElementById("preview");
const runButton = document.getElementById("run-button");
const status = document.getElementById("status");

function runCode() {
    const html = htmlEditor.value;
    const css = cssEditor.value;
    const js = jsEditor.value;

    const documentContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>${css.replace(/<\/style/gi, "<\\/style")}</style>
</head>
<body>
    ${html.replace(/<\/script/gi, "<\\/script")}
    <script>
        try {
            ${js.replace(/<\/script/gi, "<\\/script")}
        } catch (error) {
            document.body.insertAdjacentHTML(
                "beforeend",
                "<pre>JavaScript error: " +
                String(error.message).replace(/[&<>"]/g, function (char) {
                    return {
                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        '"': "&quot;"
                    }[char];
                }) +
                "</pre>"
            );
        }
    <\/script>
</body>
</html>`;

    preview.srcdoc = documentContent;
    status.textContent = "Code preview updated.";
}

runButton.addEventListener("click", runCode);

runCode();
