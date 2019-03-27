export  function px2rem(px) {
    const ratio = 375 / 10
    return px / ratio + 'rem'
}

export function realPx(px) {
    const maxWidth = innerWidth > 500 ? 500 : innerWidth
    return px * (maxWidth / 375)
}
