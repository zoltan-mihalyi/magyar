var fs = require('fs');

var html = fs.readFileSync('nnevek.html', 'utf-8');

var matches = html.matchAll(/     *([^<-]*)<\/b><br>/g);

const rows=[];
for (const match of matches) {
    const name = match[1].trim();
    if(name!==''){
        rows.push(name);
    }
}

fs.writeFileSync('../nnevek.txt',rows.join('\n'), 'utf-8');