# coding = utf-8

from flask import Flask

app = Flask(__name__)

def read_file(filename):
    file = open(filename, encoding="utf-8")
    lines = file.read()
    file.close()
    return lines

@app.route('/')
def index():
    return open('index.html', encoding='utf-8').read()

@app.route('/foreword')
def foreword():
    return read_file('static/md/foreword.md')

@app.route('/<arg>')
def result(arg):
    if arg == 'easy' or arg == 'medium' or arg == 'hard':
        return read_file('static/txt/' + arg + '.txt')
    else:
        return read_file('static/md/question/' + arg + '.md')
    

if __name__ == '__main__':
    app.run()