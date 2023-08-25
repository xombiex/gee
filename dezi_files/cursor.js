let colour = 'white',
    sparkles = 70,
    x = (ox = 400),
    y = (oy = 300),
    swide = 800,
    shigh = 600,
    sleft = (sdown = 0),
    tiny = [],
    star = [],
    starv = [],
    starx = [];
const stary = [],
    tinyx = [],
    tinyy = [],
    tinyv = [];
window.onload = function () {
    if (document.getElementById) {
        var E, P, O, R
        for (var E = 0; E < sparkles; E++) {
            var P = createDiv(3, 3)
            P.style.visibility = 'hidden'
            P.style.zIndex = '999'
            document.body.appendChild((tiny[E] = P))
            starv[E] = 0
            tinyv[E] = 0
            var P = createDiv(5, 5)
            P.style.backgroundColor = 'transparent'
            P.style.visibility = 'hidden'
            P.style.zIndex = '999'
            var O = createDiv(1, 5),
                R = createDiv(5, 1)
            P.appendChild(O)
            P.appendChild(R)
            O.style.top = '2px'
            O.style.left = '0px'
            R.style.top = '0px'
            R.style.left = '2px'
            document.body.appendChild((star[E] = P))
        }
        set_width()
        sparkle()
    }
}

function sparkle() {
    var E
    if (Math.abs(x - ox) > 1 || Math.abs(y - oy) > 1) {
        ox = x
        oy = y
        for (E = 0; E < sparkles; E++) {
            if (!starv[E]) {
                star[E].style.left = (starx[E] = x) + 'px'
                star[E].style.top = (stary[E] = y + 1) + 'px'
                star[E].style.clip = 'rect(0px, 5px, 5px, 0px)'
                star[E].childNodes[0].style.backgroundColor = star[
                    E
                    ].childNodes[1].style.backgroundColor =
                    colour == 'random' ? newColour() : colour
                star[E].style.visibility = 'visible'
                starv[E] = 50
                break
            }
        }
    }
    for (E = 0; E < sparkles; E++) {
        if (starv[E]) {
            update_star(E)
        }
        if (tinyv[E]) {
            update_tiny(E)
        }
    }
    setTimeout('sparkle()', 40)
}

function update_star(E) {
    if (--starv[E] == 25) {
        star[E].style.clip = 'rect(1px, 4px, 4px, 1px)'
    }
    if (starv[E]) {
        stary[E] += 1 + Math.random() * 3
        starx[E] += ((E % 5) - 2) / 5
        if (stary[E] < shigh + sdown) {
            star[E].style.top = stary[E] + 'px'
            star[E].style.left = starx[E] + 'px'
        } else {
            star[E].style.visibility = 'hidden'
            starv[E] = 0

        }
    } else {
        tinyv[E] = 50
        tiny[E].style.top = (tinyy[E] = stary[E]) + 'px'
        tiny[E].style.left = (tinyx[E] = starx[E]) + 'px'
        tiny[E].style.width = '2px'
        tiny[E].style.height = '2px'
        tiny[E].style.backgroundColor = star[E].childNodes[0].style.backgroundColor
        star[E].style.visibility = 'hidden'
        tiny[E].style.visibility = 'visible'
    }
}

function update_tiny(E) {
    --tinyv[E] == 25 &&
    ((tiny[E].style.width = '1px'), (tiny[E].style.height = '1px'))
    if (tinyv[E]) {
        tinyy[E] += 1 + Math.random() * 3
        tinyx[E] += ((E % 5) - 2) / 5
        if (tinyy[E] < shigh + sdown) {
            tiny[E].style.top = tinyy[E] + 'px'
            tiny[E].style.left = tinyx[E] + 'px'
        } else {
            tiny[E].style.visibility = 'hidden'
            tinyv[E] = 0

        }
    } else {
        tiny[E].style.visibility = 'hidden'
    }
}

document.onmousemove = mouse

function mouse(E) {
    E
        ? ((y = E.pageY), (x = E.pageX))
        : (set_scroll(), (y = event.y + sdown), (x = event.x + sleft))
}

window.onscroll = set_scroll

function set_scroll() {
    if (typeof self.pageYOffset == 'number') {
        sdown = self.pageYOffset
        sleft = self.pageXOffset
    } else {
        if (
            document.body &&
            (document.body.scrollTop || document.body.scrollLeft)
        ) {
            sdown = document.body.scrollTop
            sleft = document.body.scrollLeft
        } else {
            document.documentElement &&
            (document.documentElement.scrollTop ||
                document.documentElement.scrollLeft)
                ? ((sleft = document.documentElement.scrollLeft),
                    (sdown = document.documentElement.scrollTop))
                : ((sdown = 0), (sleft = 0))
        }
    }
}

window.onresize = set_width

function set_width() {
    var E = 999999,
        P = 999999
    if (document.documentElement && document.documentElement.clientWidth) {
        if (document.documentElement.clientWidth > 0) {
            E = document.documentElement.clientWidth
        }
        if (document.documentElement.clientHeight > 0) {
            P = document.documentElement.clientHeight
        }
    }
    if (typeof self.innerWidth == 'number' && self.innerWidth) {
        if (self.innerWidth > 0 && self.innerWidth < E) {
            E = self.innerWidth
        }
        if (self.innerHeight > 0 && self.innerHeight < P) {
            P = self.innerHeight
        }
    }
    if (document.body.clientWidth) {
        if (document.body.clientWidth > 0 && document.body.clientWidth < E) {
            E = document.body.clientWidth
        }
        if (document.body.clientHeight > 0 && document.body.clientHeight < P) {
            P = document.body.clientHeight
        }
    }
    ;(E == 999999 || P == 999999) && ((E = 800), (P = 600))
    swide = E
    shigh = P
}

function createDiv(E, P) {
    var O = document.createElement('div')
    O.style.position = 'absolute'
    O.style.height = E + 'px'
    O.style.width = P + 'px'
    O.style.overflow = 'hidden'
    return O
}

function newColour() {
    var E = []
    return (
        (E[0] = 255),
            (E[1] = Math.floor(Math.random() * 256)),
            (E[2] = Math.floor(Math.random() * (256 - E[1] / 2))),
            E.sort(function () {
                return 0.5 - Math.random()
            }),
        'rgb(' + E[0] + ', ' + E[1] + ', ' + E[2] + ')'
    )
}