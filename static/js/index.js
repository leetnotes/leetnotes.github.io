var diff_translate = {'easy': '简单', 'medium': '中等', 'hard': '困难'}
var diff_color = {'easy': ['green', 'lime'], 'medium': ['orange', 'gold'], 'hard': ['red', 'lightsalmon']};
var line_color = ['white', 'black'];

function showForeword() {
    $.get('/foreword', function (data, status) {
        $('#content').html(data);
    })
}

function displayDiff() {
    var area = document.getElementById('difficulty');
    area.innerHTML = '难度' + 
    '<ul>\
    <li onclick="showEasy()"><font color="green">简单</font></li>\
    <li onclick="showMedium()"><font color="orange">中等</font></li>\
    <li onclick="showHard()"><font color="red">困难</font></li>\
    </ul>';
}

function showEasy() {
    showDiff('easy');
}

function showMedium() {
    showDiff('medium');
}

function showHard() {
    showDiff('hard');
}

function showDiff(diff) {
    $.get('/' + diff, function (data, status) {
        var list = data.split('\n');
        var content = '<p align="center" style="font-size:15px">以下为' + diff_translate[diff] + '题目，实时更新中……</p>' +
        '<table>\
            <tr>\
                <th>题目链接</th>\
                <th>题解链接</th>\
            </tr>';
        for (order in list) {
            var temp = list[order].split(' ');
                content += 
            '<tr style="background-color:' + diff_color[diff][order % 2] + '">\
                <td><a style="color:' + line_color[order % 2] + '" href="https://leetcode.cn/problems/' + temp[1] + '" target="_blank">' + temp[0] + '</td>\
                <td><a style="color:' + line_color[order % 2] + '" onclick=showResult("' + temp[0] + '")>' + temp[0] + '</td>\
            </tr>';
        }
        content += '</table>';
        $('#content').html(content);
    })
}

function showResult(link) {
    $.get('/' + link, function (data, status) {
        var converter = new showdown.Converter();
        $('#content').html(converter.makeHtml(data));
    })
}