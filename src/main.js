const $siteList = $('.siteList')
const $lastLi = $siteList.find('.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'A',  url: 'https://www.acfun.cn' },
    { logo: 'B',  url: 'https://www.bilibili.com' }
]
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    let timer = 0 //定义计时器
    hashMap.forEach((node, index) => {
        const $li = $(`
    <li>
             <div class="site">
                <div class="logo">
                    ${node.logo}
                </div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                    <use xlink:href="#icon-shanchu2"></use>
            </svg>
                </div>
            </div>
    </li>`).insertBefore($lastLi)
        $li.on({
            touchstart: function () {
                timer = setTimeout(() => {
                    if (confirm('确定删除吗')) {
                        hashMap.splice(index, 1)
                        render()
                    }
                }, 500)
                return false
            },
            touchmove: function () {
                clearTimeout(timer)
                timer = 0
            },
            touchend: function () {
                clearTimeout(timer)
                if (timer !== 0) {
                    window.open(node.url)
                }
                return false
            },
            click: function(){
                window.open(node.url)
            }
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })
}
render()

$('.addButton').on('click', () => {
    let url = window.prompt('请输出网址')
    if (url.indexOf('https') !== 0) {
        url = 'https://' + url
    }
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url,
    })
    render()
})

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}

$(document).on('keypress',(e)=>{
    const {key} = e
    for(let i =0;i<hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase() === key.toLowerCase()){
            window.open(hashMap[i].url)
        }
    }
})
